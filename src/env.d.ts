/// <reference types="vite/client" />

// declare module '*.vue' {
//   import { DefineComponent } from 'vue';
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // more env variables...
    readonly VITE_DEPLOY_TYPE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  declare global {
    interface Window {
      __pinia: any;
    }
  }
  
  export {};
  