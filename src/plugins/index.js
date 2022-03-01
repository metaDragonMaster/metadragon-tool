import piniaInstall from "./pinia";
import ElementPlus from "./elementPlus"
import VueI18n from "./i18n"
export default function install(app) {
  app.use(piniaInstall);
  app.use(VueI18n);
  app.use(ElementPlus)
}
