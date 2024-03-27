import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
 
    rectangeleContainer:{
      zIndex:7,
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:"center",
      marginTop:"-45%"
     
    },
    linearGradient:{
      width: 350,
      height: 380,
      borderRadius:15 ,
      flexDirection:'column',
      alignItems:'center',
      
    },
    rectangle:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      margin:(10,10)
    },
    baloonIcon:{
      width:100,
      height:100,
      top:20,
    },
    textContainer:{
      flex:2,
      flexDirection:'column',
      alignItems:'center',
    },
    congratulationText:{
      color:"white",
      fontSize:24,
      fontWeight:'bold',
    },
    successText:{
      color:"white",
      fontSize:17,
      top:15,
    },
    okbtnContainer:{
      top:50,
      borderRadius:20,
      
    },
    okButton1: {
      width: 100,
      height: 40,
      lineHeight:40,
      paddingTop:5,
      flexDirection:'row',
      justifyContent: 'center',
      backgroundColor:'grey',
      borderRadius: 30,
    },
    okButton: {
      width: 100,
      height: 40,
      lineHeight:40,
      paddingTop:5,
      flexDirection:'row',
      justifyContent: 'center',
    },
    okText:{
      fontSize:20,
      textAlign:'center',
      letterSpacing:1,
      paddingTop:3,
    },
    
    
  });

  export default styles;
  
  