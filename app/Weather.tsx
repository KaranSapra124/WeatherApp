import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from "expo-location";
import { FontAwesome6 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import AstroInfo, { AstroProps } from './Components/Weather_Components/FullDay';


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
    interface forecastday {
        astro: any
    }

    interface WeatherAPIResponse {
        location: {
            name: string;
        };
        current: CurrentWeather;
        forecast: {
            forecastday: forecastday[]
        }
    }

    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [city, setCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [astro, setAstro] = useState<AstroProps | null>(null)

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
                const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1863401e31784462a60170621252001&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
                const data: WeatherAPIResponse = await res.json();
                // console.log(data?.forecast)
                setAstro(data?.forecast?.forecastday[0]?.astro)
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
        <>

            <Stack.Screen
                options={{
                    title: "Weather",
                    headerTintColor: "#fff",
                    headerTitleAlign: 'left',
                    headerStyle: { backgroundColor: '#60A5FA' }, // light gray
                    statusBarAnimation: 'fade'
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-blue-400 p-6">
                <View className='flex  flex-row gap-2 items-center justify-start '>
                    <FontAwesome6 name="location-dot" size={16} color="#2563EB" iconStyle='solid' />
                    <Text className="text-xl font-medium text-blue-900 ">{city}</Text>
                </View>
                <View className="items-center justify-center my-8">
                    <Text className="text-6xl font-medium text-blue-900">{weather?.temp_c}°C</Text>
                    <Text className="text-2xl  text-gray-300 font-semibold mt-2">{weather?.condition?.text}</Text>
                    {/* <Image className="w-32 h-32" source={{ uri: "https:" + weather?.condition?.icon }} /> */}
                </View>

                <View className=" rounded-2xl  flex flex-row justify-between space-y-4">
                    <View className="flex-row gap-2 justify-between">
                        <FontAwesome6 name="droplet" size={20} color="#2563EB" />
                        <Text className="font-bold text-lg  text-blue-900">{weather?.humidity}%</Text>
                    </View>
                    <View className="flex-row gap-2 justify-between">
                        <FontAwesome6 name="wind" size={20} color="#2563EB" />
                        <Text className="font-bold text-lg  text-blue-900">{weather?.wind_kph} km/h</Text>
                    </View>
                    <View className="flex-row gap-2 justify-between">
                        <FontAwesome6 name="sun" size={20} color="#2563EB" />
                        <Text className="font-bold text-lg  text-blue-900">{weather?.pressure_mb} hPa</Text>
                    </View>
                </View>
                <AstroInfo astroData={astro } />
            </ScrollView>

        </>
    );
};

export default Weather;
