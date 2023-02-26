import { IMAGE_SIZER_TECHS, IMAGE_SIZER_TECH_NAMES, TTemplate } from "../Const";

import { TubeTree } from "../TubeTree";
import { generateRandomId } from "react-utils/basic/misc";
import { assertNotNullish } from "react-utils/basic/typeguards";

export const loadTemplateToTubeTree = (tubeTree: TubeTree, template: TTemplate) => {
    template.tubes.forEach((item) => {
        if (item.tube === "load") {
            tubeTree.tubeLoad.setConfig(item.config);
        } else {
            const tube = new IMAGE_SIZER_TECHS[item.tube]();
            tube.setConfig(item.config as any);
            tubeTree.addTube(tube);
        }
    });
};

export const exportTemplateFromTubeTree = (tubeTree: TubeTree, name: string) => {
    const template: TTemplate = {
        id: generateRandomId(),
        version: "1",
        name,
        tubes: [],
    };

    for (let tube of tubeTree.stack) {
        const tubeName = IMAGE_SIZER_TECH_NAMES.find(
            (key) => tube instanceof IMAGE_SIZER_TECHS[key]
        );
        assertNotNullish(tubeName, "Tube is not registered in IMAGE_SIZER_TECHS");

        template.tubes.push({
            tube: tubeName,
            config: tube.config,
        });
    }

    return template;
};
