import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import './assets/styles.css';


// ---------------------------------------------------------------------------
// Import components from PrimeVue
// ---------------------------------------------------------------------------
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import Image from 'primevue/image';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import Badge from 'primevue/badge';
import Message from 'primevue/message';
import Divider from 'primevue/divider';
import ScrollPanel from 'primevue/scrollpanel';


//createApp(App).mount('#app')
const app = createApp(App);
app.mount('#app');
app.use(PrimeVue);
app.component('Button', Button);
app.component('Tag', Tag);
app.component('Rating', Rating);
app.component('Image', Image);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Avatar', Avatar);
app.component('Dialog', Dialog);
app.component('Badge', Badge);
app.component('Message', Message);
app.component('Divider', Divider);
app.component('ScrollPanel', ScrollPanel);
