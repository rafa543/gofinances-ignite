import { TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import theme from "../../../global/styles/theme"

export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};

    border-radius: 5px;
    padding: 18px;
    align-items: center;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};

`