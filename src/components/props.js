export const props = defineProps({
title: String,
symbol: {
type: String,
default: '$'
},
total: {
type: Number,
default: 0
},
min: {
type: Number,
default: 0
},
max: {
type: Number,
default: 0
},
average: {
type: Number,
default: 0
},
});
