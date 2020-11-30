import path from "path";

export function convertToRelativePath(
  ROOT_DIR: string,
  absoluteFilePath: string
): string {
  const rootDirWithoutTrailingSlash = ROOT_DIR.endsWith("/")
    ? ROOT_DIR.slice(0, -1)
    : ROOT_DIR;
  const baseRelativePath =
    "." + absoluteFilePath.slice(rootDirWithoutTrailingSlash.length);
  return baseRelativePath;
}

export function stripTsExtension(inputFilePath: string): string {
  if (!inputFilePath.endsWith(".ts")) {
    return inputFilePath;
  }
  return inputFilePath.slice(0, -3);
}

