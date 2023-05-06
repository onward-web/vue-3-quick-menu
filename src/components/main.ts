import type { App } from 'vue';
import { HelloWorld, MyButton, Vue3QuickMenu } from "@/components";

export default {
  install: (app: App) => {
    app.component('HelloWorld', HelloWorld);
    app.component('MyButton', MyButton);
    app.component('Vue3QuickMenu', Vue3QuickMenu);
  }
};

export { HelloWorld, MyButton, Vue3QuickMenu };
