import pluginInstall from "./plugins";
import { createApp } from "vue";
import router from './router';
import AppElement from "./App.vue";
import baseAddress from '@/abis/contracts'


console.log(process.env, baseAddress);

let app;
async function render(props = {}) {
  const { container } = props;
  app = createApp(AppElement);
  app.use(pluginInstall);
  app.use(router)
  app.mount(container ? container.querySelector("#app") ?? "#app" : "#app");
  return app;
}

render();
