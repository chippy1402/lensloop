// Parses config key=value from code block
export function parseConfig(source: string): Record<string, string> {
    const config: Record<string, string> = {};
    const lines = source.split(/\r?\n/);
    for (const line of lines) {
      const [key, value] = line.split("=").map(s => s.trim());
      if (key && value) {
        config[key.toLowerCase()] = value.replace(/^"|"$/g, "");
      }
    }
    return config;
  }