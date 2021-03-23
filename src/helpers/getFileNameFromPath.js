export function getFileNameFromPath(path) {
  if (typeof path !== "string") {
    return "";
  }
  let paths = path.split("/");
  return paths[paths.length - 1];
}
