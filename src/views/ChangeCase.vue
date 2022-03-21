<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			text: '',
			textOriginal: '',
			transform: 'keep',
		};
	},
	emits: ['copyToClipboard'],
	watch: {
		transform() {
			this.transformText();
		},
	},
	methods: {
		storeOriginal() {
			this.textOriginal = this.text;
			this.transformText();
		},
		transformText() {
			switch (this.transform) {
				case 'keep':
					this.text = this.textOriginal;
					console.log('keep');
					break;
				case 'lower':
					this.text = this.textOriginal.toLowerCase();
					break;
				case 'upper':
					this.text = this.textOriginal.toUpperCase();
					break;
				case 'firstOfWord':
					const tempWordArray = this.textOriginal.split(' ');
					for (var i = 0; i < tempWordArray.length; i++) {
						tempWordArray[i] =
							tempWordArray[i].charAt(0).toUpperCase() +
							tempWordArray[i].slice(1).toLowerCase();
						this.text = tempWordArray.join(' ');
					}
					break;
				case 'firstOfSencence':
					let charArray = this.textOriginal.split('');
					charArray.forEach((char, index) => {
						if (char === '.' || char === '!' || char === '?') {
							let nextChar = 1;
							while (index + nextChar < charArray.length) {
								if (charArray[index + nextChar] !== ' ') {
									charArray[index + nextChar] =
										charArray[
											index + nextChar
										].toUpperCase();
									nextChar = charArray.length;
								} else {
									nextChar += 1;
								}
							}
						}
					});
					this.text = charArray.join('');

					break;
			}
		},
		copyMe() {
			this.$emit('copyToClipboard', this.text);
		},
	},
});
</script>

<template>
	<div class="content">
		<div class="flex">
			<textarea
				id="text"
				name="text"
				placeholder="Please enter the text you wanna transform!"
				v-model="text"
				@input="storeOriginal"
			>
			</textarea>
			<div>
				<div class="right">
					<multi-button icon="docs" @click="copyMe" />
				</div>
				<div class="left">
					<input
						type="radio"
						id="keep"
						name="transform"
						value="keep"
						v-model="transform"
					/>
					<label for="keep">keep as is</label>
					<input
						type="radio"
						id="lower"
						name="transform"
						value="lower"
						v-model="transform"
					/>
					<label for="lower">all lower case</label>
					<input
						type="radio"
						id="upper"
						name="transform"
						value="upper"
						v-model="transform"
					/>
					<label for="upper">ALL UPPER CASE</label>
					<input
						type="radio"
						id="firstWord"
						name="transform"
						value="firstOfWord"
						v-model="transform"
					/>
					<label for="firstWord">First Cap (Word)</label>
					<input
						type="radio"
						id="firstSencence"
						name="transform"
						value="firstOfSencence"
						v-model="transform"
					/>
					<label for="firstSencence">First cap (sentence)</label>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/input_radio.scss';

.flex {
	display: flex;
}
.left {
	text-align: left;
}
.right {
	text-align: right;
}
textarea {
	flex: 1;
	margin-right: 1rem;
}
</style>
