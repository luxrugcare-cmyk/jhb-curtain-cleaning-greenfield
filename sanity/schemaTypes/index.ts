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

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "propertyType", title: "Property type", type: "string", validation: r => r.required() }),
    defineField({ name: "service", title: "Service", type: "string", validation: r => r.required() }),
    defineField({ name: "area", title: "Area", type: "string" }),
    defineField({ name: "textile", title: "Textile / material", type: "string" }),
    defineField({ name: "initialCondition", title: "Initial condition / scope", type: "text", validation: r => r.required() }),
    defineField({ name: "assessment", title: "Assessment decision", type: "text", validation: r => r.required() }),
    defineField({ name: "approach", title: "Method / approach", type: "text", validation: r => r.required() }),
    defineField({ name: "operationalNotes", title: "Operational notes", type: "text" }),
    defineField({ name: "outcome", title: "Documented outcome", type: "text", validation: r => r.required() }),
    defineField({ name: "limitations", title: "Limitations / remaining marks", type: "text" }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      description: "Keep testimonial publication approval separate from the case-study approval.",
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
      title: "Evidence images",
      type: "array",
      description: "Each image requires its own publication approval. Keep private or unapproved evidence outside public output.",
      of: [
        {
          type: "object",
          name: "evidenceImage",
          title: "Evidence image",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: r => r.required() }),
            defineField({ name: "alt", title: "Alt text", type: "string", validation: r => r.required() }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "publicationApproved",
              title: "Image publication approved",
              type: "boolean",
              description: "Confirm only when publication rights/privacy approval for this specific image are recorded.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "caption", media: "image", approved: "publicationApproved" },
            prepare(selection) {
              return {
                title: selection.title || "Evidence image",
                subtitle: selection.approved ? "Publication approved" : "Not approved for publication",
                media: selection.media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "publicationStatus",
      title: "Publication status",
      type: "string",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Draft", value: "draft" },
          { title: "Ready for review", value: "review" },
          { title: "Published", value: "published" },
          { title: "Do not publish", value: "private" },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: "publicationApproved",
      title: "Case-study publication approval confirmed",
      type: "boolean",
      description: "Must be explicitly confirmed before this case study can appear on the public website.",
      initialValue: false,
      validation: r => r.custom((value, context) => {
        const document = context.document as { publicationStatus?: string } | undefined;
        if (document?.publicationStatus === "published" && value !== true) {
          return "Publication approval must be confirmed before status can be Published.";
        }
        return true;
      }),
    }),
    defineField({
      name: "redactionNotes",
      title: "Redaction / privacy notes",
      type: "text",
      description: "Record names, locations, images or other details that must be omitted from public publication.",
    }),
    defineField({ name: "publishedAt", title: "Published date", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated date", type: "datetime" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publicationStatus" },
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
