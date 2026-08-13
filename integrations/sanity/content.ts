import { services, sectors, areas } from "@/lib/site-data";
import { sanityFetch } from "./client";
export async function getService(slug:string){ return await sanityFetch<any>(`*[_type=="service"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}) || services.find(x=>x.slug===slug) || null; }
export async function getSector(slug:string){ return await sanityFetch<any>(`*[_type=="sector"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}) || sectors.find(x=>x.slug===slug) || null; }
export async function getArea(slug:string){ const live=await sanityFetch<any>(`*[_type=="area"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}); if(live)return live; const title=areas.find(x=>x.toLowerCase().replaceAll(" ","-")===slug); return title?{title,slug,summary:`On-site textile care in ${title}.`}:null; }
