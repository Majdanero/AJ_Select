<template lang="pug">
.AJ_Select(:class="{isMulti, block: props.block}" ref="select")
	p
		slot
	span
		slot(name="value" v-bind="{item: value}")
			b {{props.multi !== false ? (value.join(', ')) : value}}
	._arr(:class="{open: status}")
	ul(v-if="status" :class="{top: props.top !== false}")
		li(v-for="item in listAllow" :key="JSON.stringify(item)" @click="Select(item)" :class="{select: isSelect(item)}")
			slot(name="item" v-bind="{item, active: isSelect(item)}") {{item}}
</template>
<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from "vue";

const props = defineProps({
	modelValue: {},
	items: {type: Array, default: []},
	multi: {default: false},
	top: {default: false},
	block: {default: false}

});
const emit = defineEmits([
	'update:modelValue',
	'emit'
]);

const select = ref(null);
let status = ref(false);
const value = ref(props.modelValue);
const list  = props.items;

const isMulti = computed(() => props.multi !== false);
const listAllow = computed(() => isMulti.value ? props.items : props.items.filter(x => JSON.stringify(x) !== JSON.stringify(value.value)));

watch(() => props.modelValue, () => value.value = props.modelValue);
let onClick = (e) => {
	if(e.target === select.value) status.value = !status.value
	else if(!select.value.contains(e.target)) status.value = false;
}

onMounted(() => {
	window.addEventListener('click', onClick)
})
onUnmounted(() => {
	window.removeEventListener('click', onClick)
})
const isSelect = (item) => isMulti.value && value.value.map(JSON.stringify).includes(JSON.stringify(item));
const Select = (el) => {
	if(props.block !== false) return;
	if(props.multi !== false) {
		const index = value.value.map(JSON.stringify).indexOf(JSON.stringify(el));
		if(index === -1) value.value.push(el);
		else value.value.splice(index, 1);
	}
	else {
		value.value = el;
		status.value = false;
	}
	emit("update:modelValue", value);
	emit("emit");
}
</script>
<style lang="scss">
$col_text: #ffffff;
$col_background: #1E242A;
$col_border: #353F4D;
$col_border_active: #fd6950;

.AJ_Select {
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	height: 40px;
	border: 1px solid $col_border;
	border-radius: 10px;
	user-select: all;
	cursor: pointer;
	width: calc(100% - 10px);
	margin: 5px;
	&.block {
		user-select: none;
		pointer-events: none;
		border: 1px solid rgba($col_border, 0.5);
		&>span, &>p {
			opacity: 0.5;
		}
	}
	&>span, &>p {
		letter-spacing: 0.5px;
		user-select: none;
		pointer-events: none;
	}
	&>p {
		font-size: 11px;
		font-weight: 500;
		line-height: 9px;
		color: $col_text;
		padding: 0 10px 0 10px;
		position: absolute;
		top: 0;
		left: 10px;
		transform: translateY(-50%);
		margin: 0;
		background-color: $col_background;
	}
	&>span {
		width: 100%;
		position: relative;
		font-size: 16px;
		font-weight: 400;
		height: 18px;
		padding: 0 10px 0 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		b {
			font-size: 16px;
			font-weight: 400;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	._arr {
		width: 17px;
		height: 17px;
		position: absolute;
		top: calc((39px - 17px) / 2);
		right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		&::after {
			content: '';
			border-color: $col_border;
			border-style: solid;
			border-width: 1px 1px 0 0;
			display: flex;
			height: 11px;
			width: 11px;
			box-sizing: border-box;
			transform: rotate(135deg);
			margin-top: -30%;
			transition: 0.3s;
		}
		&.open {
			&::after {
				transform: rotate(-45deg);
				margin-top: 25%;

			}
		}
	}
	&:hover {
		._arr {
			&::after {
				border: 1px solid $col_border_active;
				border-width: 1px 1px 0 0;
			}
		}
	}
	&>ul {
		position: absolute;
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		background-color: $col_background;
		box-shadow: 0 0 2rem 0.1rem rgb(0,0,0,0.1);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		min-height: 13px !important;
		min-width: 100%;
		overflow: hidden;
		transition: 0.15s;
		z-index: 99999;
		&.top {
			top: unset;
			bottom: calc(100% + 10px);
		}
		&>li {
			padding: 0.5rem 10px;
			white-space: nowrap;
			cursor: pointer;
			min-height: 37px;
			display: flex;
			align-items: center;
			line-height: 11px;
			letter-spacing: 0.5px;
			font-size: 12px;
			font-weight: 400;
			user-select: none;
			transition: 0.3s;
			color: #fff;
			&:hover {
				background-color: $col_background;
				color: $col_border_active;
			}
		}
	}
	&.isMulti ul li {
		&::before {
			content: '';
			display: inline-flex;
			width: 10px;
			height: 10px;
			border: 1.25px solid $col_text;
			margin-right: 10px;
			transition: 0.3s;
		}
		&.select {
			&::before {
				background-color: $col_text;
			}
		}
	}
}
</style>