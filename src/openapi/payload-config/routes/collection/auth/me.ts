import type { OpenAPIV3 } from "openapi-types";

const me = (schemaName: string): OpenAPIV3.SchemaObject => ({
  title: "Me",
  type: "object",
  additionalProperties: false,
  properties: {
    user: {
      nullable: true,
      $ref: `#/components/schemas/${schemaName}`,
    },
    token: {
      type: "string",
    },
    exp: {
      type: "number",
    },
  },
  required: ["user"],
});

export default me;
