<template>
  <div class="card">
    <DataView :value="products" :layout="layout">
      <template #header>
        <div class="flex justify-content-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div
            class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
          >
            <img
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
              :alt="slotProps.data.name"
            />
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
            >
              <div
                class="flex flex-column align-items-center sm:align-items-start gap-3"
              >
                <div class="text-2xl font-bold text-900">
                  {{ slotProps.data.name }}
                </div>
                <Rating
                  :model-value="slotProps.data.rating"
                  readonly
                  :cancel="false"
                />
                <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center gap-2">
                    <i class="pi pi-tag" />
                    <span class="font-semibold">{{
                      slotProps.data.category
                    }}</span>
                  </span>
                  <Tag
                    :value="slotProps.data.inventoryStatus"
                    :severity="getSeverity(slotProps.data)"
                  />
                </div>
              </div>
              <div
                class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
              >
                <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                <Button
                  icon="pi pi-shopping-cart"
                  rounded
                  :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag" />
                <span class="font-semibold">{{ slotProps.data.category }}</span>
              </div>
              <Tag
                :value="slotProps.data.inventoryStatus"
                :severity="getSeverity(slotProps.data)"
              />
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img
                class="w-9 shadow-2 border-round"
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.name"
              />
              <div class="text-2xl font-bold">
                {{ slotProps.data.name }}
              </div>
              <Rating
                :model-value="slotProps.data.rating"
                readonly
                :cancel="false"
              />
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
              <Button
                icon="pi pi-shopping-cart"
                rounded
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
              />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "@/services/mocks/ProductService";

onMounted(() => {
  ProductService.getProducts().then(
    data => (products.value = data.slice(0, 12))
  );
});

const products = ref();
const layout = ref("grid");

const getSeverity = product => {
  switch (product.inventoryStatus) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>
