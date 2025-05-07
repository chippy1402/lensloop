//Registers markdown processor for `lensloop`
import { Plugin } from "obsidian";
import { parseConfig } from "./config";
import { resolveFolder } from "./folder";
import { logDebug } from "./logger";

export function registerPhotoProcessor(plugin: Plugin) {
  plugin.registerMarkdownCodeBlockProcessor("lensloop", async (source, el, ctx) => {
    const config = parseConfig(source);
    logDebug("📦 Block config:", config);

    const folder = await resolveFolder(config, ctx, el);
    if (!folder) {
      el.createEl("p", { text: "❌ Could not resolve or create folder." });
      return;
    }

    // Simple confirmation
    el.createEl("p", { text: `📂 Folder ready: ${folder.path}` });
    logDebug("✅ Folder resolved:", folder.path);
  });
}