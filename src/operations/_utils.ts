import { NullProtoObj } from "../_utils.ts";
import type { MatchedRoute, ParamsIndexMap } from "../types.ts";

export function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}

export function getMatchParams(
  segments: string[],
  paramsMap: ParamsIndexMap,
): MatchedRoute["params"] {
  const params = new NullProtoObj();
  for (const [index, name] of paramsMap) {
    const segment =
      index < 0 ? segments.slice(-1 * index).join("/") : segments[index];
    if (typeof name === "string") {
      params[name] = segment;
    } else {
      const match = segment.match(name);
      if (match) {
        for (const key in match.groups) {
          params[key] = match.groups[key];
        }
      }
    }
  }
  return params;
}
