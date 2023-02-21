type FilePathToUriPathParams = {
  /** Absolute path */
  absoluteFilepath: string;
  rootPath: string;
};

export function filepathToUripath({
  absoluteFilepath,
  rootPath,
}: FilePathToUriPathParams) {
  // src/routes-definition/root/tools/index.ts -> /tools/index
  const relativeToRoot = (filepath: string) => {
    return filepath.replace(rootPath, "");
  };

  // src/routes-definition/root/tools/index.ts -> /tools
  const removeIndex = (filepath: string) => {
    const parts = filepath.split("/");
    if (parts[parts.length - 1].startsWith("index")) {
      parts.pop();
    }
    return parts.join("/");
  };

  // src/routes-definition/root/tools/:id.ts -> /tools/:id
  const removeExtension = (filepath: string) => {
    return filepath.replace(/\.ts$/, "");
  };

  // src/routes-definition/root/tools/:id/other.ts -> /tools/:id/other
  const removeBrackets = (filepath: string) => {
    return filepath.replace(/\[([^\]]+)\]/g, ":$1");
  };

  return removeBrackets(
    removeExtension(removeIndex(relativeToRoot(absoluteFilepath)))
  );
}
