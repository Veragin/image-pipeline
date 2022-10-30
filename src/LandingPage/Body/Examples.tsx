import { Highlight } from "LandingPage/Components";
import { spacingCss } from "react-utils/Components/globalCss";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";

export const Examples = () => {
    return (
        <StyledColumn>
            <StyledTitle>{_("Case: Eshop")}</StyledTitle>
            <p>
                {_(
                    "Image that you are providing e-shop. You have got over 1000 photos of your product that needs to be uploaded to your website, but you need to enhace them to match your requirements. You need to have every photo same exact size and the product placed right in the middle. You can do it all manually by our hands or you can use"
                )}
                <Highlight> Image pipeline!</Highlight>
            </p>
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
            <StyledTitle>{_("Case: Neural network - dataset")}</StyledTitle>
            <p>
                {_(
                    "You would like to train your own neural network. You already have some dataset of images but for better robustability you would like to generate some more data by mirroring, rotating or recoloring your dataset, so that your neural network will handle these variants as well. But how can you do that? You probably can use some downloaded script or write your script that will transform your data, but waht if there will be some more userfriendly solution such as"
                )}
                <Highlight> Image pipeline.</Highlight>
            </p>
        </StyledColumn>
    );
};

const StyledColumn = styled(Column)`
    padding: 0 ${spacingCss(3)};
`;

const StyledTitle = styled(Highlight)`
    font-size: 18px;
`;
