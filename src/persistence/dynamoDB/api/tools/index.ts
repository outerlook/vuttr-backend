import { create } from "src/persistence/dynamoDB/api/tools/create";
import { findMany } from "src/persistence/dynamoDB/api/tools/findMany";
import { del } from "src/persistence/dynamoDB/api/tools/del";

export const toolsService = {
  create: create,
  findMany: findMany,
  del: del,
};
