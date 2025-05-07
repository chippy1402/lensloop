import { Plugin } from "obsidian";
import { initSettingsTab } from "./src/settings";
import { registerCommands } from "./src/commands";

export default class LensLoopPlugin extends Plugin {
  async onload() {
    console.log("LensLoop loaded.");
    initSettingsTab(this);
    registerCommands(this);
  }

  onunload() {
    console.log("LensLoop unloaded.");
  }
}