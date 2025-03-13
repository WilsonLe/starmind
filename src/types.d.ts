import {
  BasePayload as OriginalBasePayload,
  RequestContext as OriginalRequestContext,
} from "payload";

declare module "payload" {
  export interface BasePayload extends OriginalBasePayload {
    openApiDoc: OpenAPIV3.Document;
  }

  export interface RequestContext extends OriginalRequestContext {}
}
