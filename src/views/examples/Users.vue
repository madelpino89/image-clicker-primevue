<template>
  <div v-if="error" id="error-container">
    <Divider class="col-6 col-offset-3" />
    <Message class="col-6 col-offset-3" :closable="false" severity="error">
      {{ messageError }}
    </Message>
  </div>
  <div v-if="!loading" class="card">
    <DataView :value="users" :layout="layout" lazy>
      <template #header>
        <div class="flex justify-content-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>
      <template #list="slotProps">
        <div class="col-12">
          <div
            class="flex flex-column xl:flex-row xl:align-items-start lg:flex-row lg:align-items-start md:flex-row md:align-items-start sm:flex-row sm:align-items-start p-4 gap-4"
          >
            <img
              class="w-9 sm:w-10rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="slotProps.data.picture.large"
              :alt="slotProps.data.name"
            />
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
            >
              <div
                class="flex flex-column align-items-center sm:align-items-start gap-3"
              >
                <div class="text-2xl font-bold text-900">
                  <Button
                    link
                    :label="slotProps.data.name"
                    @click="showUserDetail(slotProps.data)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img
                class="w-9 sm:w-10rem xl:w-16rem shadow-2 border-round"
                :src="slotProps.data.picture.large"
                :alt="slotProps.data.email"
              />
              <div class="text-2xl font-bold">
                <Button
                  link
                  :label="slotProps.data.name"
                  @click="showUserDetail(slotProps.data)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    <Dialog
      v-model:visible="visible"
      modal
      header="Header"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div
          class="inline-flex align-items-center justify-content-center gap-2"
        >
          <Avatar :image="userDetail.picture.large" shape="circle" />
          <span class="font-bold white-space-nowrap">
            {{ userDetail.name }}
          </span>
          <Button
            text
            plain
            size="small"
            label="Viewed"
            icon="pi pi-eye"
            severity="secondary"
            :badge="userDetail.clicked"
            class="cursor-auto"
            badge-class="p-badge-success"
          />
        </div>
      </template>
      <div class="surface-section">
        <ul class="list-none p-0 m-0">
          <li
            v-if="userDetail.email"
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">
              <span class="mr-2">
                <i class="pi pi-envelope" />
              </span>
              <span> Email </span>
            </div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {{ userDetail.email }}
            </div>
          </li>
          <li
            v-if="userDetail.phone"
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">
              <span class="mr-2">
                <i class="pi pi-phone" />
              </span>
              <span> Phone </span>
            </div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {{ userDetail.phone }}
            </div>
          </li>
          <li
            v-if="userDetail.gender"
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">
              <span class="mr-2">
                <i class="pi pi-info-circle" />
              </span>
              <span> Gender </span>
            </div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {{ capitalizeGender(userDetail.gender) }}
            </div>
          </li>
          <li
            v-if="userDetail.id.value"
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">
              <span class="mr-2">
                <i class="pi pi-id-card" />
              </span>
              <span> DNI </span>
            </div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {{ userDetail.id.value }}
            </div>
          </li>
        </ul>
      </div>
      <template #footer>
        <Button
          label="Ok"
          icon="pi pi-check"
          autofocus
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import data from "@/services/data";
import useUtils from "@/composables/useUtils";

const users = ref([]);
const userDetail = ref({});
const loading = ref(false);
const layout = ref("grid");
const visible = ref(false);
const error = ref(null);
const messageError = ref(null);

const { capitalizeGender } = useUtils();

const getUserName = user => `${user.title} ${user.first} ${user.last}`;

const getRandomUsers = async () => {
  try {
    loading.value = true;
    const res = await data.getRandomUsers();
    users.value = res.results.map(user => ({
        clicked: 0,
        ...user,
        name: getUserName(user.name),
      }));
    loading.value = false;
  } catch (e) {
    console.log;
    error.value = true;
    messageError.value = e.message;
    loading.value = false;
  }
};

const showUserDetail = user => {
  visible.value = true;
  user.clicked++;
  userDetail.value = user;
};

onBeforeMount(async () => {
  await getRandomUsers();
});
</script>
