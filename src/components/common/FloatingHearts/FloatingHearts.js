/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet, ViewPropTypes } from 'react-native';
import HeartShape from './HeartShape';
class FloatingHearts extends Component {
  state = {
    hearts: [],
    hearts: [],
    height: null,
  };
  createHeart(index) {
    return {
      id: index,
      right: getRandomNumber(50, 150),
    };
  }
  removeHeart(id) {
    this.setState({ hearts: this.state.hearts.filter((heart) => heart.id !== id) });
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.ImageName + "from floating heart page");
    console.log("prevProps" + prevProps.count)
    console.log("props count" + this.props.count)
    const numHearts = this.props.count - prevProps.count;
    console.log(numHearts)
    if (numHearts <= 0) {
      return;
    }
    const items = Array(numHearts).fill();
    const newHearts = items.map((item, i) => prevProps.count + i).map(this.createHeart);
    console.log("heart state" + this.state.hearts);
    this.setState({ hearts: this.state.hearts.concat(newHearts) });
  }
  handleOnLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    this.setState({ height });
  };
  render() {
    const { height } = this.state;
    const { color, renderCustomShape } = this.props;
    const isReady = height !== null;
    const heartProps = {};
    if (color !== null) {
      heartProps.color = color;
    }
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.handleOnLayout}
        pointerEvents="none"
      >
        {isReady &&
          this.state.hearts.map(({ id, right }) => (
            <AnimatedShape
              key={id}
              height={height}
              style={{ right }}
              onComplete={this.removeHeart.bind(this, id)}
            >
              {renderCustomShape ? renderCustomShape(id) : <HeartShape {...heartProps} ImgName={this.props.ImageName} />}
            </AnimatedShape>
          ))}
        {isReady &&
          this.state.hearts.map(({ id, right }) => (
            <AnimatedShape
              key={id}
              height={height}
              style={{ right }}
              onComplete={this.removeHeart.bind(this, id)}
            >
              {renderCustomShape ? renderCustomShape(id) : <HeartShape {...heartProps} ImgName={this.props.ImageName} />}
            </AnimatedShape>
          ))}
      </View>
    );
  }
}
FloatingHearts.propTypes = {
  style: ViewPropTypes.style,
  count: PropTypes.number,
  color: PropTypes.string,
  renderCustomShape: PropTypes.func,
};
FloatingHearts.defaultProps = {
  count: -1,
};
/**
 * @class AnimatedShape
 */
