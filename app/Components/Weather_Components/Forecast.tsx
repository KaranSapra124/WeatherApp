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
            <View>
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
                    return <View key={index}>
                        <Text> {formatDate(elem?.date)}</Text>
                        <Image src={elem?.icon} alt='No Image' className='h-20 w-20' />
                        <View className='flex flex-row gap-0.5 font-bold'>
                            <Text>{Math.ceil(+elem?.temp?.maxTemp)}/</Text>
                            <Text>{Math.ceil(+elem?.temp?.minTemp)}</Text>
                        </View>
                    </View>
                })}

            </View>
        </>
    )
}

export default Forecast
