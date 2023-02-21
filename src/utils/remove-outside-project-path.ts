/**
 * /home/username/project/src/utils/remove-outside-path.ts -> /src/utils/remove-outside-path.ts
 */
export const removeOutsideProjectPath = (obj: any) => {
  const str = JSON.stringify(obj, null, 2);
  const projectPath = process.cwd();
  const regex = new RegExp(projectPath, "g");
  const result = str.replace(regex, "");
  return JSON.parse(result);
};
