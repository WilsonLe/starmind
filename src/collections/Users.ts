import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "username" },
  auth: {
    loginWithUsername: true,
  },
  fields: [
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [{ label: "Admin", value: "admin" }],
      required: true,
    },
  ],
  access: {
    create: (args) => {
      return false;
    },
    read: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") {
          return { id: { equals: args.req.user.id } };
        }
      }
      return false;
    },
    update: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") {
          return { id: { equals: args.req.user.id } };
        }
      }
      return false;
    },
    delete: (args) => {
      if (!args.req.user) return false;
      if (args.req.user.collection === "users") {
        if (args.req.user.role === "admin") {
          return { id: { equals: args.req.user.id } };
        }
      }
      return false;
    },
  },
  versions: { drafts: true, maxPerDoc: 0 },
  timestamps: true,
};
