import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from "expo-location";
import { FontAwesome6 } from '@expo/vector-icons';


const Weather = () => {
    interface WeatherCondition {
        text: string;
        icon: string;
        code: number;
    }

    interface CurrentWeather {
        temp_c: number;
        condition: WeatherCondition;
        humidity: number;
        wind_kph: number;
        pressure_mb: number;
    }

    interface Coords {
        latitude: number;
        longitude: number;
    }

    interface WeatherAPIResponse {
        location: {
            name: string;
        };
        current: CurrentWeather;
    }

    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [city, setCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords as Coords;

            try {
                const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=1863401e31784462a60170621252001&q=${latitude},${longitude}&aqi=no`);
                const data: WeatherAPIResponse = await res.json();
                setWeather(data.current);
                setCity(data.location.name);
            } catch (error) {
                setErrorMsg("Failed to fetch weather data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 bg-blue-100 items-center justify-center">
                <ActivityIndicator size="large" color="#1e3a8a" />
                <Text className="mt-4 text-blue-800 font-medium">Fetching weather...</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View className="flex-1 items-center justify-center bg-red-100 px-6">
                <Text className="text-red-700 font-semibold text-lg">{errorMsg}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-gradient-to-b from-blue-200 to-blue-50 p-6">
            <View className="items-center justify-center mt-10">
                <FontAwesome6 name="location-dot" size={24} color="#1e40af" iconStyle='solid' />
                <Text className="text-4xl font-bold text-blue-900 mb-2">{city}</Text>
                <Image className="w-32 h-32" source={{ uri: "https:" + weather?.condition?.icon }} />
                <Text className="text-6xl font-semibold text-blue-800">{weather?.temp_c}°C</Text>
                <Text className="text-xl text-gray-700 mt-2">{weather?.condition?.text}</Text>
            </View>

            <View className="mt-10 bg-white rounded-2xl shadow-md p-6 space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-500">Humidity</Text>
                    <Text className="font-semibold text-gray-800">{weather?.humidity}%</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-500">Wind Speed</Text>
                    <Text className="font-semibold text-gray-800">{weather?.wind_kph} km/h</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-500">Pressure</Text>
                    <Text className="font-semibold text-gray-800">{weather?.pressure_mb} hPa</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Weather;
