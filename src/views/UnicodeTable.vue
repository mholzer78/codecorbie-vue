<script lang="ts">
import { int2object, object2int } from '@/assets/ts/time';

import { defineComponent } from 'vue';

// var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';

export default defineComponent({
    data() {
        return {
            hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
            horizontal: [] as string[],
            vertical: [],
        };
    },
    beforeMount() {
        this.init();
    },
    methods: {
        init() {
            this.hex.forEach((item, index) => {
                this.horizontal[index] = item;
            })
        },
        getChar(index1: number, index2: number, index3: number, index4: number, ) {
            console.log(String.fromCharCode(index4 + (index3 * 16) + (index2 * 16 * 16) + (index1 * 16 * 16 * 16)));
            return String.fromCharCode(index4 + (index3 * 16) + (index2 * 16 * 16) + (index1 * 16 * 16 * 16));
        }
    },
    /*
	data() {
		return {
			text: '',
			textLength: 2,
			textLengthType: 'paragraphs',
		};
	},
	beforeMount() {
		this.changeText();
	},
	emits: ['copyToClipboard'],
	watch: {
		textLength() {
			this.changeText();
		},
		textLengthType() {
			this.changeText();
		},
	},
	methods: {
		changeText() {
			switch (this.textLengthType) {
				case 'chars':
					{
						let tempArray = [];
						const loremIpsumArray = loremIpsum.split('');
						let arrow = -1;
						for (let i = 1; i <= this.textLength; i++) {
							console.log(i + arrow, loremIpsumArray.length);
							if (i + arrow >= loremIpsumArray.length) {
								console.log('bin da');
								arrow -= loremIpsumArray.length;
							}
							tempArray.push(loremIpsumArray[i + arrow]);
						}
						this.text = tempArray.join('');
					}
					break;
				case 'words':
					{
						let tempArray: string[] = [];
						const loremIpsumArray = loremIpsum.split(' ');
						let arrow = -1;
						for (let i = 1; i <= this.textLength; i++) {
							console.log(i + arrow, loremIpsumArray.length);
							if (i + arrow >= loremIpsumArray.length) {
								arrow -= loremIpsumArray.length;
							}
							tempArray.push(loremIpsumArray[i + arrow]);
						}
						this.text = tempArray.join(' ');
					}
					break;
				case 'paragraphs':
					let tempText = '';
					for (let i = 1; i <= this.textLength; i++) {
						if (i !== 1) {
							tempText += '\n\n';
						}
						tempText += loremIpsum;
					}
					this.text = tempText;
					break;
			}
		},
		copyMe() {
			this.$emit('copyToClipboard', this.text);
		},
	},
*/
});
</script>

<template>
    <div class="content">
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td v-for="head in hex">{{ head }}</td>
                </tr>
                <template v-for="(level1, index1) in hex">
                    <template v-for="(level2, index2) in hex">
                        <template v-for="(level3, index3) in hex">
                            <tr class="flex">
                                <td>U+{{ level1 + level2 + level3 }}x</td>
                                <td v-for="(level4, index4) in hex">{{ getChar(index1, index2, index3, index4) }}</td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
        <!--
			<textarea
				id="text"
				name="text"
                rows="15" 
				placeholder="Please enter the text you wanna transform!"
				disabled
				v-model="text"
			>
			</textarea>
			<div>
				<div class="right">
                    <multi-button icon="docs" @click="copyMe" />
				</div>
				<div class="left">
					<input
						type="number"
                        size="3"
						min="1"
						max="999"
						v-model="textLength"
					/>
					<input
						type="radio"
						id="chars"
						value="chars"
						v-model="textLengthType"
					/>
					<label for="chars">Letters</label>
					<input
						type="radio"
						id="words"
						value="words"
						v-model="textLengthType"
					/>
					<label for="words">Words</label>
					<input
						type="radio"
						id="paragraphs"
						value="paragraphs"
						v-model="textLengthType"
					/>
					<label for="paragraphs">Paragraphs</label>
				</div>
			</div>
-->
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/table.scss';
@import '@/assets/scss/input_checkbox.scss';
</style>
