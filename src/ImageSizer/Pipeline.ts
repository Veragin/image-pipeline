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

        const sources = this.tubeTree.tubeLoad.sources;
        for (let i = 0; i < sources.length; i++) {
            const imgData = await sources[i].getImageData();
            if (imgData === null) continue;

            const col = this.tubeTree.computeCollection(imgData, sources[i].getName());

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
