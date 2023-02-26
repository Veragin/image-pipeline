import { Highlight } from "LandingPage/Components";
import { spacingCss } from "react-utils/Components/globalCss";
import { Column, Row } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import baseImg from "Assets/landing/sprites/base.png";
import massEditnig from "Assets/landing/examples/shopIcon.png";
import { TTemplate } from "ImageSizer/Const";
import { Button } from "@mui/material";
import {
    scissorsLoadTemplate,
    eshopLoadTemplate,
    neuralLoadTemplate,
    spriteLoadTemplate,
} from "./autoLoadExamples";

type Props = {
    onStart: (template?: TTemplate) => void;
};

export const Examples = ({ onStart }: Props) => {
    return (
        <StyledColumn>
            <StyledContainerBox>
                <div>
                    <StyledTitle>{_("Case: Scissors")}</StyledTitle>
                    <p>
                        {_(
                            "Many images together in the large one and you need split them into separated files. With"
                        )}
                        <Highlight> Image pipeline </Highlight>
                        {_("it is super easy.")}
                    </p>
                    <TryButton onClick={() => onStart(scissorsLoadTemplate)} />
                </div>
                <StyledImage src={baseImg} />
            </StyledContainerBox>

            <StyledContainerBox>
                <div>
                    <StyledTitle>{_("Case: Eshop")}</StyledTitle>
                    <p>
                        {_(
                            "Imagine that you are running an e-shop. You have over 1000 photos of your products that needs to be uploaded to your website, but you have to improve them to meet your requirements. You must have each photo same exact size and the product located directly in the middle. You can do it all manually with your hands or you can use"
                        )}
                        <Highlight> Image pipeline!</Highlight>
                    </p>
                    <TryButton onClick={() => onStart(eshopLoadTemplate)} />
                </div>
                <StyledImage src={massEditnig} />
            </StyledContainerBox>

            <StyledContainerBox>
                <StyledImage src={baseImg} />
                <div>
                    <StyledTitle>{_("Case: Game sprites")}</StyledTitle>
                    <p>
                        {_(
                            "You are creating a game, you found the greatest sprites for animation for your game, but you need to made background transparent and every animation frame is different size or is there some annoying padding. Create a"
                        )}
                        <Highlight> pipeline </Highlight>
                        {_(
                            "that will do all the work for you and converts all your animation sheets into useable form."
                        )}
                    </p>
                    <TryButton onClick={() => onStart(spriteLoadTemplate)} />
                </div>
            </StyledContainerBox>
            <StyledContainerBox>
                <div>
                    <StyledTitle>{_("Case: Neural network - dataset")}</StyledTitle>
                    <p>
                        {_(
                            "You would like to train your own neural network. You already have some dataset of images but for better robustability you would like to generate some more data by mirroring, rotating or recoloring your dataset, so that your neural network will handle these variants as well. But how can you do that? You probably can use some downloaded script or write your script that will transform your data, but what if there will be some more userfriendly solution such as"
                        )}
                        <Highlight> Image pipeline.</Highlight>
                    </p>
                    <TryButton onClick={() => onStart(neuralLoadTemplate)} />
                </div>
                <StyledImage src={baseImg} />
            </StyledContainerBox>
        </StyledColumn>
    );
};

const TryButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <StyledRow>
            <Button variant="contained" onClick={onClick}>
                {_("Show example")}
            </Button>
        </StyledRow>
    );
};

const StyledColumn = styled(Column)`
    padding: 0 ${spacingCss(4)};
    gap: ${spacingCss(4)};
    max-width: min(100%, 1000px);
    margin: 0 auto;
`;

const StyledTitle = styled(Highlight)`
    font-size: 18px;
`;

const StyledContainerBox = styled(Row)`
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: ${spacingCss(4)} ${spacingCss(2)};
    gap: ${spacingCss(10)};

    & p {
        margin: ${spacingCss(2)} 0 ${spacingCss(4)};
    }
`;

const StyledImage = styled.img`
    width: 300px;
    height: 200px;
`;

const StyledRow = styled(Row)`
    justify-content: center;
`;
