import { normalizePath, TAbstractFile, TFolder, Vault, moment, MarkdownPostProcessorContext } from "obsidian";
import { logDebug } from "./logger";

export async function resolveFolder(
  config: Record<string, string>,
  ctx: MarkdownPostProcessorContext,
  el: HTMLElement
): Promise<TFolder | null> {
  const baseFolder = config["folder"]?.trim() || "Journal_Photos";
  //const dateString = moment().format("YYYY-MM-DD");
  let dateString = window.moment().format("YYYY-MM-DD");

const notePath = ctx.sourcePath;
const noteFilename = notePath?.split("/").pop()?.replace(".md", "");

if (noteFilename) {
  const parsed = window.moment(noteFilename, "YYYY-MM-DD", true);
  if (parsed.isValid()) {
    logDebug("Using date from note filename:", noteFilename);
    dateString = parsed.format("YYYY-MM-DD");
  } else {
    logDebug("Note filename not a valid date:", noteFilename);
  }
} else {
  logDebug("ctx.sourcePath missing or invalid:", notePath);
}

  const fullPath = normalizePath(`${baseFolder}/${dateString}`);
  const vault = (window.app as any).vault; // Access 'app' from the global 'window' object

  logDebug("Resolving folder path:", fullPath);

  let folder = vault.getAbstractFileByPath(fullPath);

  if (folder instanceof TFolder) {
    logDebug("✅ Found folder:", fullPath);
    return folder;
  }

  logDebug("📂 Folder not found, creating:", fullPath);

  try {
    await createFolderPath(fullPath, vault);
    const newFolder = vault.getAbstractFileByPath(fullPath);
    if (newFolder instanceof TFolder) {
      logDebug("✅ Folder created:", fullPath);
      return newFolder;
    } else {
      const warningParagraph = document.createElement("p");
      warningParagraph.textContent = `⚠️ Unable to create folder at "${fullPath}"`;
      el.appendChild(warningParagraph);
      return null;
    }
  } catch (err) {
    console.error("❌ Error creating folder:", err);
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = `❌ Error creating folder: ${err.message}`;
    el.appendChild(errorParagraph);
    return null;
  }
}

// Utility: create nested folders recursively
async function createFolderPath(path: string, vault: Vault): Promise<void> {
  const parts = path.split("/");
  let currentPath = "";
  for (const part of parts) {
    currentPath = normalizePath(`${currentPath}/${part}`);
    const exists = vault.getAbstractFileByPath(currentPath);
    if (!exists) {
      await vault.createFolder(currentPath);
    }
  }
}