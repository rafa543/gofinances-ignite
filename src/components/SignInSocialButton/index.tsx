import { SvgProps } from "react-native-svg";
import { RectButtonProps } from "react-native-gesture-handler";
import { Button, ImageContainer, Text } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props) {
    return(
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>

            <Text>
                {title}
            </Text>
        </Button>
    )
}