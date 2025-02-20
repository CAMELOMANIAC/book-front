import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";
declare global {
  interface ServiceWorkerGlobalScope {
    __SW_MANIFEST: string[];
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
