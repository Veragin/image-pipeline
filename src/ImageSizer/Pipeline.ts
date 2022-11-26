import { saveAs } from "file-saver";
import JSZip from "jszip";
import { makeObservable, observable, runInAction } from "mobx";
import { generateRandomId } from "react-utils/basic/misc";
import { assertNotNullish } from "react-utils/basic/typeguards";
import { TTemplate, IMAGE_SIZER_TECH_NAMES, IMAGE_SIZER_TECHS } from "./Const";
import { TubeDownload } from "./Tube/TubeDownload";
import { TubeLoad } from "./Tube/TubeLoad";
import { TubeTree } from "./TubeTree";

export class Pipeline {
    tubeTree = new TubeTree();
    processCounter: number | null = null;

    constructor() {
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
        const files = this.tubeTree.tubeLoad.files;
        if (files === null || files.length === 0) return;

        runInAction(() => {
            this.processCounter = 0;
        });

        for (let i = 0; i < files.length; i++) {
            const imgData = await this.tubeTree.tubeLoad.readFile(files[i]);
            if (imgData === null) continue;

            const col = this.tubeTree.computeCollection(imgData, files[i].name);

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

    exportRecept = (fileName: string) => {
        const recept: TTemplate = {
            id: generateRandomId(),
            version: "1",
            name: "custom",
            tubes: [],
        };

        for (let tube of this.tubeTree.stack) {
            if (tube instanceof TubeLoad) continue;

            const tubeName = IMAGE_SIZER_TECH_NAMES.find(
                (key) => tube instanceof IMAGE_SIZER_TECHS[key]
            );
            assertNotNullish(tubeName, "Tube is not registered in IMAGE_SIZER_TECHS");

            recept.tubes.push({
                tube: tubeName,
                config: tube.config,
            });
        }

        const blob = new Blob([JSON.stringify(recept)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.json`);
    };
}
