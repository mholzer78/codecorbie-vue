<script lang="ts">
import { int2object, object2int } from '@/assets/ts/time';

import { defineComponent } from 'vue';

// var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';

export default defineComponent({
    data() {
        return {
            times: [
                { master: 31536000000, text: '' },
                { master: 31536001, text: '' },
                { master: 0, text: '' },
            ],
            options: {
                week: true,
                day: true,
                hour: true,
                minute: true,
                second: true,
                millisecond: true,
            },
        };
    },
    beforeMount() {
        this.init();
    },
    methods: {
        init() {
            this.times[2].master = object2int('3w 5d 36:00:00-01', this.options);
            this.times.forEach((element) => {
                element.text = this.calculateEntry(element.master);
            });
        },
        changeEntry() {},
        calculateEntry(millisecond: number) {
            let tempObj = int2object(millisecond, this.options);
            let tempString = '';
            if (this.options.week && tempObj.week > 0) {
                tempString += tempObj.week + 'w ';
            }
            if (this.options.day && tempObj.day > 0) {
                tempString += tempObj.day + 'd ';
            }
            if (this.options.hour) {
                tempString += tempObj.hour + ':';
            }
            if (this.options.minute) {
                if (tempObj.minute.toString().length < 2) {
                    tempString += '0';
                }
                tempString += tempObj.minute;
            }
            if (this.options.second) {
                tempString += ':';
                if (tempObj.second.toString().length < 2) {
                    tempString += '0';
                }
                tempString += tempObj.second;
            }
            if (this.options.millisecond && tempObj.millisecond > 0) {
                tempString += '-';
                
                if (tempObj.millisecond.toString().length < 3) {
                    tempString += '0';
                }
                if (tempObj.millisecond.toString().length < 2) {
                    tempString += '0';
                }
                tempString += tempObj.millisecond;
            }
            return tempString;
        },
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
                <template v-for="time in times">
                    <tr class="flex">
                        <td>{{ time.master }}</td>
                        <td>{{ time.text }}</td>
                    </tr>
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
