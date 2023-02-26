import { saveAs } from "file-saver";
import JSZip from "jszip";
import { makeObservable, observable, runInAction } from "mobx";
import { TTemplate } from "./Const";
import { exportTemplateFromTubeTree, loadTemplateToTubeTree } from "./templates/templateLoader";
import { TubeDownload } from "./Tube/TubeDownload";
import { TubeTree } from "./TubeTree";

export class Pipeline {
    tubeTree = new TubeTree();
    processCounter: number | null = null;

    constructor(initTemplate?: TTemplate) {
        if (initTemplate) {
            loadTemplateToTubeTree(this.tubeTree, initTemplate);
            this.tubeTree.setActiveId(0);
        }

        makeObservable(this, {
            processCounter: observable,
        });
    }

    run = async (zipName: string | null) => {
        if (zipName === null) {
            return await this.processTree(null);
        }

        const zip = new JSZip();
        await this.processTree(zip);
        const blob = await zip.generateAsync({ type: "blob" });

        saveAs(blob, `${zipName}.zip`);
    };

    private processTree = async (zip: JSZip | null) => {
        runInAction(() => {
            this.processCounter = 0;
        });

        const load = this.tubeTree.tubeLoad;
        for (let i = 0; i < load.sources.length; i += load.config.numberOfImgsTogether) {
            const col = await load.createCollection(i);

            for (let i = 0; i < this.tubeTree.stack.length; i++) {
                const tube = this.tubeTree.stack[i];

                if (tube instanceof TubeDownload) {
                    await tube.do(col, zip);
                } else {
                    await tube.do(col);
                }
            }

            runInAction(() => {
                this.processCounter = i + 1;
            });
        }

        runInAction(() => {
            this.processCounter = null;
        });
    };

    exportTemplate = (fileName: string) => {
        const template = exportTemplateFromTubeTree(this.tubeTree, "custom");

        const blob = new Blob([JSON.stringify(template)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.json`);
    };
}
