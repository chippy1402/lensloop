import { Plugin } from "obsidian";
import { parseConfig } from "./config";
import { resolveFolder } from "./folder";
import { getImagesInFolder } from "./images";
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

    const images = getImagesInFolder(folder);

    if (images.length === 0) {
      el.createEl("p", { text: "📭 No images found in folder." });
      logDebug("No images found in folder:", folder.path);
      return;
    }

    el.createEl("p", { text: `🖼️ Found ${images.length} image(s).` });
    logDebug("📸 Found images:", images.map(f => f.path));
  });
}