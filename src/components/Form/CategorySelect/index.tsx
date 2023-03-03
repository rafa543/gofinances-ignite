import { Container, Title, Category, Icon } from "./styles";

interface Props {
    title: string;
}

export function CategorySelect({title}: Props) {
    return(
        <Container>
            <Category>
                <Title>
                    {title}
                </Title>
                <Icon name="chevron-down"/>
            </Category>
        </Container>
    )
}