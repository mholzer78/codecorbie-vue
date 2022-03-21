<template>
	<button type="button">
		<i :class="'icon-' + icon" aria-hidden="true"></i>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: ['icon'],
});
</script>

<style lang="scss" scoped>
button {
	padding: 0;
	background-color: transparent;
	border: none;
	color: var(--colorText);
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	[class^='icon-'] {
		display: flex;
		align-items: center;
		padding: 0.4rem;
		width: 2.5rem;
		height: 2.5rem;
		background-color: var(--colorHighlight);
		border-radius: 50%;
		font-size: 1.25rem;
	}
}
</style>
