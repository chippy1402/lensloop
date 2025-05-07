import { PluginSettingTab, App, Setting } from "obsidian";

export function initSettingsTab(plugin: any) {
  class LensLoopSettingsTab extends PluginSettingTab {
    constructor(app: App, plugin: any) {
      super(app, plugin);
    }

    display(): void {
      const { containerEl } = this;
      containerEl.empty();
      containerEl.createEl("h2", { text: "LensLoop Settings" });

      new Setting(containerEl)
        .setName("Sample option")
        .setDesc("Does absolutely nothing yet.")
        .addToggle(toggle => toggle.setValue(false));
    }
  }

  plugin.addSettingTab(new LensLoopSettingsTab(plugin.app, plugin));
}