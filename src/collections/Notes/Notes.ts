import { createdBy, updatedBy } from "@/shared/author";
import { collectionSpecificOpenApiEndpoint } from "@/shared/collection-specific-openapi-endpoint";
import { CollectionConfig } from "payload";

export const Notes: CollectionConfig = {
  slug: "notes",
  admin: { useAsTitle: "title" },
  fields: [
    {
      name: "title",
      label: "Title",
      admin: { description: "The title of the note" },
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      admin: { description: "The content of the note" },
      type: "textarea",
      required: true,
    },
    {
      name: "tags",
      label: "Tags",
      admin: { description: "Tags associated with the note" },
      type: "relationship",
      relationTo: "note-tags",
      hasMany: true,
    },
    createdBy,
    updatedBy,
  ],
  access: {
    create: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") return true;
      return false;
    },
    read: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") return true;
      return false;
    },
    update: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") return true;
      return false;
    },
    delete: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") return true;
      return false;
    },
  },
  timestamps: true,
  endpoints: [collectionSpecificOpenApiEndpoint({ pathStartsWith: "/notes" })],
  versions: { drafts: true, maxPerDoc: 0 },
};
