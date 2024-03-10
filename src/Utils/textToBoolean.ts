export function textToBoolean(text: unknown) {
  return text === "true" ? true : text === "false" ? false : undefined;
}
