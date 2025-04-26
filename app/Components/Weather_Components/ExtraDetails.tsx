import React from 'react'
import { Text, View } from 'react-native'
import { Feather, FontAwesome6 } from '@expo/vector-icons';


export interface details {
    uv: number;
    feelsLike: number;
    humidity: number
}
const ExtraDetails: React.FC<{ details: details | null }> = ({ details }) => {
    console.log(details)
    return (
        <>
            <View>
                <View>
                    <Feather name='sun' size={16} color="#2563EB" iconStyle='solid' />
                    <Text>UV</Text>
                    <Text>{details?.uv}</Text>
                </View>
                <View>
                    <FontAwesome6 name='temperature-high' size={16} color="#2563EB" iconStyle='solid' />
                    <Text>Feels Like</Text>
                    <Text>{details?.feelsLike}</Text>
                </View>
                <View>
                    <Feather name='droplet' size={16} color="#2563EB" iconStyle='solid' />
                    <Text>Humidity</Text>
                    <Text>{details?.humidity}</Text>
                </View>
            </View>
        </>
    )
}

export default ExtraDetails
