import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from "./styles";

export function TrasactionCard() {
    return (
        <Container>
            <Title>Desenvolvimento de site</Title>
            <Amount>R$ 12.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>28/08/2022</Date>
            </Footer>
        </Container>
    )
}