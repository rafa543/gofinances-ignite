import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TrasactionCard } from '../../components/TransactionCard'

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title } from './styles'

export function Dashboard() {
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

                <TrasactionCard/>
            </Transactions>

        </Container>
    )
}

