import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axiosInstance from "./axios";

const storeData = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', `Bearer ${token}`);
    } catch (error) {
        console.warn(error)

        return Alert.alert('Erro', 'Um erro inesperado ocorreu ao logar')
    }
};

export default storeData;
