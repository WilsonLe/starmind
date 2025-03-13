import { createdBy, updatedBy } from "@/shared/author";
import { collectionSpecificOpenApiEndpoint } from "@/shared/collection-specific-openapi-endpoint";
import type { CollectionConfig } from "payload";

export const Agents: CollectionConfig = {
  slug: "agents",
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [createdBy, updatedBy],
  access: {
    create: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") {
        return { id: { equals: args.req.user.id } };
      }
      return false;
    },
    read: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") {
        return { id: { equals: args.req.user.id } };
      }
      return false;
    },
    update: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") {
        return { id: { equals: args.req.user.id } };
      }
      return false;
    },
    delete: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") return true;
      }
      if (args.req.user.collection === "agents") {
        return { id: { equals: args.req.user.id } };
      }
      return false;
    },
  },
  versions: { drafts: true, maxPerDoc: 0 },
  endpoints: [collectionSpecificOpenApiEndpoint({ pathStartsWith: "/agents" })],
  timestamps: true,
};
