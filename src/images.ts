//Filters image files from folder (stub)
import { TFolder, TFile } from "obsidian";

const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

export function getImagesInFolder(folder: TFolder): TFile[] {
  const results: TFile[] = [];

  const walk = (node: TFolder) => {
    for (const child of node.children) {
      if (child instanceof TFolder) {
        walk(child);
      } else if (child instanceof TFile) {
        const name = child.name.toLowerCase();
        if (validExtensions.some(ext => name.endsWith(ext))) {
          results.push(child);
        }
      }
    }
  };

  walk(folder);
  return results;
}