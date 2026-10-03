import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "agency",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-03",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none", runWorkerFirst: ["/_vinext/static-cache/*"] },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      VINEXT_KV_CACHE: bindings.kv(),
    },
  }),
});
