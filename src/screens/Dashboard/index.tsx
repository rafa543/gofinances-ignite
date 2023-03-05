import React, { useCallback, useEffect, useState } from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TrasactionCard, TrasactionCardProps } from '../../components/TransactionCard'

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from "date-fns";
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TrasactionCardProps {
    id: string
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions() {
        try {


            const dataKey = '@gofinances:transactions'
            const response = await AsyncStorage.getItem(dataKey)

            const transactions = response ? JSON.parse(response) : []

            const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

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

            setData(transactionsFormatted)
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
                    amount='R$ 17.400,00'
                    lastTransaction='Ultima entrada dia 12 de abril'
                    type='up'
                />
                <HighlightCard
                    title='Saidas'
                    amount='R$ 1.259,00'
                    lastTransaction='Ultima saída dia 12 de abril'
                    type='down'
                />
                <HighlightCard
                    title='Entradas'
                    amount='R$ 16.141,00'
                    lastTransaction='Ultima entrada dia 12 de abril'
                    type='total'
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TrasactionCard data={item} />}
                />


            </Transactions>

        </Container>
    )
}

