import { RelationshipField } from "payload";

export const createdBy: RelationshipField = {
  name: "createdBy",
  type: "relationship",
  relationTo: ["users", "agents"],
  hasMany: false,
  required: true,
  admin: {
    description: "The creator of the note, could be a user or an agent",
    readOnly: true,
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      async (args) => {
        if (!args.req.user) {
          const existingUsers = await args.req.payload.find({
            req: args.req,
            collection: "users",
            limit: 1,
          });
          if (existingUsers.totalDocs === 0) {
            return null;
          } else if (existingUsers.totalDocs > 1) {
            return null;
          } else {
            return { relationTo: "users", value: existingUsers.docs[0].id };
          }
        }
        if (args.operation === "create") {
          return {
            relationTo: args.req.user.collection,
            value: args.req.user.id,
          };
        }
        return null;
      },
    ],
  },
};

export const updatedBy: RelationshipField = {
  name: "updatedBy",
  type: "relationship",
  relationTo: ["users", "agents"],
  hasMany: false,
  required: true,
  admin: {
    description: "The updator of the note, could be a user or an agent",
    readOnly: true,
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      async (args) => {
        if (!args.req.user) {
          const existingUsers = await args.req.payload.find({
            req: args.req,
            collection: "users",
            limit: 1,
          });
          if (existingUsers.totalDocs === 0) {
            return null;
          } else if (existingUsers.totalDocs > 1) {
            return null;
          } else {
            return { relationTo: "users", value: existingUsers.docs[0].id };
          }
        }
        if (args.operation === "create" || args.operation === "update") {
          return {
            relationTo: args.req.user.collection,
            value: args.req.user.id,
          };
        }
        return null;
      },
    ],
  },
};
