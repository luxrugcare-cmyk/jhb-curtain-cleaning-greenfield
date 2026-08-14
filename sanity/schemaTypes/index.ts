import { defineType, defineField } from "sanity";

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "noIndex", type: "boolean", initialValue: false }),
  ],
});

const makeDoc = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({ name: "title", type: "string", validation: r => r.required() }),
      defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
      defineField({ name: "summary", type: "text" }),
      defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
      defineField({ name: "seo", type: "seo" }),
    ],
  });

type CaseStudyGateDocument = {
  publicationApproved?: boolean;
  evidenceReviewConfirmed?: boolean;
  privacyReviewConfirmed?: boolean;
  evidenceSourceTypes?: unknown[];
  identityTreatment?: string;
  publishedAt?: string;
  redactionNotes?: string;
  testimonial?: {
    quote?: string;
    attribution?: string;
    role?: string;
    publicationApproved?: boolean;
  };
  evidenceImages?: Array<{
    publicationApproved?: boolean;
  }>;
};

function publicationGateIssues(document?: CaseStudyGateDocument) {
  const issues: string[] = [];

  if (!document?.evidenceSourceTypes?.length) issues.push("at least one retained evidence source");
  if (document?.evidenceReviewConfirmed !== true) issues.push("evidence review confirmation");
  if (document?.privacyReviewConfirmed !== true) issues.push("privacy/POPIA review confirmation");
  if (!document?.identityTreatment) issues.push("identity treatment");
  if (document?.publicationApproved !== true) issues.push("case-study publication approval");
  if (!document?.publishedAt) issues.push("published date");
  if (document?.redactionNotes?.trim()) issues.push("clear the private working redaction notes");

  const testimonial = document?.testimonial;
  const hasTestimonialContent = Boolean(
    testimonial?.quote?.trim() || testimonial?.attribution?.trim() || testimonial?.role?.trim(),
  );
  if (hasTestimonialContent && testimonial?.publicationApproved !== true) {
    issues.push("testimonial approval or remove testimonial content");
  }

  const hasUnapprovedImage = document?.evidenceImages?.some(image => image?.publicationApproved !== true);
  if (hasUnapprovedImage) issues.push("publication approval for every Sanity image");

  return issues;
}

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "intake", title: "1. Intake", default: true },
    { name: "facts", title: "2. Project facts" },
    { name: "evidence", title: "3. Evidence review" },
    { name: "privacy", title: "4. Privacy & consent" },
    { name: "publication", title: "5. Publication gate" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Public-safe working title", type: "string", group: "intake", description: "Use an anonymised title unless client/property identification is explicitly approved.", validation: r => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "intake", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "completedAt", title: "Work completion date", type: "date", group: "intake", description: "Factual project date only. Do not add private job references or customer identifiers here." }),
    defineField({ name: "propertyType", title: "Property type", type: "string", group: "facts", validation: r => r.required() }),
    defineField({ name: "service", title: "Service", type: "string", group: "facts", validation: r => r.required() }),
    defineField({ name: "area", title: "Area", type: "string", group: "facts", description: "Use only the publication-safe area level approved for the case study." }),
    defineField({ name: "textile", title: "Textile / material", type: "string", group: "facts" }),
    defineField({ name: "initialCondition", title: "Initial condition / scope", type: "text", group: "facts", validation: r => r.required() }),
    defineField({ name: "assessment", title: "Assessment decision", type: "text", group: "facts", validation: r => r.required() }),
    defineField({ name: "approach", title: "Method / approach", type: "text", group: "facts", validation: r => r.required() }),
    defineField({ name: "operationalNotes", title: "Operational notes", type: "text", group: "facts" }),
    defineField({ name: "outcome", title: "Documented outcome", type: "text", group: "facts", validation: r => r.required() }),
    defineField({ name: "limitations", title: "Limitations / remaining marks", type: "text", group: "facts" }),
    defineField({
      name: "evidenceSourceTypes",
      title: "Retained evidence sources",
      type: "array",
      group: "evidence",
      description: "Record only the categories of evidence retained privately. Do not paste customer names, job references, private URLs or confidential notes into this public dataset.",
      of: [{ type: "string" }],
      options: {
        layout: "grid",
        list: [
          { title: "Technician / project notes", value: "project-notes" },
          { title: "Assessment record", value: "assessment-record" },
          { title: "Quotation / agreed scope", value: "scope" },
          { title: "Private before/after photography", value: "private-photography" },
          { title: "Client correspondence", value: "client-correspondence" },
          { title: "Completion / handover record", value: "completion-record" },
          { title: "Other retained documentation", value: "other" },
        ],
      },
      validation: r => r.unique(),
    }),
    defineField({
      name: "evidenceReviewConfirmed",
      title: "Evidence review completed",
      type: "boolean",
      group: "evidence",
      description: "Confirm only after the factual claims above have been checked against retained private evidence.",
      initialValue: false,
    }),
    defineField({
      name: "testimonial",
      title: "Approved testimonial",
      type: "object",
      group: "evidence",
      description: "Do not enter testimonial text into a case that will be published unless the quotation and attribution are approved for publication.",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text" }),
        defineField({ name: "attribution", title: "Attribution", type: "string" }),
        defineField({ name: "role", title: "Role / organisation context", type: "string" }),
        defineField({
          name: "publicationApproved",
          title: "Testimonial publication approved",
          type: "boolean",
          description: "Confirm only when the customer has authorised publication of the quotation and attribution shown here.",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "evidenceImages",
      title: "Approved publication images",
      type: "array",
      group: "evidence",
      description: "IMPORTANT: Sanity image assets are public. Never upload raw or unapproved evidence here. Keep raw before/after photos in private evidence storage; add only images already cleared for publication.",
      of: [
        {
          type: "object",
          name: "evidenceImage",
          title: "Approved publication image",
          fields: [
            defineField({
              name: "stage",
              title: "Evidence stage",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Before", value: "before" },
                  { title: "After", value: "after" },
                  { title: "Detail", value: "detail" },
                  { title: "Context", value: "context" },
                ],
              },
              validation: r => r.required(),
            }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: r => r.required() }),
            defineField({ name: "alt", title: "Alt text", type: "string", validation: r => r.required() }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "publicationApproved",
              title: "Image publication approved",
              type: "boolean",
              description: "This must already be approved before the image is uploaded to Sanity.",
              initialValue: false,
              validation: r => r.required().custom(value => value === true ? true : "Only publication-approved images may be stored here."),
            }),
          ],
          preview: {
            select: { title: "caption", stage: "stage", media: "image", approved: "publicationApproved" },
            prepare(selection) {
              return {
                title: selection.title || `${selection.stage || "Evidence"} image`,
                subtitle: selection.approved ? "Publication approved" : "Approval required",
                media: selection.media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "identityTreatment",
      title: "Public identity treatment",
      type: "string",
      group: "privacy",
      description: "Choose how the customer/property may be identified in the public case study.",
      options: {
        layout: "radio",
        list: [
          { title: "Anonymous — no identifying client/property details", value: "anonymous" },
          { title: "Area only — suburb/area approved, client/property unnamed", value: "area-only" },
          { title: "Named identification approved", value: "named-approved" },
        ],
      },
    }),
    defineField({
      name: "privacyReviewConfirmed",
      title: "Privacy / POPIA review completed",
      type: "boolean",
      group: "privacy",
      description: "Confirm that names, locations, quotations, images and other identifiers have been reviewed for publication authority and necessity.",
      initialValue: false,
    }),
    defineField({
      name: "redactionNotes",
      title: "Private working redaction notes — clear before publishing",
      type: "text",
      group: "privacy",
      description: "Draft-stage working notes only. Because the production dataset is public, this field must be empty before the document can be marked Published.",
      validation: r => r.custom((value, context) => {
        const document = context.document as { publicationStatus?: string } | undefined;
        if (document?.publicationStatus === "published" && typeof value === "string" && value.trim()) {
          return "Clear private working redaction notes before publishing this document.";
        }
        return true;
      }),
    }),
    defineField({
      name: "publicationStatus",
      title: "Publication status",
      type: "string",
      group: "publication",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Draft intake", value: "draft" },
          { title: "Ready for review", value: "review" },
          { title: "Published", value: "published" },
          { title: "Do not publish", value: "private" },
        ],
      },
      validation: r => r.required().custom((value, context) => {
        if (value !== "published") return true;
        const issues = publicationGateIssues(context.document as CaseStudyGateDocument | undefined);
        return issues.length ? `Before publishing, complete: ${issues.join(", ")}.` : true;
      }),
    }),
    defineField({
      name: "publicationApproved",
      title: "Case-study publication approval confirmed",
      type: "boolean",
      group: "publication",
      description: "Confirm only after factual evidence and privacy review are complete. The public website also requires this flag before rendering a case study.",
      initialValue: false,
      validation: r => r.custom((value, context) => {
        const document = context.document as { publicationStatus?: string } | undefined;
        if (document?.publicationStatus === "published" && value !== true) {
          return "Publication approval must be confirmed before status can be Published.";
        }
        return true;
      }),
    }),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime", group: "publication" }),
    defineField({ name: "updatedAt", title: "Editorially reviewed / updated date", type: "datetime", group: "publication" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      status: "publicationStatus",
      approved: "publicationApproved",
      propertyType: "propertyType",
      area: "area",
    },
    prepare(selection) {
      const state = selection.approved ? `${selection.status || "draft"} / approved` : `${selection.status || "draft"} / not approved`;
      const context = [selection.propertyType, selection.area].filter(Boolean).join(" · ");
      return {
        title: selection.title,
        subtitle: context ? `${state} · ${context}` : state,
      };
    },
  },
});

export const schemaTypes = [
  seo,
  makeDoc("service", "Service"),
  makeDoc("sector", "Commercial sector"),
  makeDoc("area", "Service area"),
  caseStudy,
  makeDoc("guide", "Guide"),
  defineType({
    name: "review",
    title: "Review",
    type: "document",
    fields: [
      defineField({ name: "customerName", type: "string", validation: r => r.required() }),
      defineField({ name: "quote", type: "text", validation: r => r.required() }),
      defineField({ name: "rating", type: "number" }),
      defineField({ name: "permissionConfirmed", type: "boolean", initialValue: false }),
    ],
  }),
];