class AnimatedShape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(0),
      shapeHeight: null,
      enabled: false,
      animationsReady: false,
    };
  }
  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2500,
      useNativeDriver: true,
      toValue: this.props.height * -1,
    }).start(this.props.onComplete);
  }
  getAnimationStyle() {
    if (!this.state.animationsReady) {
      return { opacity: 0 };
    }
    return {
      transform: [
        { translateY: this.state.position },
        { translateX: this.xAnimation },
        { scale: this.scaleAnimation },
        { rotate: this.rotateAnimation },
      ],
      opacity: this.opacityAnimation,
    };
  }
  handleOnLayout = (e) => {
    if (this.rendered) {
      return null;
    }
    this.rendered = true;
    const height = Math.ceil(this.props.height);
    const negativeHeight = height * -1;
    const shapeHeight = e.nativeEvent.layout.height;
    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeHeight, 0],
      outputRange: [height, 0],
    });
    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, height - shapeHeight],
      outputRange: [1, 0],
    });
    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30, height],
      outputRange: [0, 1.2, 1, 1],
    });
    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 2, height],
      outputRange: [0, 15, 0],
    });
    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 4, height / 3, height / 2, height],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg'],
    });
    setTimeout(() => this.setState({ animationsReady: true }), 16);
  };
  render() {
    return (
      <Animated.View
        style={[styles.shapeWrapper, this.getAnimationStyle(), this.props.style]}
        onLayout={this.handleOnLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
AnimatedShape.propTypes = {
  height: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};
AnimatedShape.defaultProps = {
  onComplete: () => { },
};
/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  shapeWrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
/**
 * Helpers
 */
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
/**
 * Exports
 */
export default FloatingHearts;
// import React from 'react';
// import {Animated, StyleSheet, Text, TouchableOpacity, View ,Dimensions ,Easing,Image} from 'react-native';
// const {height} = Dimensions.get("window");
// const animationEndY = Math.ceil(height * 1);
// const negativeEndY = animationEndY * -1;
// let heartCount = 1;
// console.log("called touching component");
// function getRandomNumber(min,max){
//     return Math.random() * (max - min) + min;
// }
// function getRandomColor(){
//     return 'rgb(${getRandomNumber(100,114)},${getRandomNumber(10.200)}, ${getRandomNumber(200,244)})'
// }
// export default class FloatingHeart extends React.Component {
//     state ={
//         hearts:[],
//     };
//     componentDidUpdate(prevCount){
//       const newCount = this.props.count;
//       console.log(newCount);
//       if(newCount<prevCount.count){
//         return;
//       }
//       this.addHeart();
//     }
//     addHeart = () => {
//         this.setState(
//             {
//                 hearts:[
//                     ...this.state.hearts,
//                     {
//                         id: heartCount,
//                         right:getRandomNumber(0,0),
//                         color:getRandomColor()
//                     }
//                 ],
//             },
//             () => {
//                 heartCount++;
//             }
//             );
//         };
//         removeHeart = id => {
//             this.setState({
//                 hearts: this.state.hearts.filter(heart =>{
//                     return heart.id !== id
//                 })
//             })
//         };
// render() {
//             return (
//                 <View style={styles.container}>
//                 {this.state.hearts.map(heart => {
//                     return<HeartContainer key={heart.id} 
//                     style={{right:heart.right}} 
//                     onComplete={() => this.removeHeart(heart.id)} 
//                     color={heart.color}
//                     />
//                 })}
//                 </View>
//             );
//         }
//     }
//     class HeartContainer extends React.Component{
//         constructor(){
//             super();
//             this.yAnimation = this.state.position.interpolate({
//                 inputRange:[negativeEndY, 0],
//                 outputRange: [animationEndY,0]
//             });
//             this.opacityAnimation = this.yAnimation.interpolate({
//                 inputRange:[0, animationEndY],
//                 outputRange:[1,0]
//             });
//             this.scaleAnimation = this.yAnimation.interpolate({
//                 inputRange: [0, 250, 500],
//                 outputRange: [0, 1.4 , 1],
//                 extrapolate:"clamp"
//             });
// this.xAnimation = this.yAnimation.interpolate({
//                 inputRange:[0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
//                 outputRange:[0, 25, 15, 10, 10]
//             });
//             this.rotateAnimation = this.yAnimation.interpolate({
//                 inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
//                 outputRange:['0deg','-5deg','0deg','5deg','0deg']
//             })
//         }
//         state = {
//             position:new Animated.Value(0)   
//         };
//         static defaultProps = {
//             onComplete() {}
//         };
//         componentDidMount(){
//             Animated.timing(this.state.position,{
//                 duration: 4500,
//                 toValue: negativeEndY,
//                 easing: Easing.ease,
//                 useNativeDriver:true
//             }).start(this.props.onComplete);
//         }
//         getHeartStyle(){
//             return{
//                 transform:[{ translateY: this.state.position }, 
//                     {scale: this.scaleAnimation}, 
//                     {translateX: this.xAnimation},
//                     {rotate:this.rotateAnimation}
//                 ],
//                 opacity: this.opacityAnimation
//             };
//         }
// render() {
//             return(
//                 <Animated.View style={[styles.heartContainer,this.getHeartStyle(), this.props.style]}>
//                 <Heart color={this.props.color} />
//                 </Animated.View>
//                 )
//             }
//         }
//         const Heart = props => (
//             <View {...props} style={[styles.heart, props.style]}>
//             <Animated.Image style={{width:40,height:40}} source={require('../../assets/icons/like1.png')} color={props.color} />
//             </View>
//             )
//             const styles = StyleSheet.create({
//                 container:{
//                   flex:1,
//                 },
//                 heartContainer:{
//                     position:"absolute",
//                     bottom:0,
//                     backgroundColor:"transparent",
//                     marginLeft:"25%"
//                 },
//                 heart:{
//                     width:50,
//                     height:50,
//                     alignItems:'center',
//                     justifyContent:'center',
//                     backgroundColor:'transparent',
//                 }
//             });