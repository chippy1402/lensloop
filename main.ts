import { Plugin } from "obsidian";
import { registerPhotoProcessor } from "./src/processor";
import { logDebug } from "./src/logger";

export default class LensLoopPlugin extends Plugin {
  async onload() {
    logDebug("LensLoop plugin loaded.");
    registerPhotoProcessor(this);
  }

  onunload() {
    logDebug("LensLoop plugin unloaded.");
  }
}