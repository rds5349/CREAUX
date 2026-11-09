import {supabase} from '../lib/supabase';
export type FlockRequest={id:string;sender_id:string;recipient_id:string;status:'pending'|'accepted'|'declined'|'cancelled';created_at:string};
export async function listFlockRequests(userId:string){
 const {data,error}=await supabase.from('flock_requests').select('id,sender_id,recipient_id,status,created_at').or(`sender_id.eq.${userId},recipient_id.eq.${userId}`).order('created_at',{ascending:false});
 if(error)throw error;return (data??[]) as FlockRequest[];
}
export async function sendFlockRequest(recipientId:string){
 const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||!user)throw new Error('Please sign in');
 if(user.id===recipientId)throw new Error('You cannot request yourself');
 const {error}=await supabase.from('flock_requests').insert({sender_id:user.id,recipient_id:recipientId,status:'pending'});
 if(error)throw error;
}
export async function respondToFlockRequest(request:FlockRequest,action:'accepted'|'declined'|'cancelled'){
 const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||!user)throw new Error('Please sign in');
 if(request.status!=='pending')throw new Error('Request is no longer pending');
 if(action==='cancelled'?request.sender_id!==user.id:request.recipient_id!==user.id)throw new Error('Not permitted');
 const {data,error}=await supabase.from('flock_requests').update({status:action,responded_at:new Date().toISOString()}).eq('id',request.id).eq('status','pending').select('id');
 if(error)throw error;
 if(!data?.length)throw new Error('Request changed. Refresh and retry.');
}
