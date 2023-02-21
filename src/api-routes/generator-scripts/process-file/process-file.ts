import * as tsmorph from "ts-morph";
import { filepathToUripath } from "src/api-routes/generator-scripts/process-file/filepath-to-uripath";

/**
 * @param absoluteFilepath - Absolute path
 */
export const processFile = (
  absoluteFilepath: string,
  rootPath: string
): { filepath: string; uriPath: string; functionNames: string[] } => {
  const uriPath = filepathToUripath({
    rootPath: rootPath,
    absoluteFilepath: absoluteFilepath,
  });

  const functionNames = extractFunctionNamesFromPath(absoluteFilepath);

  return { filepath: absoluteFilepath, uriPath, functionNames };
};

export const extractFunctionNamesFromPath = (
  absoluteFilepath: string
): string[] => {
  const project = new tsmorph.Project();
  const sourceFile = project
    .addSourceFileAtPath(absoluteFilepath)
    .getChildrenOfKind(tsmorph.SyntaxKind.SyntaxList)[0];
  const rootScopeFunctions = sourceFile
    .getChildren()
    .filter((node) => isFunctionOrArrowFunctionDeclaration(node))
    .map((node) => getFunctionNameFromArrowFunctionOrFunctionDeclaration(node))
    .filter((name) => Boolean(name)) as string[];

  return rootScopeFunctions;
};

const isFunctionOrArrowFunctionDeclaration = (
  node: tsmorph.Node
): node is tsmorph.FunctionDeclaration | tsmorph.VariableStatement => {
  return (
    tsmorph.Node.isFunctionDeclaration(node) || isArrowFunctionStatement(node)
  );
};
const isArrowFunctionStatement = (
  node: tsmorph.Node
): node is tsmorph.VariableDeclaration => {
  // to be arrow function declaration, it must be a variable statement
  // then first variable declaration must be an arrow function
  return (
    tsmorph.Node.isVariableStatement(node) &&
    node.getDeclarations()[0].getInitializer()?.getKind() ===
      tsmorph.SyntaxKind.ArrowFunction
  );
};

const getFunctionNameFromArrowFunctionOrFunctionDeclaration = (
  node: tsmorph.Node
): string | undefined => {
  if (tsmorph.Node.isFunctionDeclaration(node)) {
    return node.getName();
  }
  if (tsmorph.Node.isVariableStatement(node)) {
    return node.getDeclarations()[0].getName();
  }
  throw new Error("Unexpected node type");
};
