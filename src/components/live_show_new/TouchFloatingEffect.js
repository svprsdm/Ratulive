import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Dimensions, Easing, Image } from 'react-native';
import SocketManager from '../socket/socketManager';
const { height } = Dimensions.get("window");
const animationEndY = Math.ceil(height * 1);
const negativeEndY = animationEndY * -1;
let heartCount = 1;
console.log("called touching component");
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomColor() {
    return 'rgb(${getRandomNumber(100,114)},${getRandomNumber(10.200)}, ${getRandomNumber(200,244)})'
}
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        hearts: [],
        countHeart: 0,
        screens: this.props.screen,
        // tokenId: this.props.id
    };
    componentDidMount() {
        console.log('props in Touchfloatingeffect', this.props.id);
        SocketManager.instance.listenSendHeart((count) => {
            this.addHeartWithTimeOut()
        });
    }
    addHeart = () => {
        this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
        SocketManager.instance.emitSendHearts({
            roomId: Math.random().toString(36).substring(8),
            count: this.state.countHeart,
            tokenId: this.props.token_id
        });
        countHeart =
            this.setState(
                {
                    hearts: [
                        ...this.state.hearts,
                        {
                            id: heartCount,
                        }
                    ],
                },
                () => {
                    heartCount++;
                }
            )
    }
    addHeartWithTimeOut = () => {
        this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
        console.log(this.state.countHeart)
        setTimeout(() => {
            {
                this.setState(
                    {
                        hearts: [
                            ...this.state.hearts,
                            {
                                id: heartCount,
                                right: getRandomNumber(0, 0),
                                color: getRandomColor()
                            }
                        ],
                    },
                    () => {
                        heartCount++;
                    }
                );
            };
        }, 2000)
    };
    removeHeart = id => {
        this.setState({
            hearts: this.state.hearts.filter(heart => {
                return heart.id !== id
            })
        })
    };
    render() {
        if (this.props.screen === "golive") {
            return (
                <View style={styles.goLiveContainer}>
                    <View style={styles.goLiveContainer}>
                        {this.state.hearts.map(heart => {
                            return <HeartContainer key={heart.id}
                                style={{ right: heart.right }}
                                onComplete={() => this.removeHeart(heart.id)}
                                color={heart.color}
                            />
                        })}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        {this.state.hearts.map(heart => {
                            return <HeartContainer key={heart.id}
                                style={{ right: heart.right }}
                                onComplete={() => this.removeHeart(heart.id)}
                                color={heart.color}
                            />
                        })}
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.addHeart();
                    }}>
                        <Animated.Image style={{ width: 39, height: 37 }} resizeMode='contain' source={require('../../../assets/ratu_icons/like_ico.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}
class HeartContainer extends React.Component {
    constructor() {
        super();
        this.yAnimation = this.state.position.interpolate({
            inputRange: [negativeEndY, 0],
            outputRange: [animationEndY, 0]
        });
        this.opacityAnimation = this.yAnimation.interpolate({
            inputRange: [0, animationEndY],
            outputRange: [1, 0]
        });
        this.scaleAnimation = this.yAnimation.interpolate({
            inputRange: [0, 250, 500],
            outputRange: [0.5, 1.4, 1],
            extrapolate: "clamp"
        });
        this.xAnimation = this.yAnimation.interpolate({
            inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
            outputRange: [0, 25, 15, 10, 10]
        });
        this.rotateAnimation = this.yAnimation.interpolate({
            inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
            outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg']
        })
    }
    state = {
        position: new Animated.Value(0)
    };
    static defaultProps = {
        onComplete() { }
    };
    componentDidMount() {
        Animated.timing(this.state.position, {
            duration: 2500,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(this.props.onComplete);
    }
    getHeartStyle() {
        return {
            transform: [{ translateY: this.state.position },
            { scale: this.scaleAnimation },
            { translateX: this.xAnimation },
            { rotate: this.rotateAnimation }
            ],
            opacity: this.opacityAnimation
        };
    }
    render() {
        return (
            <Animated.View style={[styles.heartContainer, this.getHeartStyle(), this.props.style]}>
                <Heart />
            </Animated.View>
        )
    }
}
const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <Animated.Image style={{ width: 40, height: 40 }} source={require('../../../assets/icons/like1.png')} color={props.color} />
    </View>
)
const styles = StyleSheet.create({
    container: {
    },
    heartContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "transparent",
    },
    heart: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    }
});