import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PetCard from '../components/PetCard';
import axiosInstance from '../config/axios';
import { AxiosError } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/styles';

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
    createPettContainer: {
        width: '100%',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCreatePett: {
        position: 'absolute',
        height: 60,
        width: '93%',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const { buttonReload, buttonLogout, tertiary } = colors;

const Home = ({ navigation }: any) => {
    const [pets, setPets] = useState<Pet[]>()

    const getPets = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get('/pets');

            const { pets: petsResponse } = data;

            setPets(petsResponse);
        } catch (error) {
            const errorResponse = error as AxiosError;

            console.warn(errorResponse.response);
            return null;
        }
    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    const reloadPage = () => {
        getPets()
    }

    useEffect(() => {
        getPets()
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
            <View>
                <FlatList
                    data={pets}
                    renderItem={({ item }) => <PetCard pet={item} />}
                />
            </View>
            <View style={styles.createPettContainer}>
                <TouchableOpacity
                    style={[styles.buttonCreatePett, { backgroundColor: buttonLogout }]}
                    onPress={logout}
                >
                    <Text style={{ color: tertiary }}>Adicionar Pet</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home;