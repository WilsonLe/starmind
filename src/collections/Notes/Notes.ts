import { createdBy, updatedBy } from "@/shared/author";
import { CollectionConfig } from "payload";

export const Notes: CollectionConfig = {
  slug: "notes",
  admin: { useAsTitle: "title" },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
    {
      name: "tags",
      label: "Tags",
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
  versions: { drafts: true, maxPerDoc: 0 },
};
