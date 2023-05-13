import { TTubeGroup } from "ImageSizer/Const";
import { action, makeObservable, observable } from "mobx";
import { applyDeepPartial, generateRandomId } from "react-utils/basic/misc";

import { ImageCollection } from "../ImageColection";

export class Tube<Config extends Object> {
    readonly id: number = generateRandomId();
    readonly group: TTubeGroup = "basic";
    readonly name: string = "";
    readonly description: string | string[] = "";

    icon: React.FC = () => null;
    comp: React.FC<TCompProps> = () => null;

    do = async (imgCol: ImageCollection) => {};
    doGPU = async (imgCol: ImageCollection) => {};
    show = (imgCol: ImageCollection) => this.do(imgCol);

    config: Config;
    setConfig(config: DeepPartial<Config>) {
        this.config = applyDeepPartial(this.config, config);
    }

    constructor(config: Config) {
        this.config = config;

        makeObservable(this, {
            config: observable,
            setConfig: action.bound,
        });
    }
}

type TCompProps = { tube: any; collection: ImageCollection };
