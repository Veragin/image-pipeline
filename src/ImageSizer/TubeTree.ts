import { ImageCollection, copyImageColection } from "./ImageColection";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

import { Tube } from "./Tube/Tube";
import { TubeLoad } from "./Tube/TubeLoad";

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

    private updateTmpCollection = async (stopTubeId: number) => {
        if (this.tubeLoad.preview === null) {
            runInAction(() => {
                this.tmpCollection = new ImageCollection();
            });
            return;
        }

        const col = this.computeCollection(this.tubeLoad.preview, this.tubeLoad.previewName);

        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].id === stopTubeId) break;
            await this.stack[i].show(col);
        }

        runInAction(() => {
            this.tmpCollection = col;
        });
    };

    computeCollection = (imgData: ImageData, fileName: string) => {
        const col = new ImageCollection();

        const fileNameSplit = fileName.split(".");
        const format = fileNameSplit.pop() ?? "png";
        const name = fileNameSplit.join(".");
        col.stack.push({
            data: imgData,
            index: 0,
            name,
            format,
            selection: [],
            objects: [],
        });
        col.folderName = name;

        return col;
    };
}
