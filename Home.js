import React from 'react';
import {Children} from 'react';
import {View, Text} from 'react-native';
import App from './App';
import {AuthProvider} from './src/hooks/Auth';

export default function Home({children}) {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
