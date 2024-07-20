import {View, Text, ScrollView, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomBTN} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(AspectRationData[0].ratio);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'ImageDetails'>
    >();

  const [size, setSize] = useState({
    width: AspectRationData[0].width,
    height: AspectRationData[0].height,
  });
  const handleTextChange = (input: string) => {
    if (input.length <= 100) {
      setText(input);
      setTextLength(input.length);
    }
  };
  // handleSelectRatio
  const handleSelectRatio = (aspect: AspectRatioProps) => {
    setSelectedRatio(aspect.ratio);
    setSize({width: aspect.width, height: aspect.height});
  };
  // handleGenerate
  const handleGenerate = async () => {
    // create a request to the backend...
    try {
      const response = await fetch('http://10.0.2.2:4000/api/generate/', { // replace it with 10.0.2.2
        method: 'POST',
        headers: {
          // it doesn't giving good results because the headers..
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          prompt: text,
          width: size.width,
          height: size.height, 
        }),
      });
      if (!response.ok) {
        console.log('Error fetching DATA', response.status);
      }
      // if it's ok proceed, and set the data to response...
      const data = await response.json();
      console.log('Image generated: ', data);
      navigation.navigate('ImageDetails', {image: data[0], title: text}); // will handle it later....
    } catch (error) {
      console.log('Error fetching data from the backend: ', error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-[#f7f7f7da] mx-4 flex-1 h-full">
      <View>
        <View className="my-5 flex flex-row justify-between items-center">
          <FontAwesome6
            name="people-group"
            style={{fontSize: 26, color: '#4F33FC'}}
          />
          <View className="flex flex-row gap-x-4  item-center">
            <View>
              <FontAwesome
                name="bell"
                style={{fontSize: 24, color: '#000000'}}
              />
              <View className="absolute z-30 scale-50 -top-px -right-1 w-4 h-4 rounded-full bg-red-600" />
            </View>
            <Pressable className="bg-action flex flex-row gap-x-1 py-1 justify-center items-center px-2 rounded-full">
              <FontAwesome6
                name="crown"
                style={{fontSize: 20, color: '#ffffff'}}
              />
              <Text className="text-white text-base font-bold"> PRO </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* prompt */}
      <View className="h-[30vh] rounded-3xl bg-white drop-shadow-md p-4 ">
        <Text className="text-black text-xl mt-4 font-semibold">
          {' '}
          Enter Prompt{' '}
        </Text>
        <TextInput
          placeholder="Type anything...."
          placeholderTextColor={'#ADADAD'}
          multiline={true}
          value={text}
          onChangeText={handleTextChange} // will do it later..
          style={{
            textAlignVertical: 'top', // Ensures text starts from the top
          }}
          className="text-lg font-regular rounded-lg flex-wrap text-black/90 w-full h-[70%]"
        />
        <View className='flex flex-row justify-between items-center'>
        <AntDesign name="reload1" size={26} color={'#4F33FC'} />
        <View className='flex flex-row items-center gap-x-3'>
            <Text className='text-lg font-semibold text-black/70 '>{textLength}/100 </Text>
            <Feather name="x" size={23} color={'#4F33FC'} />
        </View>
        </View> 
      </View>
      {/* addons ... */}
      <View className="flex flex-row mt-5 justify-around">
        {addons.map((item, index) => (
          <View
            className="flex flex-row bg-white items-center gap-x-3 px-4 py-3 rounded-2xl shadow"
            key={index}>
            <View>{item.icon}</View>
            <Text className="text-black text-base font-semibold">
              {' '}
              {item.title}{' '}
            </Text>
          </View>
        ))}
      </View>
      {/* Aspect Ratio */}
      <View className="my-5 rounded-xl bg-white drop-shadow-md pt-3 pb-5 px-4">
        <Text className="text-black text-xl my-3 capitalize font-semibold">
          Aspect Ratio
        </Text>
        <View className="flex flex-row gap-x-5 gap-y-4 flex-wrap">
          {AspectRationData.map((item, index) => (
            <Pressable
              onPress={() => handleSelectRatio(item)}
              key={index}
              className={`${
                item.ratio === selectedRatio ? 'bg-action' : 'bg-black/5'
              } w-[27%] flex justify-center items-center justify-items-center rounded-md py-2 px-3 `}>
              <Text
                className={`${
                  item.ratio === selectedRatio ? 'text-white' : 'text-black'
                } self-center font-medium text-base `}>
                {' '}
                {item.ratio}{' '}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* generate btn */}
      <View className="mb-5">
        <CustomBTN onPress={handleGenerate} title="Generate" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const addons = [
  {
    title: 'Add Photo',
    icon: <Ionicons name="image-outline" size={24} color="#ADADAD" />,
  },
  {
    title: 'Inspiration',
    icon: <FontAwesome6 name="lightbulb" size={24} color="#ADADAD" />,
  },
];

//aspect ratio props
type AspectRatioProps = {
  width: number;
  height: number;
  ratio: string;
};
const AspectRationData: AspectRatioProps[] = [
  {
    width: 1080,
    height: 1080,
    ratio: '1:1',
  },
  {
    width: 720,
    height: 1280,
    ratio: '9:16',
  },
  {
    width: 1920,
    height: 1080,
    ratio: '16:9',
  },
  {
    width: 720,
    height: 480,
    ratio: '3:2',
  },
  {
    width: 800,
    height: 400,
    ratio: '4:2',
  },
  {
    width: 1250,
    height: 1000,
    ratio: '5:4',
  },
];
