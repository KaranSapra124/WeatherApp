import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome6, Feather } from '@expo/vector-icons';


export interface AstroProps {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
}

const AstroInfo: React.FC<{ astroData: AstroProps | null }> = ({
    astroData
}) => {
    return (
        <View className='flex flex-col  my-6 w-full bg-white/50 gap-5 p-2 rounded'>
            <Text className='font-bold text-blue-900 text-start'>Astro Movements</Text>
            <View className='flex flex-row justify-between gap-4'>
                <View className='flex flex-col justify-center items-center'>
                    <Feather name="sunrise" size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='my-1 font-semibold text-blue-900'>     {astroData?.sunrise}</Text>
                </View>
                <View className='flex flex-col justify-center items-center'>
                    <Feather name="sunset" size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='my-1 font-semibold text-blue-900'>{astroData?.sunset}</Text>
                </View>
                <View className='flex flex-col justify-center items-center'>
                    <Feather name="moon" size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='my-1 font-semibold text-blue-900'>{astroData?.moonrise}</Text>
                </View>
                <View className='flex flex-col justify-center items-center'>
                    <Feather name="sun" size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='my-1 font-semibold text-blue-900'>{astroData?.moonset}</Text>
                </View>
            </View>
        </View>
    );
};

export default AstroInfo;
