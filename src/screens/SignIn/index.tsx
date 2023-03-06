import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import {Alert} from 'react-native'

export function SignIn() {
    const {siginWithGoogle} = useAuth()

    async function handleSignInWithGoogle() {
        try {
            await siginWithGoogle();
        } catch (error) {
            Alert.alert('Não foi possivel conectar a conta Google')
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
                    />
                </FooterWrapper>

            </Footer>
        </Container>
    )
}