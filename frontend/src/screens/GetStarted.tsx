import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {CustomBTN} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const GetStarted = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const NavigateToHome = () => {
    // navigate to the home screen
    navigation.navigate('Home');
  };
  return (
    <ImageBackground
      className="flex w-full h-full"
      source={require('../assets/getstarted_img.png')}>
      <LinearGradient
        colors={['transparent', '#ffffff']}
        className="w-full h-full"
        style={{flex: 1}}
        start={{x: 0, y: 0.5}}
        end={{x: 0, y: 0.7}}>
        {/* view to push the items to the bottom */}
        <View className="h-[66%]" />
        <View className="text-center items-center">
          <Text className="text-3xl font-bold text-black/80 ">
            Ignite your Ideas with Captivating Visuals{' '}
          </Text>
          <Text className="text-lg font-bold text-neutral-600">
            {' '}
            Unlock the power of your imagination and experience the thrill of
            brining your creative visions to to life like never before
          </Text>
          {/* btn */}
          <CustomBTN title="Get Started" onPress={NavigateToHome} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GetStarted;
