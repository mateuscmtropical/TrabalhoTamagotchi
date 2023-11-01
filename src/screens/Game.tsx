import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { Modal, Portal, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/AntDesign";
import axiosInstance from '../config/axios';
import { Pet } from './Home';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    homeNavigate: {
        width: '100%',
        position: 'absolute',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigateHome: {
        height: 60,
        width: '93%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        top: 40,
        height: 60,
        fontSize: 20,
        width: '93%',
        color: 'black',
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 10,
    },
    playInput: {
        top: 50,
        height: 60,
        width: '93%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 300,
    },
})

const Game = ({ route, navigation }: { route: any, navigation: any }) => {
    const [userNumbers, setUserNambers] = useState<string>()
    const [sorterNumbers, setSorterNumbers] = useState<number | undefined>()
    const [isDialogVisible, setIsDialogVisible] = useState(false)

    const navigateToHome = () => {
        navigation.navigate('Home')
    }

    const handlePlay = async () => {
        const number = Number(userNumbers);
        const { pet } = route.params;
        console.log("asasas", pet);
        if (number < 1 || number > 9) return Alert.alert('Inválido', 'Por favor, digite números válidos');

        const numeroAleatorio = Math.floor(Math.random() * 9) + 1;
        setSorterNumbers(numeroAleatorio);
        setIsDialogVisible(true);

        if (numeroAleatorio === number) {
            try {
                const requestData = {
                    name: pet.name
                }
                const { data } = await axiosInstance.post(`/pet/${pet.id}/play`, requestData);

                if (!data) {
                    return Alert.alert('Não foi possível brincar com o pet');
                }
            } catch (error) {
                return Alert.alert('Erro na requisição ao servidor');
            }
        }
    }

    const hideDialog = () => {
        setIsDialogVisible(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <TextInput
                    placeholder='Digite um número de entre 1 e 9'
                    style={styles.textInput}
                    onChangeText={setUserNambers}
                    keyboardType='number-pad'
                    maxLength={1}
                />

                <TouchableOpacity style={styles.playInput} onPress={handlePlay}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Jogar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.homeNavigate}>
                <TouchableOpacity
                    style={styles.navigateHome}
                    onPress={navigateToHome}
                >
                    <Text style={{ color: 'black' }}>
                        <Icon
                            name='arrowleft'
                            color='black'
                            size={40}
                        />
                    </Text>
                </TouchableOpacity>
            </View>

            <Portal>
                <Modal visible={isDialogVisible} onDismiss={hideDialog}>
                    <View>
                        <View style={styles.dialogContent}>
                            {sorterNumbers !== undefined && (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name={sorterNumbers === Number(userNumbers) ? 'check' : 'close'}
                                        color={sorterNumbers === Number(userNumbers) ? 'green' : 'red'}
                                        size={100}
                                    />
                                    <Text>{sorterNumbers === Number(userNumbers) ? 'Você acertou!' : 'Os números não conferem,'} o número sorteado foi: {sorterNumbers}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}


export default Game;