import { collectionSpecificOpenApiEndpoint } from "@/shared/collection-specific-openapi-endpoint";
import { createdByUsers, updatedByUsers } from "@/shared/user-authors";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
    createdByUsers,
    updatedByUsers,
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
  upload: true,
  versions: { drafts: true, maxPerDoc: 0 },
  endpoints: [collectionSpecificOpenApiEndpoint({ pathStartsWith: "/media" })],
  timestamps: true,
};
