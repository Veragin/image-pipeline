import { IMAGE_SIZER_TECHS, TImageSizerTubeNames, TTemplate } from "../Const";

import { TubeTree } from "../TubeTree";
import { generateRandomId } from "react-utils/basic/misc";

export const loadTemplateToTubeTree = (tubeTree: TubeTree, template: TTemplate) => {
    template.tubes.forEach((item) => {
        const tube = new IMAGE_SIZER_TECHS[item.tube]();
        tube.setConfig(item.config as any);
        tubeTree.addTube(tube);
    });
};

export const exportTemplateFromTubeTree = (tubeTree: TubeTree, name: string) => {
    const template: TTemplate = {
        id: generateRandomId(),
        version: "1",
        name,
        tubes: [],
    };
    const tubeNames = Object.keys(IMAGE_SIZER_TECHS) as TImageSizerTubeNames[];

    tubeTree.stack.forEach((tube) => {
        for (let tubeName of tubeNames) {
            if (tube instanceof IMAGE_SIZER_TECHS[tubeName]) {
                template.tubes.push({
                    tube: tubeName,
                    config: tube.config as any,
                });
                break;
            }
        }
    });

    return template;
};
