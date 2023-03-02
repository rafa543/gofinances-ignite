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

interface Category {
    name: string;
    icon: string
}

export interface TrasactionCardProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: Category;
    date: string
}

interface Props {
    data: TrasactionCardProps

}

export function TrasactionCard({data}: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                {data.type === 'negative' && "- "}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}