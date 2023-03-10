import { useEffect, useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";

import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native'
import { useAuth } from "../../hooks/auth";

interface FormData {
    [name: string]: string;
}

const Schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatorio'),
    amount: Yup
        .number()
        .typeError("Informe um valor númerico")
        .positive("O valor não pode ser negativo")
        .required("O valor é obrigatorio")
})

export function Register() {
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const {user} = useAuth()

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(Schema)
    })

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    async function handleRegister(form: FormData) {
        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação")
        }

        if (category.key === 'category') {
            return Alert.alert("Selecione a categoria")
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`
            const data = await AsyncStorage.getItem(dataKey)
            const currentData = data ? JSON.parse(data) : []

            const dataformatted = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataformatted))

            reset()
            setTransactionType("")
            setCategory({
                key: 'category',
                name: 'Categoria'
            })

            navigate("Listagem")
        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possivel salvar")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionsTypeSelect("positive")}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionsTypeSelect("negative")}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />

                    </Fields>

                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}