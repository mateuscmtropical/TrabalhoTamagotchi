import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Avatar, Title, Portal, Modal, Text } from "react-native-paper";
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
    dialogContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    }
})

const PetCard = ({ pet }: { pet: Pet }, { navigation }: any) => {
    const [healthImage, setHealthImage] = useState<AvatarImageSource>(require('../public/images/h100.png'));
    const [foodImage, setFoodImage] = useState<AvatarImageSource>(require('../public/images/f100.png'));
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const truncatedName = pet.name.length > 7 ? pet.name.substring(0, 7) + "..." : pet.name;

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

        if (foodPoints <= 50 && foodPoints >= 6) foodImage = require('../public/images/h50.png');
        else if (foodPoints <= 6) foodImage = require('../public/images/h50.png');

        setFoodImage(foodImage);
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
                                style={styles.deleteIcon}
                            />
                        </TouchableOpacity>
                        <Text>Conteúdo do diálogo</Text>
                    </View>
                </Modal>
            </Portal>
        )
    }

    const deleteIten = async () => {
        await axiosInstance.delete(`/pet/${pet.id}`)
        // navigation.navigate('Home')
    }

    useEffect(() => {
        healthImagePath(pet.life)
        foodImagePath(pet.foodLevel)
    }, [])

    return (
        <Card mode="outlined" style={styles.card}>
            <Content style={styles.cardContent}>
                <Image source={require('../public/images/pets.png')} />
                <View style={styles.textContainer}>
                    <Title>{truncatedName}</Title>
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
                            name='edit'
                            color='black'
                            size={40}
                            style={styles.deleteIcon}
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
                {dialogContent()}
            </Content>
        </Card>
    );
}

export default PetCard;
