import type { App } from 'vue';
import { Vue3QuickMenu } from "@/components";

export default {
  install: (app: App) => {
    app.component('Vue3QuickMenu',Vue3QuickMenu);
  }
};

export { Vue3QuickMenu };
