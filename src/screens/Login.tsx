import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';

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
    }
})

const validate = (login: string, senha: string) => {
    if (typeof login !== 'string' || login.length === 0 || login.length > 200) {
        return false
    }

    if (typeof senha !== 'string' || senha.length < 6 || senha.length > 200) {
        return false
    }

    return true
}

const Login = ({ navigation }: any) => {
    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();

    const onLogin = async () => {
        const isValid = validate(login!, senha!)

        if (!isValid) {
            return (
                Alert.alert('Valor inválido', 'O valor passado em login/senha está incorreto')
            )
        }

        const { data } = await axios.get('https://api.chucknorris.io/jokes/random')

        if (!data) {
            return (
                Alert.alert('Erro ao realizar operação', 'Não foi possível realizar o login no momento')
            )
        }

        Alert.alert('Não foi possível efetuar o login, mas fique com um fato do Chuck Norris', data.value)

        /*
            Sem API não da para levar pra tela Home 
            navigation.navigate('Home')
        */
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
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        placeholder='Digite o login'
                        style={styles.textInput}
                        onChangeText={setLogin}
                    />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        placeholder='Digite a senha'
                        style={styles.textInput}
                        onChangeText={setSenha}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;