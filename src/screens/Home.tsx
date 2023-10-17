import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PetCard from '../components/PetCard';
import axiosInstance from '../config/axios';
import { AxiosError } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/styles';
import { Modal, Portal, TextInput, Title } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const { buttonReload, buttonLogout, tertiary, primary } = colors;

export type Pet = {
    id: number;
    name: string;
    userId: number;
    restLevel: number;
    foodLevel: number;
    funLevel: number;
    lastGet: string;
    life: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null,
}

export type Pets = {
    pets: Pet[]
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    buttonContainer: {
        gap: 12,
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        height: 60,
        width: '45%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createPetContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCreatePet: {
        height: 60,
        width: '93%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    dialogContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 300,
    },
    inputContainer: {
        marginTop: 50,
        gap: 30,
    },
    textInput: {
        height: 40,
        fontSize: 16,
        color: 'black',
        marginBottom: 12,
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    createPetInput: {
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Home = ({ navigation }: any) => {
    const [pets, setPets] = useState<Pet[]>()
    const [petData, setPetData] = useState<string>()
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const getPets = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get('/pets');

            const { pets: petsResponse } = data;

            setPets(petsResponse);
        } catch (error) {
            const errorResponse = error as AxiosError;

            console.warn(errorResponse.response);

            if (errorResponse.response?.status === 401) return navigation.navigate('Login')

            return null;
        }
    }, [])

    const createPet = async () => {
        try {
            const requestData = {
                name: petData
            }

            const { data } = await axiosInstance.post('/pet', requestData)

            if (!data) return Alert.alert('Não foi possível realizar o cadastro do pet')

            getPets()
            setIsDialogVisible(false)
        } catch (error) {
            console.warn(error);
            return Alert.alert('Não foi possível realizar o cadastro do pet')
        }
    }

    const showDialog = () => {
        setIsDialogVisible(true);
    }

    const hideDialog = () => {
        setIsDialogVisible(false);
    }

    const dialogContent = () => {
        return (
            <Portal>
                <Modal visible={isDialogVisible} onDismiss={hideDialog} style={{ margin: 15 }}>
                    <View style={styles.dialogContent}>
                        <TouchableOpacity onPress={hideDialog} style={styles.closeButton}>
                            <Icon
                                name='close'
                                color='black'
                                size={40}
                            />
                        </TouchableOpacity>
                        <Title style={{ color: 'black' }}>Cadastro de pet</Title>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Digite o nome do pet'
                                style={styles.textInput}
                                onChangeText={setPetData}
                            />

                            <TouchableOpacity style={styles.createPetInput} onPress={createPet}>
                                <Text style={{ color: 'black' }}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>
        )
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login ' }]
        })
    }

    const reloadPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    useEffect(() => {
        getPets()
        setInterval(() => {
            getPets()
        }, 60000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonLogout }]}
                    onPress={logout}
                >
                    <Text style={{ color: tertiary }}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonReload }]}
                    onPress={reloadPage}
                >
                    <Text style={{ color: tertiary }}>Reload</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, marginBottom: 160 }}>
                <FlatList
                    data={pets}
                    renderItem={({ item }) => <PetCard pet={item} reload={reloadPage} />}
                />
            </View>
            <View style={styles.createPetContainer}>
                <TouchableOpacity
                    style={styles.buttonCreatePet}
                    onPress={showDialog}
                >
                    <Text style={{ color: primary }}>Adicionar Pet</Text>
                </TouchableOpacity>
            </View>
            {dialogContent()}
        </SafeAreaView>
    );
}

export default Home;