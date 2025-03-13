import { RelationshipField } from "payload";

export const createdByAgents: RelationshipField = {
  name: "createdByAgents",
  type: "relationship",
  relationTo: "agents",
  hasMany: false,
  admin: {
    description: "The creator of the note, could be a user or an agent",
    readOnly: true,
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      async (args) => {
        if (!args.req.user) return null;
        if (args.operation === "create") {
          return args.req.user.id;
        }
        return null;
      },
    ],
  },
};

export const updatedByAgents: RelationshipField = {
  name: "updatedByAgents",
  type: "relationship",
  relationTo: "agents",
  hasMany: false,
  admin: {
    description: "The updator of the note, could be a user or an agent",
    readOnly: true,
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      async (args) => {
        if (!args.req.user) return null;
        if (args.operation === "create" || args.operation === "update") {
          return args.req.user.id;
        }
        return null;
      },
    ],
  },
};
