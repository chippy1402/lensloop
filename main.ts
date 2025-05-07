import { Plugin } from "obsidian";

export default class LensLoopPlugin extends Plugin {
  async onload() {
    console.log("LensLoop loaded.");
  }

  onunload() {
    console.log("LensLoop unloaded.");
  }
}