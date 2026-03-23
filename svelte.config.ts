import adapter from "@sveltejs/adapter-vercel";
import { type Config } from "@sveltejs/kit";
import { sveltePreprocess } from "svelte-preprocess";

const config: Config = {
  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: true,
    },
  },
  preprocess: [
    sveltePreprocess({
      typescript: true,
    }),
  ],
  vitePlugin: {
    inspector: true,
  },
  compilerOptions: {
    dev: true,
    hmr: true,
  },
  prebundleSvelteLibraries: true,
};

export default config;
