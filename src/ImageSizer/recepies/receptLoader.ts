import { IMAGE_SIZER_TECHS, TImageSizerTubeNames, TRecept } from "../Const";

import { TubeTree } from "../TubeTree";
import { generateRandomId } from "react-utils/basic/misc";

export const loadReceptToTubeTree = (tubeTree: TubeTree, recept: TRecept) => {
    recept.tubes.forEach((item) => {
        const tube = new IMAGE_SIZER_TECHS[item.tube]();
        tube.setConfig(item.config as any);
        tubeTree.addTube(tube);
    });
};

export const exportReceptFromTubeTree = (tubeTree: TubeTree, name: string) => {
    const recept: TRecept = {
        id: generateRandomId(),
        version: "1",
        name,
        tubes: [],
    };
    const tubeNames = Object.keys(IMAGE_SIZER_TECHS) as TImageSizerTubeNames[];

    tubeTree.stack.forEach((tube) => {
        for (let tubeName of tubeNames) {
            if (tube instanceof IMAGE_SIZER_TECHS[tubeName]) {
                recept.tubes.push({
                    tube: tubeName,
                    config: tube.config as any,
                });
                break;
            }
        }
    });

    return recept;
};
