import { SanitizedCollectionConfig, SanitizedGlobalConfig } from "payload";

const hasCollectionLabelKind = (
  collection: any,
  kind: "singular" | "plural",
): collection is SanitizedCollectionConfig =>
  Boolean(collection.labels?.[kind]);

export const getLabels = (
  collection: SanitizedCollectionConfig | SanitizedGlobalConfig,
  kind: "singular" | "plural",
): string | Record<string, string> | undefined => {
  if (!hasCollectionLabelKind(collection, kind)) {
    if (typeof collection.label === "string") return collection.label;
  }
  if ("labels" in collection && typeof collection.labels[kind] === "string")
    return collection.labels[kind] as string;
  return `Not implementeded to handle collection ${collection.slug} label ${kind} as functions`;
};
