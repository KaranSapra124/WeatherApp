import React from 'react';
import { View, Text } from 'react-native';

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
        <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Astro Info</Text>

            <Text>🌅 Sunrise: {astroData?.sunrise}</Text>
            <Text>🌇 Sunset: {astroData?.sunset}</Text>

            <Text>🌙 Moonrise: {astroData?.moonrise}</Text>
            <Text>🌒 Moonset: {astroData?.moonset}</Text>

            <Text>🌗 Moon Phase: {astroData?.moon_phase}</Text>
            <Text>💡 Moon Illumination: {astroData?.moon_illumination}%</Text>

            <Text>🌕 Moon Up: {astroData?.is_moon_up ? 'Yes' : 'No'}</Text>
            <Text>☀️ Sun Up: {astroData?.is_sun_up ? 'Yes' : 'No'}</Text>
        </View>
    );
};

export default AstroInfo;
