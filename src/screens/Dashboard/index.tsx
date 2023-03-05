import React, { useCallback, useEffect, useState } from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TrasactionCard, TrasactionCardProps } from '../../components/TransactionCard'
import { ActivityIndicator } from 'react-native'
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList, LoadContainer } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from "date-fns";
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native'

export interface DataListProps extends TrasactionCardProps {
    id: string
}

interface HightLightProps {
    amount: string;
    lastTransaction: string
}

export interface HightLightData {
    entries: HightLightProps;
    expensive: HightLightProps;
    total: HightLightProps;
}
export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [hightLightData, setHighLightData] = useState<HightLightData>({} as HightLightData)

    const theme = useTheme()

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
        const lastTransactions = new Date(
            Math.max.apply(Math, transactions
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())
            ))

        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`
    }

    async function loadTransactions() {
        try {

            const dataKey = '@gofinances:transactions'
            const response = await AsyncStorage.getItem(dataKey)
            const transactions = response ? JSON.parse(response) : []

            let entriesTotal = 0;
            let expensiveTotal = 0

            const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: "BRL"
                    })

                const formattedDate = format(new Date(item.date), 'dd/MM/yyyy');

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date: formattedDate
                }
            })

            const total = entriesTotal - expensiveTotal

            const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
            const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative')
            const totalInterval = `01 a ${lastTransactionExpenses}`

            setHighLightData({
                entries: {
                    amount: entriesTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: `Última entrada dia ${lastTransactionEntries}`
                },
                expensive: {
                    amount: expensiveTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: `Última saida dia ${lastTransactionExpenses}`
                },
                total: {
                    amount: total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }),
                    lastTransaction: totalInterval
                }
            })

            setTransactions(transactionsFormatted)
            
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        loadTransactions()
        // async function apagar() {
        //     await AsyncStorage.removeItem('@gofinances:transactions')

        // }
        // apagar()
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large" />
                    </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: "https://avatars.githubusercontent.com/u/54370234?v=4" }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>Rodrigo</UserName>
                                    </User>
                                </UserInfo>
                                <Icon name="power" />
                            </UserWrapper>
                        </Header>

                        <HighlightCards>
                            <HighlightCard
                                title='Entradas'
                                amount={hightLightData.entries.amount}
                                lastTransaction={hightLightData.expensive.lastTransaction}
                                type='up'
                            />
                            <HighlightCard
                                title='Saidas'
                                amount={hightLightData.expensive.amount}
                                lastTransaction={hightLightData.expensive.lastTransaction}
                                type='down'
                            />
                            <HighlightCard
                                title='Total'
                                amount={hightLightData.total.amount}
                                lastTransaction={hightLightData.total.lastTransaction}
                                type='total'
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TrasactionCard data={item} />}
                            />


                        </Transactions>
                    </>
            }
        </Container>
    )
}

