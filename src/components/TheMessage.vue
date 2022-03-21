<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['type', 'text'],
});
</script>

<template>
	<div class="message" :class="type">
		<i
			:class="type === 'okay' ? 'icon-ok' : 'icon-cancel'"
			aria-hidden="true"
		></i>
		<span>{{ text }}</span>
	</div>
</template>

<style scoped lang="scss">
.message {
	position: fixed;
	top: 0;
	right: 0;
	background: #ffffff;
	font-size: 1rem;
	display: flex;
	&.hidden {
		display: none;
	}
	&.okay {
		background: rgba(92, 179, 73, 0.25);
		color: rgb(92, 179, 73);
		i {
			background: rgb(92, 179, 73);
			color: #ffffff;
		}
	}
	&.error {
		background: rgba(231, 77, 62, 0.25);
		color: rgb(231, 77, 62);
		i {
			background: rgb(231, 77, 62);
			color: #ffffff;
		}
	}
	i {
		padding: 0.5rem;
	}
	span {
		padding: 0.5rem 1rem;
	}
}
</style>
