import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

const Weather = () => {
    const [weather, setWeather] = useState<Object>({})
    return (
        <View className="flex-1 bg-blue-100 items-center justify-center p-6">
            {/* City Name */}
            <Text className="text-3xl font-bold text-blue-800 mb-2">New Delhi</Text>

            {/* Weather Icon */}
            <Image
                className="w-32 h-32 mb-4"
                source={{ uri: 'https://openweathermap.org/img/wn/01d@2x.png' }}
            />

            {/* Temperature */}
            <Text className="text-5xl font-semibold text-blue-700 mb-1">32°C</Text>

            {/* Weather Type */}
            <Text className="text-xl text-blue-600 mb-3">Sunny</Text>

            {/* Extra Details */}
            <View className="flex-row justify-between w-full px-4 mt-4">
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Humidity</Text>
                    <Text className="text-lg font-semibold text-gray-800">40%</Text>
                </View>
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Wind</Text>
                    <Text className="text-lg font-semibold text-gray-800">15 km/h</Text>
                </View>
                <View className="items-center">
                    <Text className="text-sm text-gray-600">Pressure</Text>
                    <Text className="text-lg font-semibold text-gray-800">1015 hPa</Text>
                </View>
            </View>
        </View>
    );
};

export default Weather;
