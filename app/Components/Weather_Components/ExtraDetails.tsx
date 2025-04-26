import React from 'react'
import { Text, View } from 'react-native'
import { Feather, FontAwesome6 } from '@expo/vector-icons';


export interface details {
    uv: number;
    feelsLike: number;
    humidity: number
}
const ExtraDetails: React.FC<{ details: details | null }> = ({ details }) => {
    // console.log(details)
    return (
        <>
            <View className='flex flex-row my-2 justify-between items-center'>
                <View className='shadow-lg bg-white/50 p-2 rounded w-24 h-22'>
                    <Feather name='sun' size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='text-blue-900 font-bold text-md my-1'>UV</Text>
                    <Text className='text-blue-900 font-semibold '>{details?.uv}</Text>
                </View>
                <View className='shadow-lg bg-white/50 p-2 rounded w-24 h-22'>
                    <FontAwesome6 name='temperature-high' size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='text-blue-900 font-bold text-md my-1'>Feels Like</Text>
                    <Text className='text-blue-900 font-semibold '>{details?.feelsLike}</Text>
                </View>
                <View className='shadow-lg bg-white/50 p-2 rounded w-24 h-22'>
                    <Feather name='droplet' size={16} color="#2563EB" iconStyle='solid' />
                    <Text className='text-blue-900 font-bold text-md my-1'>Humidity</Text>
                    <Text className='text-blue-900 font-semibold '>{details?.humidity}</Text>
                </View>
            </View>
        </>
    )
}

export default ExtraDetails
