import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "./assets/styles.css";


// ---------------------------------------------------------------------------
// Import components from PrimeVue
// ---------------------------------------------------------------------------
import Button from "primevue/button";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import Image from "primevue/image";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";
import Badge from "primevue/badge";
import Message from "primevue/message";
import Divider from "primevue/divider";
import ScrollPanel from "primevue/scrollpanel";
import TabMenu from "primevue/tabmenu";
import Panel from "primevue/panel";


//createApp(App).mount('#app')
const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount("#app");
app.component("Button", Button);
app.component("Tag", Tag);
app.component("Rating", Rating);
app.component("Image", Image);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Avatar", Avatar);
app.component("Dialog", Dialog);
app.component("Badge", Badge);
app.component("Message", Message);
app.component("Divider", Divider);
app.component("ScrollPanel", ScrollPanel);
app.component("TabMenu", TabMenu);
app.component("Panel", Panel);