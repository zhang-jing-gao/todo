import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

createApp(App).use(router).use(store).mount("#app");

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
    console.log("need refresh to update")
  },
  onOfflineReady() {
    // show a ready to work offline to user
    console.log("offlineReady")
  },
});

// when user clicked the "refresh" button
updateSW();
// the page will reload and the up-to-date content will be served.
