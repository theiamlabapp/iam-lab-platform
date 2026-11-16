// Preload script to resolve Node 20.19.x global cache conflict with undici/tsx
delete globalThis.caches;
