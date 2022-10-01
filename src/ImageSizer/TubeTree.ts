import { IMAGE_SIZER_TECHS, IMAGE_SIZER_TECH_NAMES, TRecept } from "./Const";
import { ImageCollection, copyImageColection } from "./ImageColection";
import { action, computed, makeObservable, observable } from "mobx";

import { Tube } from "./Tube/Tube";
import { TubeLoad } from "./Tube/TubeLoad";
import { assertNotNullish } from "../react-utils/basic/typeguards";
import { generateRandomId } from "react-utils/basic/misc";

export class TubeTree {
    tubeLoad: TubeLoad;
    stack: Tube<any>[];
    activeId: number = 0;
    tmpCollection = new ImageCollection();

    constructor() {
        this.tubeLoad = new TubeLoad(() => this.updateTmpCollection(0));
        this.stack = [this.tubeLoad];

        makeObservable(this, {
            stack: observable.shallow,
            activeId: observable,
            tmpCollection: observable,
            updateTmpCollection: action,
            removeTube: action,
            addTube: action,
            setActiveId: action,
            setTubeStack: action,
            activeTube: computed,
            activeColection: computed,
        });
    }

    addTube = (tube: Tube<any>) => {
        this.stack.push(tube);
        this.setActiveId(tube.id);
    };

    /** !!! use only for sort */
    setTubeStack = (stack: Tube<any>[]) => {
        if (stack.some((tube, i) => tube.id !== this.stack[i]?.id)) {
            // load need to stay first
            const ids = [0, ...stack.map((tube) => tube.id)];
            this.stack.sort(
                (a, b) => ids.findIndex((id) => a.id === id) - ids.findIndex((id) => b.id === id)
            );
            this.updateTmpCollection(this.activeId);
        }
    };

    removeTube = (id: number) => {
        if (id === 0) return;
        if (this.activeId === id) {
            this.activeId = 0;
        }

        this.stack = this.stack.filter((tube) => tube.id !== id);
    };

    setActiveId = async (id: number) => {
        await this.updateTmpCollection(id);
        this.activeId = id;
    };

    get activeTube() {
        return this.stack.find((tube) => tube.id === this.activeId) ?? null;
    }

    get activeColection(): ImageCollection {
        const res = copyImageColection(this.tmpCollection);

        this.activeTube?.show(res);

        return res;
    }

    run = async () => {
        const files = this.tubeLoad.files;
        console.log("run", files);
        if (files === null || files.length === 0) return;

        for (let i = 0; i < files.length; i++) {
            const imgData = await this.tubeLoad.readFile(files[i]);
            if (imgData === null) continue;

            const col = this.computeCollection(imgData, files[i].name);

            for (let i = 0; i < this.stack.length; i++) {
                await this.stack[i].do(col);
            }
        }
    };

    exportRecept = () => {
        const recept: TRecept = {
            id: generateRandomId(),
            version: "1",
            name: "custom",
            tubes: [],
        };

        for (let tube of this.stack) {
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

        return recept;
    };

    updateTmpCollection = async (stopTubeId: number) => {
        if (this.tubeLoad.preview === null) {
            this.tmpCollection = new ImageCollection();
            return;
        }

        const col = this.computeCollection(this.tubeLoad.preview, this.tubeLoad.previewName);

        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].id === stopTubeId) break;
            await this.stack[i].show(col);
        }

        this.tmpCollection = col;
    };

    private computeCollection = (imgData: ImageData, fileName: string) => {
        const col = new ImageCollection();

        const fileNameSplit = fileName.split(".");
        const format = fileNameSplit.pop() ?? "png";
        col.stack.push({
            data: imgData,
            index: 0,
            name: fileNameSplit.join("."),
            format,
            selection: [],
            objects: [],
        });

        return col;
    };
}
