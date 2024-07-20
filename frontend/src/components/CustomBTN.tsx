import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type CustomBtnType = {
  title: string;
  onPress?: () => void;
};

const CustomBTN: React.FC<CustomBtnType> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className='bg-[#4F33FC] w-[95%] mt-5 py-3 rounded-full '>
      <Text className='text-2xl text-center text-white font-semibold'> {title} </Text>
    </TouchableOpacity>
  );
};

export default CustomBTN;
