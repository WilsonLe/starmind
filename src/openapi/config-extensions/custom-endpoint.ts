import { OpenAPIV3 } from "openapi-types";
import { Endpoint } from "payload";

export interface EndpointDocumentation {
  summary?: string;
  description: string;
  responseSchema: OpenAPIV3.SchemaObject | string;
  errorResponseSchemas?: Record<number, OpenAPIV3.SchemaObject | string>;
  queryParameters?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      schema: OpenAPIV3.SchemaObject | string;
    }
  >;
}

type DocumentedEndpoint = Endpoint & EndpointDocumentation;

export function defineEndpoint(endpoint: DocumentedEndpoint): Endpoint {
  const {
    summary,
    description,
    responseSchema,
    errorResponseSchemas,
    queryParameters,
    custom,
    ...rest
  } = endpoint;
  return {
    ...rest,
    custom: {
      ...custom,
      openapi: {
        summary,
        description,
        responseSchema,
        errorResponseSchemas,
        queryParameters,
      },
    },
  };
}

export function getEndpointDocumentation(
  endpoint: Endpoint,
): EndpointDocumentation | undefined {
  return endpoint.custom?.openapi;
}
