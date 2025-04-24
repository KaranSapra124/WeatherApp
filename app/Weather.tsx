import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

const Weather = () => {
    interface WeatherCondition {
        text: string;
        icon: string;
        code: number;
    }

    interface CurrentWeather {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: WeatherCondition;
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    }

    const [weather, setWeather] = useState<CurrentWeather>()
    // http://api.weatherapi.com/v1/current.json?key=1863401e31784462a60170621252001&q=Faridabad&aqi=no
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://api.weatherapi.com/v1/current.json?key=1863401e31784462a60170621252001&q=Faridabad&aqi=no');
           
            const  {current}  = await res.json()
            // console.log(data,'DATA')
            setWeather(current)

        }
        fetchData()
    },[])
    return (
        <View className="flex-1 bg-blue-100 items-center justify-center p-6">
            {/* City Name */}
            <Text className="text-3xl font-bold text-blue-800 mb-2">New Delhi</Text>

            {/* Weather Icon */}
            <Image
                className="w-32 h-32 mb-4"
                source={{ uri: "https:" + weather?.condition?.icon }}
            />

            {/* Temperature */}
            <Text className="text-5xl font-semibold text-blue-700 mb-1">{weather?.temp_c}</Text>

            {/* Weather Type */}
            <Text className="text-xl text-blue-600 mb-3">{weather?.condition?.text}</Text>

            {/* Extra Details */}
            <View className="flex-row justify-between w-full px-4 mt-4">
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Humidity</Text>
                    <Text className="text-lg font-semibold text-gray-800">{weather?.humidity}%</Text>
                </View>
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Wind</Text>
                    <Text className="text-lg font-semibold text-gray-800">{weather?.wind_kph} km/h</Text>
                </View>
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Pressure</Text>
                    <Text className="text-lg font-semibold text-gray-800">{weather?.pressure_mb} hPa</Text>
                </View>
            </View>
        </View>
    );
};

export default Weather;
