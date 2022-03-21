<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheMessage from './components/TheMessage.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<script lang="ts">
import { copyTextToClipboard } from '@/assets/ts/copy2clipboard';

export default {
	data() {
		return { messageType: 'hidden' as string, messageText: '' as string };
	},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	methods: {
		copyToClipboard(value: string, type: string) {
			let error = false;
			let prefix = '';
			let textToCopy = '';

			if (value === '' || value === undefined) {
				error = true;
			} else {
				switch (type) {
					case 'rgb':
						prefix = 'RGBA-Color';
						textToCopy = 'rgba(' + value + ',1)';
						break;
					case 'hex':
						prefix = 'HEX-Color';
						textToCopy = '#' + value;
						break;
					case 'password':
						prefix = 'Password';
						textToCopy = value;
						break;
					default: {
						prefix = 'Text';
						textToCopy = value;
					}
				}
			}

			if (error) {
				this.messageShow(
					'error',
					prefix + ' could not be copied to clipboard'
				);
			} else {
				copyTextToClipboard(textToCopy);
				this.messageShow('okay', prefix + ' copied to clipboard');
			}
		},
		messageShow(type: string, text: string) {
			this.messageType = type;
			this.messageText = text;
			setTimeout(() => {
				(this.messageType = 'hidden'), (this.messageText = '');
			}, 3000);
		},
	},
};
</script>
<template>
	<TheHeader :route="currentRouteName"/>

	<RouterView @copyToClipboard="copyToClipboard" />

	<TheMessage
		v-if="messageType != 'hidden'"
		:type="messageType"
		:text="messageText"
	/>

	<TheFooter />
</template>

<style>
@import '@/assets/scss/base.scss';
</style>
