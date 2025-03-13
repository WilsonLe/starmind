import { createdBy, updatedBy } from "@/shared/author";
import { collectionSpecificOpenApiEndpoint } from "@/shared/collection-specific-openapi-endpoint";
import { CollectionConfig } from "payload";

export const NoteTags: CollectionConfig = {
  slug: "note-tags",
  admin: { useAsTitle: "displayName" },
  fields: [
    {
      name: "slug",
      label: "Slug",
      admin: { description: "Human-readble identifier for the tag" },
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "displayName",
      label: "Display Name",
      admin: { description: "The name of the tag" },
      type: "text",
      required: true,
      unique: true,
      index: true,
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
  endpoints: [
    collectionSpecificOpenApiEndpoint({ pathStartsWith: "/note-tags" }),
  ],
  timestamps: true,
  versions: { drafts: true, maxPerDoc: 0 },
};
