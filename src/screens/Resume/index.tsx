import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles";

export function Resume() {
    return (
        <Container>
        <Header>
            <Title>Resumo por categoria</Title>
        </Header>

        <HistoryCard amount="150,50" title="Compras" color="red"/>
    </Container>
    )
}