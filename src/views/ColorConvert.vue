<script lang="ts">
import {
    rgb2hex,
    rgb2hexWeb,
    rgb2rgbWeb,
    rgb2cmyk,
    rgb2hsv,
    hex2rgb,
    cmyk2rgb,
    hsv2rgb,
} from '@/assets/ts/color';

const regexHEX = /[^0-9a-fA-F]/g;
const regexRGB = /[^0-9,]/g;
const colorMasterDefault = [0, 0, 0];

import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            colorMaster: colorMasterDefault,
            colorMasterWeb: colorMasterDefault,
            inputHEX: '',
            inputRGB: '',
            inputHEXweb: '',
            inputRGBweb: '',
            inputCMYK: [] as number[],
            colorInputHSV: [] as number[],
        };
    },
    beforeMount() {
        this.restoreSession();
    },
    emits: ['copyToClipboard'],
    methods: {
        restoreSession() {
            if (localStorage.getItem('colorConvert') != null) {
                this.colorMaster = JSON.parse(
                    localStorage.getItem('colorConvert') || '{}'
                );
                this.colorSync('none');
            }
        },
        handleInputHEX() {
            let valArray = [];
            valArray = this.inputHEX.replace(regexHEX, '').split('');
            valArray.splice(6);
            if (valArray.length === 3 || valArray.length === 6) {
                // HEX is valid
                this.colorMaster = hex2rgb(valArray);
                this.colorSync('hex');
            } else {
                this.resetColor('hex');
            }
            // fixing Input-Errors either way
            this.inputHEX = valArray.join('');
        },
        handleInputRGB() {
            let valArray: number[] = [];
            const valArrayString: string[] = this.inputRGB
                .replace(regexRGB, '')
                .split(',');
            for (let i = 0; i <= 2; i++) {
                if (valArrayString[i] === '') {
                    this.resetColor('rgb');
                    return;
                }
            }

            valArray = valArrayString.map((i) => Number(i));
            valArray.splice(3);
            for (let i = 0; i <= 2; i++) {
                if (+valArray[i] < 0) {
                    valArray[i] = 0;
                }
                if (+valArray[i] > 255) {
                    valArray[i] = 255;
                }
            }
            if (
                valArray.length === 3 &&
                valArray[0] != null &&
                valArray[1] != null &&
                valArray[2] != null
            ) {
                // RGB is valid
                valArray = valArray.map(function (x) {
                    return x;
                });
                this.colorMaster = valArray;
                this.colorSync('rgb');
            } else {
                this.resetColor('rgb');
                return;
            }
            this.inputRGB = valArray.join(',');
        },
        handleInputCMYK() {
            if (
                this.inputCMYK.length === 4 &&
                typeof this.inputCMYK[0] === 'number' &&
                typeof this.inputCMYK[1] === 'number' &&
                typeof this.inputCMYK[2] === 'number' &&
                typeof this.inputCMYK[3] === 'number'
            ) {
                // CMYK is valid
                this.colorMaster = cmyk2rgb(this.inputCMYK);
                this.colorSync('cmyk');
            } else {
                this.resetColor('cmyk');
            }
        },
        handleInputHSV() {
            if (
                this.colorInputHSV.length === 3 &&
                typeof this.colorInputHSV[0] === 'number' &&
                typeof this.colorInputHSV[1] === 'number' &&
                typeof this.colorInputHSV[2] === 'number'
            ) {
                // HSV is valid
                this.colorMaster = hsv2rgb(this.colorInputHSV);
                this.colorSync('hsv');
            } else {
                this.resetColor('hsv');
            }
        },
        colorSync(exclude: string) {
            if (exclude != 'none') {
                localStorage.setItem(
                    'colorConvert',
                    JSON.stringify(this.colorMaster)
                );
            }
            if (exclude != 'rgb') {
                this.inputRGB = this.colorMaster.join(',');
            }
            if (exclude != 'hex') {
                this.inputHEX = rgb2hex(this.colorMaster);
            }
            if (exclude != 'cmyk') {
                this.inputCMYK = rgb2cmyk(this.colorMaster);
            }
            if (exclude != 'hsv') {
                this.colorInputHSV = rgb2hsv(this.colorMaster);
            }
            this.colorMasterWeb = rgb2rgbWeb(this.colorMaster);
            this.inputRGBweb = rgb2rgbWeb(this.colorMaster).join(',');
            this.inputHEXweb = rgb2hexWeb(this.colorMaster);
        },
        resetColor(except: string) {
            this.colorMaster = colorMasterDefault;
            this.colorMasterWeb = colorMasterDefault;
            if (except != 'hex') {
                this.inputHEX = '';
            }
            if (except != 'rgb') {
                this.inputRGB = '';
            }
            if (except != 'cmyk') {
                this.inputCMYK = [];
            }
            if (except != 'hsv') {
                this.colorInputHSV = [];
            }
            this.inputHEXweb = '';
            this.inputRGBweb = '';
        },
        copyMe(text: string, type: string) {
            this.$emit('copyToClipboard', text, type);
        },
    },
});
</script>

