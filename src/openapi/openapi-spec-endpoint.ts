import openAPISpec from "@/payload-openapi.json";
import { Endpoint } from "payload";

export const openApiSpecEndpoint: Endpoint = {
  method: "get",
  path: "/openapi.json",
  handler: async (req) => {
    return Response.json(openAPISpec);
  },
};
