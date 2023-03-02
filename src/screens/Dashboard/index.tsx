import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TrasactionCard, TrasactionCardProps } from '../../components/TransactionCard'

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList } from './styles'

export interface DataListProps extends TrasactionCardProps {
    id: string
}

export function Dashboard() {
    const data: DataListProps[] = [{
        id: '1',
        type: 'positive',
        title:'Desenvolvimento de site',
        amount:'R$ 12.000,00',
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"13/04/2020"
    },
    {
        id: '2',
        type: 'negative',
        title:'Hamburgeria Pizzy',
        amount:'R$ 59,90',
        category:{
            name: 'Alimentação',
            icon: 'coffee'
        },
        date:"13/04/2020"
    },
    {
        id: '3',
        type: 'negative',
        title:'Aluquel do apartamento',
        amount:'R$ 1.200,00',
        category:{
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date:"13/04/2020"
    }]

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
                    renderItem={({item}) => <TrasactionCard data={item}/>}
                />
                

            </Transactions>

        </Container>
    )
}

