import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import {Alert} from 'react-native'
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const {signInWithApple, signInWithGoogle} = useAuth()
    const theme = useTheme()

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true)
            return await signInWithGoogle();
        } catch (error) {
            Alert.alert('Não foi possivel conectar a conta Google')
        } finally{
            setIsLoading(false)
        }
    }

    async function handleSignInWithAppe() {
        try {
            setIsLoading(true)
            return await signInWithApple();
        } catch (error) {
            Alert.alert('Não foi possivel conectar a conta Apple')
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {"\n"} finanças de forma {"\n"}muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {"\n"}uma das constas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithAppe}
                    />
                </FooterWrapper>

                {isLoading && 
                    <ActivityIndicator 
                        color={theme.colors.shape} 
                        style={{marginTop: 18}}
                    />}
            </Footer>
        </Container>
    )
}