import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import axiosInstance from '../config/axios';
import { validate } from '../helper/loginHelper';
import storeData from '../config/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    registerButton: {
        marginTop: 80,
        borderBottomWidth: 1,
        width: '90%',
        alignItems: 'center'
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

const Login = ({ navigation }: any) => {
    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const hasToken = async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) navigation.navigate('Home')
    }

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

    const onLogin = async () => {
        try {
            if (!isEmailValid) return Alert.alert('Valor inválido', 'E-mail é inválido')

            const isValid = validate(login!, senha!)

            if (!isValid) return Alert.alert('Valor inválido', 'O valor passado em login/senha está incorreto')

            const loginData = {
                email: login,
                password: senha
            }

            const { data } = await axiosInstance.post('/login', loginData)

            if (!data.token) return Alert.alert('Erro ao realizar operação', 'Não foi possível realizar o login no momento')

            storeData(data.token)

            navigation.replace('Home')
        } catch (error: any) {
            if (error.response?.status === 401) return Alert.alert('Erro ao realizar a operação', error.response?.data.message)

            console.warn(error);

            return Alert.alert('Não foi possível realizar o login')
        }
    }

    const onRegister = () => {
        navigation.navigate('Register')
    }

    useEffect(() => {
        hasToken()
    }, [])

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
                        placeholder='Digite o e-mail'
                        style={styles.textInput}
                        onChangeText={setLogin}
                        onBlur={validateEmail}
                    />
                    {
                        !isEmailValid && <Text style={styles.errorMessage}>
                            {errorMessage}
                        </Text>
                    }
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

                <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
                    <Text style={styles.loginText}>Não possui conta? Registre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;