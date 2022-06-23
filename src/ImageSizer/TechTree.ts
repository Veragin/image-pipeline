import { IMAGE_SIZER_TECHS, IMAGE_SIZER_TECH_NAMES, TRecept } from "./Const";
import { ImageCollection, copyImageColection } from "./ImageColection";
import { action, computed, makeObservable, observable } from "mobx";

import { Tech } from "./Tech/Tech";
import { TechLoad } from "./Tech/TechLoad";
import { assertNotNullish } from "../react-utils/basic/typeguards";
import { generateRandomId } from "react-utils/basic/misc";

export class TechTree {
    techLoad: TechLoad;
    stack: Tech<any>[];
    activeId: number = 0;
    tmpCollection = new ImageCollection();

    constructor() {
        this.techLoad = new TechLoad(() => this.updateTmpCollection(0));
        this.stack = [this.techLoad];

        makeObservable(this, {
            stack: observable.shallow,
            activeId: observable,
            tmpCollection: observable,
            updateTmpCollection: action,
            removeTech: action,
            addTech: action,
            setActiveId: action,
            setTechStack: action,
            activeTech: computed,
            activeColection: computed,
        });
    }

    addTech = (tech: Tech<any>) => {
        this.stack.push(tech);
        this.setActiveId(tech.id);
    };

    /** !!! use only for sort */
    setTechStack = (stack: Tech<any>[]) => {
        if (stack.some((tech, i) => tech.id !== this.stack[i]?.id)) {
            // load need to stay first
            const ids = [0, ...stack.map((tech) => tech.id)];
            this.stack.sort(
                (a, b) =>
                    ids.findIndex((id) => a.id === id) -
                    ids.findIndex((id) => b.id === id)
            );
            this.updateTmpCollection(this.activeId);
        }
    };

    removeTech = (id: number) => {
        if (id === 0) return;
        if (this.activeId === id) {
            this.activeId = 0;
        }

        this.stack = this.stack.filter((tech) => tech.id !== id);
    };

    setActiveId = async (id: number) => {
        await this.updateTmpCollection(id);
        this.activeId = id;
    };

    get activeTech() {
        return this.stack.find((tech) => tech.id === this.activeId) ?? null;
    }

    get activeColection(): ImageCollection {
        const res = copyImageColection(this.tmpCollection);

        this.activeTech?.show(res);

        return res;
    }

    run = async () => {
        const files = this.techLoad.files;
        console.log("run", files);
        if (files === null || files.length === 0) return;

        for (let i = 0; i < files.length; i++) {
            const imgData = await this.techLoad.readFile(files[i]);
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
            name: "custom",
            techs: [],
        };

        for (let tech of this.stack) {
            if (tech instanceof TechLoad) continue;

            const techName = IMAGE_SIZER_TECH_NAMES.find(
                (key) => tech instanceof IMAGE_SIZER_TECHS[key]
            );
            assertNotNullish(
                techName,
                "Tech is not registered in IMAGE_SIZER_TECHS"
            );

            recept.techs.push({
                tech: techName,
                config: tech.config,
            });
        }

        return recept;
    };

    updateTmpCollection = async (stopTechId: number) => {
        if (this.techLoad.preview === null) {
            this.tmpCollection = new ImageCollection();
            return;
        }

        const col = this.computeCollection(
            this.techLoad.preview,
            this.techLoad.previewName
        );

        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].id === stopTechId) break;
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
