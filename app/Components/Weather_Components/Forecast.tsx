import React from 'react'
import { Image, Text, View } from 'react-native'

export interface WeatherForecast {
    date: string
    icon: string
    temp: {
        maxTemp: string;
        minTemp: string;
    }
}
const Forecast: React.FC<{ data: WeatherForecast[] | undefined | null }> = ({ data }) => {
    // https://api.weatherapi.com/v1/forecast.json?key=1863401e31784462a60170621252001&q=New Delhi&days=7&aqi=no&alerts=no
    // console.log(data)
    return (
        <>
            <View className='bg-white/50 p-2 rounded'>
                {/* <Text className='text-lg font-bold text-blue-900'>2 Days Forecast</Text> */}
                {data?.map((elem, index) => {
                    const formatDate = (dateString: string) => {
                        const dateObj = new Date(dateString);
                        const formatter = new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'long',
                        });
                        return formatter.format(dateObj); // Example: "28 April"
                    };
                    // const newDate = new Date(elem?.date).getDate().toLocaleString('default', { month: 'long' })
                    return <View key={index} className='flex flex-row justify-between items-center'>
                        <Text className='text-lg font-semibold text-blue-900'> {formatDate(elem?.date)}</Text>
                        <Image src={elem?.icon} alt='No Image' className='h-12 w-12' />
                        <View className='flex flex-row gap-0.5 font-bold'>
                            <Text className='text-lg font-semibold text-blue-900'>{Math.ceil(+elem?.temp?.maxTemp)}/</Text>
                            <Text className='text-lg font-semibold text-blue-900'>{Math.ceil(+elem?.temp?.minTemp)}</Text>
                        </View>
                    </View>
                })}

            </View>
        </>
    )
}

export default Forecast
