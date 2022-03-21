<script lang="ts">
const charsUC = 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split(''); //exclude: I,O
const charsLC = 'abcdefghijkmnopqrstuvwxyz'.split(''); //exclude: l
const charsNum = '23456789'.split(''); //exclude: 0,1
const charsSpec = '.:,;!?-_#=+*/&@<>()[]{}'.split(''); //exclude: |

import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			passLength: 8,
			passChars: ['uppercase', 'lowercase', 'numbers'],
			passClear: '',
			passShown: '',
			passDummy: '',
		};
	},
	beforeMount() {
		this.restoreSession();
		this.generateNewPass();
	},
	emits: ['copyToClipboard'],
	watch: {
		passLength() {
			this.generateNewPass();
			localStorage.setItem('passLength', this.passLength.toString());
		},
		passChars() {
			this.generateNewPass();
		},
	},
	methods: {
		restoreSession() {
			this.passLength = parseInt(
				localStorage.getItem('passLength') || '8'
			);
		},
		generateNewPass() {
			let listOfChars: string[] = [];
			this.passClear = '';
			this.passDummy = '';
			if (this.passChars.includes('uppercase')) {
				listOfChars = listOfChars.concat(charsUC);
			}
			if (this.passChars.includes('lowercase')) {
				listOfChars = listOfChars.concat(charsLC);
			}
			if (this.passChars.includes('numbers')) {
				listOfChars = listOfChars.concat(charsNum);
			}
			if (this.passChars.includes('special')) {
				listOfChars = listOfChars.concat(charsSpec);
			}

			if (listOfChars.length === 0) {
				listOfChars = listOfChars.concat(charsUC, charsLC, charsNum);
			}

			for (let i = 1; i <= this.passLength; i++) {
				this.passClear =
					this.passClear +
					listOfChars[Math.floor(Math.random() * listOfChars.length)];
				this.passDummy = this.passDummy + '\u2022';
			}
			this.passShown = this.passDummy;
		},
		showPass() {
			this.passShown = this.passClear;
		},
		hidePass() {
			this.passShown = this.passDummy;
		},
		copyMe(text: string) {
			this.$emit('copyToClipboard', text, 'password');
		},
	},
});
</script>

<template>
	<div class="content">
		<div>
			<label for="passLength">Length</label>
			<input
				id="passLength"
				type="text"
				maxlength="3"
				size="3"
				v-model="passLength"
			/>
			<input
				type="range"
				min="5"
				max="128"
				class="slider"
				id="myRange"
				v-model="passLength"
			/>
			(5-128)
		</div>
		<div>
			<input
				id="charsUC"
				type="checkbox"
				value="uppercase"
				v-model="passChars"
			/>
			<label for="charsUC">A-Z</label>
			<input
				id="charsLC"
				type="checkbox"
				value="lowercase"
				v-model="passChars"
			/>
			<label for="charsLC">a-z</label>
			<input
				id="charsNum"
				type="checkbox"
				value="numbers"
				v-model="passChars"
			/>
			<label for="charsNum">1-9</label>
			<input
				id="charsSpec"
				type="checkbox"
				value="special"
				v-model="passChars"
			/>
			<label for="charsSpec">/(=?...</label>
		</div>
		<div>
			<label for="password">Password</label>
			<multi-button icon="refresh" @click="generateNewPass" />
			<multi-button icon="eye" @mousedown="showPass()" @mouseup="hidePass()" />
			<input
				id="password"
				type="text"
				:maxlength="passLength"
				:size="passLength < 50 ? passLength : 50"
				v-model="passShown"
				placeholder=""
			/>
            <multi-button icon="docs" @click="copyMe(passClear)" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/input_range.scss';
@import '@/assets/scss/input_checkbox.scss';
</style>
