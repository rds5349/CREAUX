import { supabase } from '../lib/supabase';
export type Listing = {id:string;owner_id:string;display_name:string;category:string;description:string;city:string};
export async function getListings(search:string):Promise<Listing[]> {
  let query=supabase.from('professional_listings').select('id,owner_id,display_name,category,description,city').eq('published',true).order('display_name').limit(40);
  // Filter locally to avoid interpolating user input into PostgREST OR expressions.
  const {data,error}=await query;
  if(error)throw error;
  const term=search.trim().toLocaleLowerCase();
  return ((data??[]) as Listing[]).filter(x=>!term||[x.display_name,x.category,x.city,x.description].some(y=>y.toLocaleLowerCase().includes(term)));
}
