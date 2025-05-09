import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import * as Location from "expo-location";
import { FontAwesome6 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import AstroInfo, { AstroProps } from './Components/Weather_Components/FullDay';
import Forecast, { WeatherForecast } from './Components/Weather_Components/Forecast';
import ExtraDetails, { details } from './Components/Weather_Components/ExtraDetails';


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
        uv: number;
        feelslike_c: number
    }

    interface Coords {
        latitude: number;
        longitude: number;
    }
    interface forecastday {
        date: string;

        day: {
            maxtemp_c: string;
            mintemp_c: string;
            condition: {
                icon: string
            }
        };
        astro: any;
    }

    interface WeatherAPIResponse {
        location: {
            name: string;
        };

        current: CurrentWeather;
        forecast: {
            forecastday: forecastday[]
        }
        uv: number;
        feelslike_c: number;
        humidity: number
    }


    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [city, setCity] = useState<string>("");
    const [userCity, setUserCity] = useState('');

    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [astro, setAstro] = useState<AstroProps | null>(null);
    const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[] | null | undefined>(null)
    const [extraDetails, setExtraDetails] = useState<details | null>(null)
    const handleCitySearch = async () => {
        setLoading(true);
        if (!userCity) return;
        console.log(userCity)

        try {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1863401e31784462a60170621252001&q=${userCity}&days=3&aqi=no&alerts=no`);
            const data: WeatherAPIResponse = await res.json();
            // Extract forecast data
            const foreCast: WeatherForecast[] = data?.forecast?.forecastday
                ?.filter((_, index) => index !== 0)   // Filter out the first element
                .map((elem) => ({
                    date: elem.date,
                    icon: 'https:' + elem?.day?.condition?.icon,
                    temp: {
                        maxTemp: elem.day.maxtemp_c.toString(),
                        minTemp: elem.day.mintemp_c.toString(),
                    },
                }));

            // Set weather data and extra details in state
            setExtraDetails({ uv: data?.current?.uv, feelsLike: data?.current?.feelslike_c, humidity: data?.current?.humidity });
            setAstro(data?.forecast?.forecastday[0]?.astro);
            setWeather(data.current);
            setWeatherForecast(foreCast);
            setCity(data.location.name);
            setErrorMsg(null)

        } catch (error) {
            console.log(error, "ERRORORO")
            setErrorMsg('Failed to fetch weather data');
        }
        finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        // console.log('hello')
        (async () => {
            // console.log("USEEFFECT")
            try {
                // Check current permission status only once
                const { status } = await Location.getForegroundPermissionsAsync();
                // console.log(status, 'STATUS');

                // If permission is not granted, request it
                if (status !== 'granted') {
                    const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
                    if (newStatus !== 'granted') {
                        setErrorMsg('Location permission denied');
                        setLoading(false);
                        return; // If denied, exit early
                    }
                }

                // Fetch current location once permission is granted
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords as Coords;

                // Fetch weather data using the latitude and longitude
                const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1863401e31784462a60170621252001&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`);
                const data: WeatherAPIResponse = await res.json();

                // Extract forecast data
                const foreCast: WeatherForecast[] = data?.forecast?.forecastday
                    ?.filter((_, index) => index !== 0)   // Filter out the first element
                    .map((elem) => ({
                        date: elem.date,
                        icon: 'https:' + elem?.day?.condition?.icon,
                        temp: {
                            maxTemp: elem.day.maxtemp_c.toString(),
                            minTemp: elem.day.mintemp_c.toString(),
                        },
                    }));

                // Set weather data and extra details in state
                setExtraDetails({ uv: data?.current?.uv, feelsLike: data?.current?.feelslike_c, humidity: data?.current?.humidity });
                setAstro(data?.forecast?.forecastday[0]?.astro);
                setWeather(data.current);
                setWeatherForecast(foreCast);
                setCity(data.location.name);
            } catch (error) {
                setErrorMsg("Enter the location:");
            } finally {
                setLoading(false);
            }
        })();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts


    if (loading) {
        return (
            <View className="flex-1 bg-blue-100 items-center justify-center">
                <FontAwesome6 name="cloud" iconStyle="solid" color="#2563EB" size={40} />
                <Text className="mt-4 text-blue-800 font-medium">Fetching weather...</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View className="flex-1 items-center justify-center bg-blue-100 p-6">
                <Text className="text-blue-900 text-xl font-semibold mb-4">{errorMsg}</Text>
                <TextInput
                    className="w-4/5 h-12 px-4 mb-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city name"
                    value={userCity}
                    onChangeText={setUserCity}
                />
                <TouchableOpacity
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md"
                    onPress={handleCitySearch}
                >
                    <Text className="text-lg font-semibold text-white ">Search</Text>
                </TouchableOpacity>
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
                    <Text className="text-[6rem] font-medium text-blue-900">{weather?.temp_c}°C</Text>
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
                <AstroInfo astroData={astro} />
                <Forecast data={weatherForecast} />
                <ExtraDetails details={extraDetails} />
            </ScrollView>

        </>
    );
};

export default Weather;
