declare global {
  interface Window {
    nextChunk: (data: string) => Promise<void>;
  }
}

export const global = {};
