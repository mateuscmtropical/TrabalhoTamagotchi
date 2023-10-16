import React, { useEffect, useState, useCallback } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Avatar, Title, Portal, Modal, Text, TextInput } from "react-native-paper";
import { Pet, Pets } from "../screens/Home";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import axiosInstance from "../config/axios";
import Icon from "react-native-vector-icons/AntDesign";

const { Content } = Card;
const { Image } = Avatar;

const styles = StyleSheet.create({
    card: {
        margin: 15
    },
    cardContent: {
        gap: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        gap: 17,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        gap: 17,
        alignItems: 'center',
        flexDirection: 'row',
    },
    deleteIcon: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    editPetDialog: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
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
    },
    petContainer: {
        marginTop: 30,
        gap: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    petButton: {
        height: 60,
        width: '45%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

enum PET_ACTIONS {
    food = 'food',
    rest = 'rest',
    play = 'play',
}

const PetCard = ({ pet, reload }: { pet: Pet, reload: Function }) => {
    const [healthImage, setHealthImage] = useState<AvatarImageSource>(require('../public/images/h100.png'));
    const [foodImage, setFoodImage] = useState<AvatarImageSource>(require('../public/images/f100.png'));
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isActionsVisible, setIsActionsVisible] = useState(false);
    const [petNameEdit, setPetNameEdit] = useState(pet.name)
    const truncatedName = pet.name.length > 4 ? pet.name.substring(0, 4) + "..." : pet.name;

    const editPet = async () => {
        const requestData = {
            name: petNameEdit
        }

        const { data } = await axiosInstance.put(`/pet/${pet.id}`, requestData)

        if (!data) if (!data) return Alert.alert('Não foi possível realizar a edição do pet')

        reload()
        setIsDialogVisible(false)
    }

    const petFood = async () => {
        const requestData = {
            name: petNameEdit
        }

        const { data } = await axiosInstance.post(`/pet/${pet.id}/food`, requestData)

        if (!data) if (!data) return Alert.alert('Não foi possível realizar a edição do pet')

        reload()
        setIsDialogVisible(false)
    }

    const petRest = async () => {
        const requestData = {
            name: petNameEdit
        }

        const { data } = await axiosInstance.post(`/pet/${pet.id}/rest`, requestData)

        if (!data) if (!data) return Alert.alert('Não foi possível realizar a edição do pet')

        reload()
        setIsDialogVisible(false)
    }

    const petPlay = async () => {
        const requestData = {
            name: petNameEdit
        }

        const { data } = await axiosInstance.post(`/pet/${pet.id}/play`, requestData)

        if (!data) if (!data) return Alert.alert('Não foi possível realizar a edição do pet')

        reload()
        setIsDialogVisible(false)
    }

    const healthImagePath = (healthPoints: number) => {
        let healthImage = require('../public/images/h100.png');

        if (healthPoints <= 80 && healthPoints >= 51) healthImage = require('../public/images/h80.png');
        else if (healthPoints <= 50 && healthPoints >= 31) healthImage = require('../public/images/h50.png');
        else if (healthPoints <= 30 && healthPoints >= 7) healthImage = require('../public/images/h30.png');
        else if (healthPoints <= 6) healthImage = require('../public/images/h5.png');

        setHealthImage(healthImage);
    }

    const foodImagePath = (foodPoints: number) => {
        let foodImage = require('../public/images/f100.png');

        if (foodPoints <= 50 && foodPoints >= 6) foodImage = require('../public/images/f50.png');
        else if (foodPoints <= 6) foodImage = require('../public/images/f50.png');

        setFoodImage(foodImage);
    }

    const showDialog = () => {
        setIsDialogVisible(true);
    }

    const hideDialog = () => {
        setIsDialogVisible(false);
    }

    const showPetActions = () => {
        setIsActionsVisible(true);
    }

    const hidePetActions = () => {
        setIsActionsVisible(false);
    }

    const editPetDialog = () => {
        return (
            <Portal>
                <Modal visible={isDialogVisible} onDismiss={hideDialog} style={{ margin: 15 }}>
                    <View style={styles.editPetDialog}>
                        <TouchableOpacity onPress={hideDialog} style={styles.closeButton}>
                            <Icon
                                name='close'
                                color='black'
                                size={40}
                            />
                        </TouchableOpacity>
                        <Title style={{ color: 'black' }}>Edição de pet</Title>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Digite o nome do pet'
                                style={styles.textInput}
                                value={petNameEdit}
                                onChangeText={text => {
                                    setPetNameEdit(text)
                                }}
                            />

                            <TouchableOpacity style={styles.createPetInput} onPress={editPet}>
                                <Text style={{ color: 'black' }}>Alterar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>
        )
    }

    const petActionsDialog = () => {
        return (
            <Portal>
                <Modal visible={isActionsVisible} onDismiss={hidePetActions} style={{ margin: 15 }}>
                    <View style={styles.editPetDialog}>
                        <TouchableOpacity onPress={hidePetActions} style={styles.closeButton}>
                            <Icon
                                name='close'
                                color='black'
                                size={40}
                            />
                        </TouchableOpacity>
                        <Title style={{ color: 'black', marginTop: 15 }}>Cuidados com o pet: {pet.name}</Title>
                        <View >
                            <View style={styles.petContainer}>
                                <Title>Alimentar pet</Title>
                                <TouchableOpacity style={styles.petButton} onPress={petFood}>
                                    <Text style={{ color: 'black' }}>Alimentar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.petContainer}>
                                <Title>Brincar com pet</Title>
                                <TouchableOpacity style={styles.petButton} onPress={petRest}>
                                    <Text style={{ color: 'black' }}>Brincar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.petContainer}>
                                <Title>Descansar pet</Title>
                                <TouchableOpacity style={styles.petButton} onPress={petPlay}>
                                    <Text style={{ color: 'black' }}>Descansar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
        )
    }

    const deleteIten = async () => {
        await axiosInstance.delete(`/pet/${pet.id}`)
        reload()
    }

    useEffect(() => {
        healthImagePath(pet.life)
        foodImagePath(pet.foodLevel)
    }, [])

    return (
        <TouchableOpacity onPress={showPetActions}>
            <Card mode="outlined" style={styles.card}>
                <Content style={styles.cardContent}>
                    <Image source={require('../public/images/pets.png')} />
                    <Title>{truncatedName}</Title>
                    <View style={styles.textContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={healthImage}
                                size={35}
                            />
                            <Image
                                source={foodImage}
                                size={35}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity onPress={showDialog}>
                            <Icon
                                name="edit"
                                color='black'
                                size={40}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteIten}>
                            <Icon
                                name='delete'
                                color='black'
                                size={40}
                                style={styles.deleteIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {editPetDialog()}
                    {petActionsDialog()}
                </Content>
            </Card>
        </TouchableOpacity>
    );
}

export default PetCard;
