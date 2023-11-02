<template>
    <div class="card">

    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import data from '@/services/data';

const coupons = ref([]);
const couponsTypes = ref([]);


const getCouponsPercentOff = computed(() => coupons.value.filter(coupon => coupon.promotion_type === 'percent-off'));
const getCouponsDollarOff = computed(() => coupons.value.filter(coupon => coupon.promotion_type === 'dollar-off'));

const minValueDiscount = (coupons) => {
    const min = Math.min(...coupons.value.map(coupon => coupon.value));
    return min;
};
const maxValueDiscount = (coupons) => {
    const max = Math.max(...coupons.value.map(coupon => coupon.value));
    return max;
};

const averageValueDiscount = (coupons) => {
    const average = coupons.value.reduce((acc, coupon) => acc + coupon.value, 0) / coupons.value.length;
    return average;
};

const getCouponsTypes = () => {
    const types = [];
    coupons.value.forEach(coupon => {
        if (!types.includes(coupon.coupon_webshop_name)) {
            types.push(coupon.coupon_webshop_name);
        }
    });
    couponsTypes.value = types;
};

const getCoupons = async () => {
    try {
        const res = await data.getCouponsData();
        coupons.value = res.coupons;
        getCouponsTypes();
        console.log(couponsTypes.value);
        console.log('Dollar off list:', getCouponsDollarOff.value);
        console.log('Percent off list:', getCouponsPercentOff.value);
        console.log('Min dollar discount:', minValueDiscount(getCouponsDollarOff));
        console.log('Max dollar discount:', maxValueDiscount(getCouponsDollarOff));
        console.log('Min percent discount:', minValueDiscount(getCouponsPercentOff));
        console.log('Max percent discount:', maxValueDiscount(getCouponsPercentOff));
        console.log('Average dollar discount:', averageValueDiscount(getCouponsDollarOff));
        console.log('Average percent discount:', averageValueDiscount(getCouponsPercentOff));
    } catch (e) {
        console.log(e);
    }
};

onBeforeMount(async () => {
    await getCoupons();
});
</script>