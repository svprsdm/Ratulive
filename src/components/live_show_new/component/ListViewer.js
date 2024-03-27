import { useLinkProps } from '@react-navigation/native';
import React,{useState} from 'react';
import { Text, View, StyleSheet ,TouchableOpacity, FlatList} from 'react-native';

import { Avatar } from 'react-native-paper';

export default function ListViewer(props) {
  const [topGifters, setTopGifters] = useState([{ImgSrc:"require('../../../../assets/icons/avt.jpg')", id:'1'},
  {ImgSrc:"require('../../../../assets/icons/avt.jpg')", id:'2'},
  {ImgSrc:"require('../../../../assets/icons/avt.jpg')", id:'3'}])
  return (
    <View style={styles.container}>
       
      <TouchableOpacity style={styles.roundContainer} onPress={() => {
          if(props.viewersPop === true){
            props.viewListVisible(false)
          }else{
            props.viewListVisible(true)
          }
      }}>



      <FlatList
      data={topGifters}
      renderItem={({item}) => (
        <View style={styles.avatarImg_white_one}>
        <Avatar.Image
        size={38}
        source={item.ImgSrc}
        style={styles.avatarImg}
      />
      </View> 
  )}
      keyExtractor={(item) => item.id}/>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 


marginLeft:"60%"
  },
  roundContainer: {
    position: 'absolute',
    top: '-13%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    margin: (10, 10),
    padding: (10, 10),
  
  
   width:100,

  
  },
  avatarImg_white_one: {
    backgroundColor: 'white',
    height: 42,
    width: 42,
    borderRadius: 42 / 2,
    zIndex:3,
    marginLeft:40
   
  },
  avatarImg: {
    marginTop: 2,
    marginLeft: 2,
  },
  avatarImg_white_two:{
  marginLeft:-25,
     backgroundColor: 'white',
    height: 42,
    width: 42,
    borderRadius: 42 / 2,
  zIndex:2
  },
  avatarImg_white_three:{
    marginLeft:-80,
     backgroundColor: 'white',
    height: 42,
    width: 42,
    borderRadius: 42 / 2,
    zIndex:3
  },
});
