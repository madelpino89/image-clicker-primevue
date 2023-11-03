<template>
  <div v-if="!loading" class="surface-ground px-4 py-5 md:px-6 lg:px-6">
    <div class="grid card">
      <div class="col-12 md:col-6 lg:col-6 md:px-4 lg:px-4">
        <div class="text-700 text-left">
          <div class="text-blue-600 font-bold mb-3">
            <i class="pi pi-chart-bar" />&nbsp;COUPON TYPES STATS
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-6">
            <Stats
              title="Percent Off"
              symbol="%"
              :total="couponsPercentOff.length"
              :min="minValueDiscount(couponsPercentOff)"
              :max="maxValueDiscount(couponsPercentOff)"
              :average="averageValueDiscount(couponsPercentOff)"
            />
          </div>
          <div class="col-12 md:col-6 lg:col-6">
            <Stats
              color="orange"
              title="Dollar Off"
              :total="couponsDollarOff.length"
              :min="minValueDiscount(couponsDollarOff)"
              :max="maxValueDiscount(couponsDollarOff)"
              :average="averageValueDiscount(couponsDollarOff)"
            />
          </div>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-6 md:px-4 lg:px-4">
        <div class="text-700 text-left">
          <div class="text-blue-600 font-bold mb-3">
            <i class="pi pi-table" />&nbsp;COUPON TYPES
          </div>
        </div>

        <ul class="list-none p-0 m-0">
          <li
            class="flex align-items-left text-left py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-700 w-6 md:w-8 font-semibold">
              <span> Coupon retailer name </span>
            </div>
            <div
              class="text-700 font-semibold w-full md:w-4 md:flex-order-0 flex-order-1"
            >
              Quantity
            </div>
          </li>
          <li
            v-for="coupon in couponsTypes"
            :key="coupon.name"
            class="flex align-items-left text-left py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-8 font-medium">
              <span class="mr-2">
                <i class="pi pi-tag" />
              </span>
              <span>
                {{ coupon.name }}
              </span>
            </div>
            <div
              class="text-green-500 font-semibold w-full md:w-4 md:flex-order-0 flex-order-1"
            >
              {{ coupon.count }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid card mt-4">
      <div class="col-12 md:col-6 lg:col-6 md:px-4 lg:px-4">
        <div class="text-700 text-left">
          <div class="text-blue-600 font-bold mb-3">
            <i class="pi pi-chart-bar" />&nbsp;RETAILERS STATS
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-6">
            <Stats
              title="Percent Off"
              symbol="%"
              :total="couponsPercentOff.length"
              :min="minValueDiscount(couponsPercentOff)"
              :max="maxValueDiscount(couponsPercentOff)"
              :average="averageValueDiscount(couponsPercentOff)"
            />
          </div>
          <div class="col-12 md:col-6 lg:col-6">
            <Stats
              color="orange"
              title="Dollar Off"
              :total="couponsDollarOff.length"
              :min="minValueDiscount(couponsDollarOff)"
              :max="maxValueDiscount(couponsDollarOff)"
              :average="averageValueDiscount(couponsDollarOff)"
            />
          </div>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-6 md:px-4 lg:px-4">
        <div class="text-700 text-left">
          <div class="text-blue-600 font-bold mb-3">
            <i class="pi pi-table" />&nbsp;RETAILERS
          </div>
        </div>

        <ul class="list-none p-0 m-0">
          <li
            class="flex align-items-left text-left py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-700 w-6 md:w-8 font-semibold">
              <span> Coupon retailer id </span>
            </div>
            <div
              class="text-700 font-semibold w-full md:w-4 md:flex-order-0 flex-order-1"
            >
              Quantity
            </div>
          </li>
          <li
            v-for="coupon in couponsByRetailer"
            :key="coupon.name"
            class="flex align-items-left text-left py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-8 font-medium">
              <span class="mr-2">
                <i class="pi pi-shopping-cart" />
              </span>
              <span>
                {{ coupon.name }}
              </span>
            </div>
            <div
              class="text-green-500 font-semibold w-full md:w-4 md:flex-order-0 flex-order-1"
            >
              {{ coupon.count }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import data from "@/services/data";
import Stats from "@/components/Stats.vue";

const loading = ref(false);
const coupons = ref([]);
const couponsTypes = ref([]);
const couponsByRetailer = ref([]);
/* const retailersStats = ref({
    retailers: [],
    percentOff: {
        min: 0,
        max: 0,
        average: 0,
        total: 0
    },
    dollarOff: {
        min: 0,
        max: 0,
        average: 0,
        total: 0
    }
}); */

const couponsPercentOff = computed(() =>
  coupons.value.filter(coupon => coupon.promotion_type === "percent-off")
);
const couponsDollarOff = computed(() =>
  coupons.value.filter(coupon => coupon.promotion_type === "dollar-off")
);

const minValueDiscount = coupons => {
  const min = Math.min(...coupons.map(coupon => coupon.value));
  return min;
};
const maxValueDiscount = coupons => {
  const max = Math.max(...coupons.map(coupon => coupon.value));
  return max;
};

const averageValueDiscount = coupons => {
  const average =
    coupons.reduce((acc, coupon) => acc + coupon.value, 0) / coupons.length;
  return Math.round(average);
};

const getCouponsTypes = () => {
  const types = [];
  coupons.value.forEach(coupon => {
    if (!types.some(type => type.name === coupon.coupon_webshop_name)) {
      const objCouponType = {
        name: coupon.coupon_webshop_name,
        count: 1,
      };
      types.push(objCouponType);
    } else {
      const index = types.findIndex(
        type => type.name === coupon.coupon_webshop_name
      );
      types[index].count++;
    }
  });
  couponsTypes.value = types;
};

const getCouponsByRetailer = () => {
  const retailers = [];
  coupons.value.forEach(coupon => {
    if (!retailers.some(retailer => retailer.name === coupon.webshop_id)) {
      const objCouponRetailer = {
        name: coupon.webshop_id,
        count: 1,
      };
      retailers.push(objCouponRetailer);
    } else {
      const index = retailers.findIndex(
        retailer => retailer.name === coupon.webshop_id
      );
      retailers[index].count++;
    }
  });
  couponsByRetailer.value = retailers;
  //retailersStats.value.retailers = retailers;
};

const getCoupons = async () => {
  try {
    loading.value = true;
    const res = await data.getCouponsData();
    coupons.value = res.coupons;
    loading.value = false;
    getCouponsTypes();
    getCouponsByRetailer();

    console.log(
      "Retailers and total coupon by retailer: ",
      couponsByRetailer.value
    );
  } catch (e) {
    console.log(e);
  }
};

onBeforeMount(async () => {
  await getCoupons();
});
</script>
