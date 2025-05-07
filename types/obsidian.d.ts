// types/obsidian.d.ts

declare module "obsidian" {
    export class Plugin {
      app: App;
      manifest: PluginManifest;
      addCommand(command: Command): void;
      registerEvent(eventRef: any): void;
      registerDomEvent(el: HTMLElement, type: string, callback: EventListenerOrEventListenerObject): void;
      registerInterval(id: number): void;
      onunload(): void;
      onload(): void | Promise<void>;
    }
  
    export interface PluginManifest {
      id: string;
      name: string;
      version: string;
    }
  
    export interface Command {
      id: string;
      name: string;
      callback?: () => void;
      checkCallback?: (checking: boolean) => boolean | void;
      hotkeys?: any[];
    }
  
    export class App {
      workspace: Workspace;
      vault: Vault;
    }
  
    export class Vault {
      getName(): string;
    }
  
    export class Workspace {
      getActiveFile(): TFile | null;
    }
  
    export class TFile {
      path: string;
      name: string;
      basename: string;
      extension: string;
    }
  }