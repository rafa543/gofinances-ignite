import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { Container, Header, Title, Content } from "./styles";

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    async function loadData() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted.filter(
            (expensive: TransactionData) => expensive.type === 'negative'
        )

        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total
                })
            }

        })

        setTotalByCategories(totalByCategory)
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            amount={item.total}
                            title={item.name}
                            color={item.color}
                        />
                    ))
                }
            </Content>
        </Container>
    )
}