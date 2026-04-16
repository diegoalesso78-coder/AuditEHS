/**
 * Simple storage shim for localStorage
 */
export const storage = {
  get: async (key: string) => {
    const value = localStorage.getItem(key);
    return value ? { value } : null;
  },
  set: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  }
};

// Attach to window for compatibility with the provided code
if (typeof window !== 'undefined') {
  (window as any).storage = storage;
}
