import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
export default function Timer() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState('');
    const addTimer = () => {
        setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000)
    }
    useEffect(() => {
        addTimer();
    }, [])
    useEffect(() => {
        var hour = Math.floor(count / 3600);
        var minutes = Math.floor((count - hour * 3600) / 60);
        var seconds = count - (hour * 3600 + minutes * 60);
        const time = ((hour < 10) ? "0" + hour : hour) + ":" + ((minutes < 10) ? '0' + minutes : minutes) + ":" + ((seconds < 10) ? '0' + seconds : seconds);
        setTimer(time)
    }, [count])
    return (
        <Text>{timer}</Text>
    );
}