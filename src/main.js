import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import {
  Table,
  Button,
  Row,
  Col,
  Space,
  Modal,
  Input,
  Spin,
} from "ant-design-vue";

Vue.use(Table);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Space);
Vue.use(Modal);
Vue.use(Input);
Vue.use(Spin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
