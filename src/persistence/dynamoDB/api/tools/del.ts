import { VuttrService } from "src/persistence/dynamoDB/schema/entities";

export const del = async (params: { id: string }) => {
  const { id } = params;

  const { data: tool } = await VuttrService.entities.tool
    .delete({ toolId: id })
    .go();

  let tagsToDelete = tool;
  if (tool.tags) {
    let toolTagsToDelete = tool.tags.map((tag) => ({ toolId: id, tag }));
    const numberOfRetries = 3;

    for (let i = 0; i < numberOfRetries; i++) {
      const { unprocessed } = await VuttrService.entities.toolTag
        .delete(toolTagsToDelete)
        .go({pages: "all"});

      if (unprocessed.length === 0) {
        break;
      }

      toolTagsToDelete = unprocessed;
    }
  }

  return tool;
};
