import { services, sectors, areas } from "@/lib/site-data";
import { sanityFetch } from "./client";

export type PublishedCaseStudy = {
  title: string;
  slug: string;
  propertyType: string;
  service: string;
  area?: string;
  textile?: string;
  initialCondition: string;
  assessment: string;
  approach: string;
  operationalNotes?: string;
  outcome: string;
  limitations?: string;
  testimonial?: {
    quote?: string;
    attribution?: string;
    permissionConfirmed?: boolean;
  };
  publishedAt?: string;
  updatedAt?: string;
};

export async function getService(slug:string){ return await sanityFetch<any>(`*[_type=="service"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}) || services.find(x=>x.slug===slug) || null; }
export async function getSector(slug:string){ return await sanityFetch<any>(`*[_type=="sector"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}) || sectors.find(x=>x.slug===slug) || null; }
export async function getArea(slug:string){ const live=await sanityFetch<any>(`*[_type=="area"&&slug.current==$slug][0]{title,"slug":slug.current,summary,seo}`,{slug}); if(live)return live; const title=areas.find(x=>x.toLowerCase().replaceAll(" ","-")===slug); return title?{title,slug,summary:`On-site textile care in ${title}.`}:null; }

export async function getPublishedCaseStudies(): Promise<PublishedCaseStudy[]> {
  return await sanityFetch<PublishedCaseStudy[]>(
    `*[_type == "caseStudy" && publicationStatus == "published" && publicationApproved == true] | order(coalesce(publishedAt, _createdAt) desc) {
      title,
      "slug": slug.current,
      propertyType,
      service,
      area,
      textile,
      initialCondition,
      assessment,
      approach,
      operationalNotes,
      outcome,
      limitations,
      testimonial,
      publishedAt,
      updatedAt
    }`,
  ) || [];
}
