import { findMany } from "src/persistence/dynamoDB/api/tools/findMany";
import { VuttrService } from "src/persistence/dynamoDB/schema/entities";

export const deleteManyById = async (params: { ids: string[] }) => {
  const { ids } = params;

  const query = VuttrService.entities.tool.delete(
    ids.map((id) => ({ toolId: id }))
  );
  const results = await query.go();

  return results;
};

export const deleteManyByTag = async (params: { tag: string }) => {
  const { tag } = params;

  const toolsToDelete = await findMany({ tag });

  if (toolsToDelete.length === 0) {
    return {};
  }

  /*
   FIXME: if something goes wrong, there are orphaned tags in the database
          as there is no transaction support to delete both the tool and the tags 
  */
  const deleteTool = VuttrService.entities.tool.delete(
    toolsToDelete.map((tool) => ({ toolId: tool.toolId }))
  );
  const deleteTags = VuttrService.entities.toolTag.delete(
    toolsToDelete.map((tool) => ({ toolId: tool.toolId, tag }))
  );

  const results = await Promise.all([
    deleteTool.go({ pages: "all" }),
    deleteTags.go({ pages: "all" }),
  ]);

  return results;
};
