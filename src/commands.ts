import { Plugin } from "obsidian";

export function registerCommands(plugin: Plugin) {
  plugin.addCommand({
    id: "log-photo-message",
    name: "Log LensLoop Ready",
    callback: () => {
      console.log("LensLoop is ready to roll.");
    }
  });
}