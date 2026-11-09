import {supabase} from '../lib/supabase';
export async function getDiscoveryPreference(userId:string):Promise<boolean>{
 const {data,error}=await supabase.from('user_discovery_preferences').select('discoverable_by_username').eq('user_id',userId).maybeSingle();
 if(error)throw error;
 return data?.discoverable_by_username===true;
}
export async function setDiscoveryPreference(userId:string,enabled:boolean):Promise<void>{
 const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||!user||user.id!==userId)throw new Error('Please sign in to change your settings.');
 const {error}=await supabase.from('user_discovery_preferences').upsert({user_id:userId,discoverable_by_username:enabled,updated_at:new Date().toISOString()},{onConflict:'user_id'});
 if(error)throw error;
}
