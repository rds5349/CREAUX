import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
export default function Index() { const {session,loading}=useAuth(); if(loading)return <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator /></View>; return <Redirect href={session?'/(tabs)':'/sign-in'} />; }
