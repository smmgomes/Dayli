import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeThemeValue = async (theme: string) => {
    try{
        await AsyncStorage.setItem('theme', theme);
    } catch (error) {
        console.error('Error saving theme color', error); 
    }
}

export const loadThemeValue = async () => {
    try {
        const themeValue = await AsyncStorage.getItem('theme'); 
        if (themeValue) {
            return themeValue;
        }
        else {
            return 'light'; 
        }
    } catch (error) {
        console.error('Error getting theme color', error);
        return 'light'; 
    }
}

