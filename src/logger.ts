const DEBUG = true; // We'll later wire this to plugin settings

export function logDebug(...args: any[]) {
  if (DEBUG) console.log("[LensLoop]", ...args);
}
