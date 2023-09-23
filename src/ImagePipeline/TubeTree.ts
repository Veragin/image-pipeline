import { ImageCollection, copyImageColection } from './ImageColection';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Tube } from './Tube/Tube';
import { TubeLoad } from './Tube/TubeLoad/TubeLoad';
import { TubeDownload } from './Tube/TubeDownload';

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
        runInAction(() => {
            this.activeId = id;
        });
    };

    get activeTube() {
        return this.stack.find((tube) => tube.id === this.activeId) ?? null;
    }

    get activeColection(): ImageCollection {
        const res = copyImageColection(this.tmpCollection);

        this.activeTube?.show(res);

        return res;
    }

    get hasDownloadTube() {
        return this.stack.some((t) => t instanceof TubeDownload);
    }

    private updateTmpCollection = async (stopTubeId: number) => {
        if (this.tubeLoad.previewCol === null) {
            runInAction(() => {
                this.tmpCollection = new ImageCollection();
            });
            return;
        }

        const col = copyImageColection(this.tubeLoad.previewCol);

        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].id === stopTubeId) break;
            await this.stack[i].show(col);
        }

        runInAction(() => {
            this.tmpCollection = col;
        });
    };
}