<template>
    <div class="content">
        <div>
            <label for="inputHEX">HEX</label>
            <input
                id="inputHEX"
                maxlength="7"
                size="6"
                placeholder="000000"
                v-model="inputHEX"
                @input="handleInputHEX"
            />
            <i
                class="icon-blank"
                aria-hidden="true"
                :style="{ color: 'rgba(' + colorMaster.join(',') + ')' }"
            ></i>
            <multi-button icon="docs" @click="copyMe(inputHEX, 'hex')" />
        </div>
        <div>
            <label for="inputHEXweb">HEX (web-safe)</label>
            <input
                disabled
                id="inputHEXweb"
                maxlength="4"
                size="3"
                placeholder="000"
                v-model="inputHEXweb"
            />
            <i
                class="icon-blank"
                aria-hidden="true"
                :style="{ color: 'rgba(' + colorMasterWeb + ')' }"
            ></i>
            <multi-button icon="docs" @click="copyMe(inputHEXweb, 'hex')" />
        </div>
        <br />
        <div>
            <label for="inputRGB">RGB</label>
            <input
                id="inputRGB"
                maxlength="100"
                size="11"
                placeholder="0,0,0"
                v-model="inputRGB"
                @input="handleInputRGB"
            />
            <i
                class="icon-blank"
                aria-hidden="true"
                :style="{ color: 'rgba(' + colorMaster.join(',') + ')' }"
            ></i>
            <multi-button icon="docs" @click="copyMe(inputRGB, 'rgb')" />
        </div>
        <div>
            <label for="inputRGBweb">RGB (web-safe)</label>
            <input
                disabled
                id="inputRGBweb"
                maxlength="100"
                size="11"
                placeholder="0,0,0"
                v-model="inputRGBweb"
            />
            <i
                class="icon-blank"
                aria-hidden="true"
                :style="{ color: 'rgba(' + colorMasterWeb + ')' }"
            ></i>
            <multi-button icon="docs" @click="copyMe(inputRGBweb, 'rgb')" />
        </div>
        <br />
        <div>
            <label for="cmyk-c">CMYK C:</label>
            <input
                id="cmyk-c"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="inputCMYK[0]"
                @input="handleInputCMYK"
            />
            <span class="appendix">%</span>
            <label for="cmyk-m"> M:</label>
            <input
                id="cmyk-m"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="inputCMYK[1]"
                @input="handleInputCMYK"
            />
            <span class="appendix">%</span>
            <label for="cmyk-y">Y:</label>
            <input
                id="cmyk-y"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="inputCMYK[2]"
                @input="handleInputCMYK"
            />
            <span class="appendix">%</span>
            <label for="cmyk-k"> K:</label>
            <input
                id="cmyk-k"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="inputCMYK[3]"
                @input="handleInputCMYK"
            />
            %
        </div>
        <br />
        <div>
            <label for="hsv-h">HSV H:</label>
            <input
                id="hsv-h"
                type="number"
                min="0"
                max="360"
                size="3"
                placeholder="0"
                v-model="colorInputHSV[0]"
                @input="handleInputHSV"
            />
            <span class="appendix">°</span>
            <label for="hsv-sat">Sat:</label>
            <input
                id="hsv-sat"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="colorInputHSV[1]"
                @input="handleInputHSV"
            />
            <span class="appendix">%</span>
            <label for="hsv-val">Val:</label>
            <input
                id="hsv-val"
                type="number"
                min="0"
                max="100"
                size="3"
                placeholder="0"
                v-model="colorInputHSV[2]"
                @input="handleInputHSV"
            />
            %
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
        align-items: center;
        margin: auto;
    }
}
.icon-blank {
    font-size: 3rem;
}
.appendix {
    margin-right: 1rem;
}
</style>
