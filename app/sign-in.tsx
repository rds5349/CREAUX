import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { useAuth } from '../src/context/AuthContext';
import { Action, Field, PageTitle, palette } from '../src/components/UI';
export default function SignIn() {
 const {session}=useAuth(); const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [busy,setBusy]=useState(false);
 if(session)return <Redirect href="/(tabs)" />;
 async function submit(){if(!email.trim()||!password)return Alert.alert('Missing details','Enter your email and password.');setBusy(true);try{const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});if(error)throw error;router.replace('/(tabs)');}catch(e){Alert.alert('Sign in failed',e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}}
 async function reset(){if(!email.trim())return Alert.alert('Email needed','Enter your email first.');const {error}=await supabase.auth.resetPasswordForEmail(email.trim());Alert.alert(error?'Unable to send':'Check your email',error?.message??'If this email is registered, you will receive reset instructions.');}
 return <KeyboardAvoidingView style={{flex:1,backgroundColor:palette.paper}} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center',padding:28}} keyboardShouldPersistTaps="handled"><PageTitle title="Welcome back" subtitle="Your people. Your opportunities. Your flock."/><Field label="Email address" autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail}/><Field label="Password" secureTextEntry autoComplete="current-password" value={password} onChangeText={setPassword}/><Action title={busy?'Signing in…':'Sign in'} disabled={busy} onPress={submit}/><TouchableOpacity onPress={reset} style={{marginTop:18}}><Text style={{textAlign:'center',color:palette.muted}}>Forgot password?</Text></TouchableOpacity><TouchableOpacity onPress={()=>router.push('/sign-up')} style={{marginTop:28}}><Text style={{textAlign:'center',color:palette.ink,fontWeight:'700'}}>New to CREAUX? Create an account</Text></TouchableOpacity></ScrollView></KeyboardAvoidingView>;
}
