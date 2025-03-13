import type { OpenAPIV3 } from "openapi-types";

const numOrDate: OpenAPIV3.SchemaObject = {
  anyOf: [{ type: "string" }, { type: "number" }],
};

export const whereCondition: OpenAPIV3.SchemaObject = {
  title: "Where condition",
  type: "array",
  items: { $ref: "#/components/schemas/where" },
};

export const where: OpenAPIV3.SchemaObject = {
  title: "Where clause",
  type: "object",
  additionalProperties: {
    anyOf: [
      {
        type: "object",
        properties: { equals: {} },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { not_equals: {} },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { greater_than: numOrDate },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { greater_than_equal: numOrDate },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { less_than: numOrDate },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { less_than_equal: numOrDate },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { like: { type: "string" } },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { contains: { type: "string" } },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { in: { type: "string" } },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { not_in: { type: "string" } },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { exists: { type: "boolean" } },
        additionalProperties: false,
      },
      {
        type: "object",
        properties: { near: { type: "string" } },
        additionalProperties: false,
      },
    ],
  },
  properties: {
    or: {
      // $ref: "#/components/schemas/whereCondition", // FIXME: somehow locally this doesn't work cuz if recursive reference. interactive http client wont show up
    },
    and: {
      // $ref: "#/components/schemas/whereCondition", // FIXME: somehow locally this doesn't work cuz if recursive reference. interactive http client wont show up
    },
  },
  example: {
    or: [
      // array of OR conditions
      {
        color: {
          equals: "mint",
        },
      },
      {
        and: [
          // nested array of AND conditions
          {
            color: {
              equals: "white",
            },
          },
          {
            featured: {
              equals: false,
            },
          },
        ],
      },
    ],
  },
};
