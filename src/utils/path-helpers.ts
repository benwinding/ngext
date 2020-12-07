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

export function stripQuotes(inputStr: string): string {
  const remove = ['"', "'", "\'", '\"'];
  for (const r of remove) {
    inputStr.startsWith(r);
    return inputStr.slice(r.length, -r.length);
  }
  return inputStr;
}
