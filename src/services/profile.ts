import { supabase } from '../lib/supabase';
export type Profile = {user_id:string; full_name:string; username:string; city:string|null; role:string|null; bio:string|null; account_type:'social'|'professional'; offerings:string|null};
export async function loadProfile(userId:string) {
  const {data,error}=await supabase.from('profiles').select('user_id,full_name,username,city,role,bio,account_type,offerings').eq('user_id',userId).maybeSingle();
  if(error) throw error;
  return data as Profile|null;
}
export async function saveProfile(profile:Profile) {
  const {error}=await supabase.from('profiles').upsert(profile,{onConflict:'user_id'});
  if(error) throw error;
}
