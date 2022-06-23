import { IMAGE_SIZER_TECHS, TImageSizerTechNames, TRecept } from "../Const";

import { TechTree } from "../TechTree";
import { generateRandomId } from "react-utils/basic/misc";

export const loadReceptToTechTree = (techTree: TechTree, recept: TRecept) => {
    recept.techs.forEach((item) => {
        const tech = new IMAGE_SIZER_TECHS[item.tech]();
        tech.setConfig(item.config as any);
        techTree.addTech(tech);
    });
};

export const exportReceptFromTechTree = (techTree: TechTree, name: string) => {
    const recept: TRecept = {
        id: generateRandomId(),
        name,
        techs: [],
    };
    const techNames = Object.keys(IMAGE_SIZER_TECHS) as TImageSizerTechNames[];

    techTree.stack.forEach((tech) => {
        for (let techName of techNames) {
            if (tech instanceof IMAGE_SIZER_TECHS[techName]) {
                recept.techs.push({
                    tech: techName,
                    config: tech.config as any,
                });
                break;
            }
        }
    });

    return recept;
};
