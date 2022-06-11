import { action, makeObservable, observable } from "mobx";
import { applyDeepPartial, generateRandomId } from "react-utils/misc";

import { ImageCollection } from "../ImageColection";

export abstract class Tech<Config extends Object> {
    readonly id: number = generateRandomId();
    readonly group: "transform" | "object" | "basic" = "basic";
    readonly name: string = "";
    readonly description: string = "";

    icon: React.FC = () => null;
    comp: React.FC<TCompProps> = () => null;

    do = async (imgCol: ImageCollection) => {};
    show = (imgCol: ImageCollection) => this.do(imgCol);

    config: Config;
    setConfig = (config: DeepPartial<Config>) => (this.config = applyDeepPartial(this.config, config));

    constructor(config: Config) {
        this.config = config;

        makeObservable(this, {
            config: observable,
            setConfig: action,
        });
    }
}

type TCompProps = { tech: any; collection: ImageCollection };
