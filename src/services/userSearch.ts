import {supabase} from '../lib/supabase';

export type UserSearchResult={user_id:string;display_name:string;username:string};
/** Exact-match username search only. Email/phone discovery requires an audited, rate-limited backend. */
export async function findUserByUsername(raw:string):Promise<UserSearchResult|null>{
 const username=raw.trim().replace(/^@/,'').toLowerCase();
 if(!/^[a-z0-9_]{3,24}$/.test(username))throw new Error('Enter a username of 3–24 letters, numbers, or underscores.');
 const {data,error}=await supabase.rpc('find_flock_user_by_username',{lookup_username:username});
 if(error)throw error;
 const rows=(data??[]) as UserSearchResult[];
 return rows[0]??null;
}
