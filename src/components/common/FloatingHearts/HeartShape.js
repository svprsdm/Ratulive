import React from 'react';
import { Image, View } from 'react-native';
import { images } from './images'
const HeartShape = (props) => {
  console.log("from heart shape page:" + " " + props.ImgName);
  const name = props.ImgName;
  console.log("accessing from array" + " " + images[name]);
  return (
    <View>
      <Image
        source={images[name]}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </View>
  );
};
export default HeartShape;
