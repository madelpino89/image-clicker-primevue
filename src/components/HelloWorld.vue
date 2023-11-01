<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
      <section>
        <span class="block text-6xl font-bold mb-1">Create the screens your</span>
        <div class="text-6xl text-primary font-bold mb-3">visitors deserve to see</div>
        <p class="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <Button label="Show" icon="pi pi-external-link" class="mr-3 p-button-raised" @click="visible = true" />
        <Button label="Live Demo" type="button" class="p-button-outlined"></Button>

        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>

      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const users = ref([]);

const getRandomUsers = () => {
  fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(res => {
      users.value = res.results;
    });
};

onMounted(() => {
  getRandomUsers();
});
</script>

