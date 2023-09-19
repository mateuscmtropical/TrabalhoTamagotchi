import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import axiosInstance from '../config/axios';
import { validate } from '../helper/loginHelper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBody: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center'
    },
    viewInput: {
        width: '90%'
    },
    message: {
        fontSize: 28,
    },
    title: {
        fontSize: 20,
        marginTop: 28,
        color: 'black'
    },
    textInput: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        color: 'black'
    },
    loginText: {
        color: 'black',
        fontSize: 20,
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        width: '90%',
        height: 45,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorInput: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        color: 'red',
    },
    errorMessage: {
        color: 'red',
    },
})

const Register = ({ navigation }: any) => {
    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [confirmarSenha, setConfirmarSenha] = useState<string>();
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(String(login))) {
            setIsEmailValid(false);
            setErrorMessage('Email inválido');
        } else {
            setIsEmailValid(true);
            setErrorMessage('');
        }
    };

    const onRegister = async () => {
        try {
            const isValid = validate(login!, senha!)

            if (!isValid) return Alert.alert('Valor inválido', 'O valor passado em login/senha está incorreto')

            if (confirmarSenha !== senha) return Alert.alert('Valor inválido', 'As senhas não estão iguais')

            const loginData = {
                email: login,
                password: senha
            }

            const { data, status } = await axiosInstance.post('/register', loginData)

            if (!data || status !== 200) return Alert.alert('Erro ao realizar operação', 'Não foi possível criar seu usuário no momento')

            navigation.navigate('Login')
        } catch (error) {
            const { data } = await axios.get('https://api.chucknorris.io/jokes/random')
            Alert.alert('Não foi possível efetuar o login, mas fique com um fato do Chuck Norris', data.value)

            console.warn(error);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground
                    source={require('../public/images/pets.png')}
                    style={{ width: 450, height: 300 }}
                    resizeMode='cover'
                />
            </View>

            <View style={styles.containerBody}>
                <View style={styles.viewInput}>
                    <Text style={styles.title}>E-mail</Text>
                    <TextInput
                        placeholder='Digite o login'
                        style={styles.textInput}
                        onChangeText={setLogin}
                        onBlur={validateEmail}
                    />
                    {!isEmailValid && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        placeholder='Digite a senha'
                        style={styles.textInput}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.title}>Confirmar senha</Text>
                    <TextInput
                        placeholder='Digite a confirmação de senha'
                        style={styles.textInput}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={onRegister}>
                    <Text style={styles.loginText}>Registrar-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register;