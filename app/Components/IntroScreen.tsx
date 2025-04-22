import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Modal } from 'react-native';

const IntroScreen = () => {
    const [isVisible, setIsVisible] = useState<Boolean>(false);
    const router = useRouter()
    return (
        <>
            {/* Header Config */}
            <Stack.Screen
                options={{
                    title: "Welcome",
                    headerTintColor: "blue",
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#f1f5f9' }, // light gray
                    statusBarAnimation: 'fade'
                }}
            />

            {/* Main Content */}
            <View className="flex-1 bg-white items-center justify-center px-4 relative">

                {/* Animated Image */}
                <Image
                    source={{ uri: 'https://cdn-icons-gif.flaticon.com/16939/16939742.gif' }}
                    className="h-80 w-full object-contain absolute top-12"
                    resizeMode="contain"
                />

                {/* App Title */}
                <Text className="text-4xl font-extrabold text-blue-600 mt-96 tracking-wider text-center">
                    ClimaCast
                </Text>

                {/* Start Button */}
                <TouchableOpacity onPress={() => router.push("/Weather")} className="mt-8 bg-blue-600 px-6 py-3 rounded-xl shadow-md active:opacity-80">
                    <Text className="text-white font-semibold text-lg">Start Now</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default IntroScreen;
