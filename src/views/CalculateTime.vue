<script lang="ts">
import { defineComponent } from 'vue';

const periods:Period[] = [
    {
        name: 'weeks',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: true },
        calcToNext: 7,
        calcToMs: 604800000,
    },
    {
        name: 'days',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: false },
        calcToNext: 24,
        calcToMs: 86400000,
    },
    {
        name: 'hours',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: false },
        calcToNext: 60,
        calcToMs: 3600000,
    },
    {
        name: 'minutes',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: false },
        calcToNext: 60,
        calcToMs: 60000,
    },
    {
        name: 'seconds',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: false },
        calcToNext: 1000,
        calcToMs: 1000,
    },
    {
        name: 'millisec.',
        input: 0,
        output: { asc: 0, desc: 0, only: 0 },
        isActive: { asc: true, desc: true, only: false },
        calcToNext: 0,
        calcToMs: 1,
    },
];
interface Period {
    name: string;
    input: number;
    output: Output;
    isActive: IsActive;
    calcToNext: number;
    calcToMs: number;
}
interface IsActive {
    asc: boolean;
    desc: boolean;
    only: boolean;
}
interface Output {
    asc: number;
    desc: number;
    only: number;
}
interface Store {
    inputs: string[];
    indexAsc: number;
    indexDesc: number;
    indexOnly: number;
}
type IsActiveType = 'asc' | 'desc' | 'only';

export default defineComponent({
    data() {
        return {
            masterTimeMS: 0,
            periods: periods,
            periodInputs: ["0", "0", "0", "0", "0", "0"],
        };
    },
    watch: {},
    beforeMount() {
        this.restoreSession();
        //        this.restoreSession();
    },
    methods: {
        clearInput(index: number) {
            this.periodInputs[index] = "0";
            this.updateOutput();
        },
        updateOutput() {
            this.masterTimeMS = 0;

            // check/correct Input
            this.periodInputs.forEach((input,index) => {
                this.periods[index].input = this.simplifyDigit(input);
                this.periodInputs[index] = String(this.periods[index].input);
            })
            // inputs to MS
            this.periods.forEach((period, index) => {
                this.masterTimeMS += period.input * period.calcToMs;
            });
            // outputs
            let ascRest = this.masterTimeMS;
            let descRest = this.masterTimeMS;
            this.periods.forEach((period, index) => {
                // output "asc"
                if (this.periods[index+1] && this.periods[index+1].isActive.asc) {
                    period.output.asc = Math.floor(ascRest / period.calcToMs);
                    ascRest = ascRest % period.calcToMs;
                } else {
                    period.output.asc = ascRest / period.calcToMs;
                }

                // output "desc"
                if (period.isActive.desc) {
                    period.output.desc = Math.floor(descRest / period.calcToMs);
                    window.console.log()
                    descRest = descRest % period.calcToMs;
                } else {
                    period.output.desc = descRest / period.calcToMs;
                }

                // output "only"
                if (period.isActive.only) {
                    period.output.only = this.masterTimeMS / period.calcToMs
                }
            });

            this.saveSession();            
        },
        toggleOutput(index: number, type: IsActiveType) {
            this.periods.forEach((element) => (element.isActive[type] = false));
            switch (type) {
                case 'only':
                    this.periods[index].isActive[type] = true;
                    break;
                case 'asc':
                    for (let i = index; i >= 0; i--) {
                        this.periods[i].isActive[type] = true;
                    }
                    break;
                case 'desc':
                    for (let i = index; i < this.periods.length; i++) {
                        this.periods[i].isActive[type] = true;
                    }
                   
                    break;
            }

            this.updateOutput();
        },
        simplifyDigit(input: string) {
            if (!input) {
                input = "0";
            };
            let allowedChars = "0123456789".split("");
            let inputChars = input.split("");
            let output = "";
            let commafound = false;

            inputChars.forEach(char => {
                if (allowedChars.includes(char)) {
                    output += char;
                } else if (!commafound && [".",","].includes(char)) {
                    output += ".";
                    commafound = true;
                }
            })

            return parseFloat(output);
        },
        getClassObject(type: IsActiveType, isActive: boolean) {
            switch (type) {
                case 'only':
                    return {'icon-dot-circled': isActive, 'icon-circle-empty': !isActive};
                    break;
                case 'asc':
                case 'desc':
                    return {'icon-check': isActive, 'icon-check-empty': !isActive};
                    break;
            }
        },
        restoreSession() {
            if (localStorage.getItem('calculateTime') != null) {
                window.console.log('in');
				let fromStore = JSON.parse(
					localStorage.getItem('calculateTime') || '{}'
				);
                this.periodInputs = fromStore.inputs;
                periods.forEach((period, index) => {
                    window.console.log(index);
                    if (index <= fromStore.indexAsc) {
                        periods[index].isActive.asc = true;
                    } else {
                        periods[index].isActive.asc = false;
                    }
                    if (index >= fromStore.indexDesc) {
                        periods[index].isActive.desc = true;
                    } else {
                        periods[index].isActive.desc = false;
                    }
                    if (index == fromStore.indexOnly) {
                        window.console.log('true',index, fromStore.indexOnly);
                        periods[index].isActive.only = true;
                    } else {
                        periods[index].isActive.only = false;
                    }
                })
			};
            this.updateOutput();
        },
        saveSession() {
            let toStore : Store = {inputs: this.periodInputs, indexDesc: 0, indexAsc: 0, indexOnly: 0};
            periods.forEach((period, index) => {
                if (period.isActive.asc) {
                    toStore.indexAsc = index;
                }
                if (!period.isActive.desc) {
                    toStore.indexDesc = index + 1;
                }
                if (period.isActive.only) {
                    toStore.indexOnly = index;
                }
            }),
            localStorage.setItem(
                'calculateTime',
                JSON.stringify(toStore)
            );
        }
    },
});
</script>

<template>
    <div class="content">
        <div>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>input<i class="icon-cancel notVisible"></i></td>
                        <td>
                            and above<i class="icon-check-empty notVisible"></i>
                        </td>
                        <td>
                            and below<i class="icon-check-empty notVisible"></i>
                        </td>
                        <td>
                            only<i class="icon-circle-empty notVisible"></i>
                        </td>
                    </tr>
                    <tr v-for="(period, index) in periods">
                        <td>{{ period.name }}</td>
                        <td>
                            <input
                                id="input{{period.name}}"
                                maxlength="10"
                                size="10"
                                placeholder="0"
                                v-model="periodInputs[index]"
                                @change="updateOutput"
                            />
                            <i
                                class="icon-cancel"
                                aria-hidden="true"
                                @click="clearInput(index)"
                            ></i>
                        </td>
                        <td v-for="(value, key, indexInner) in period.output">
                            <input
                                disabled
                                :class="{ notVisible: !period.isActive[key] }"
                                id="output{{ key }}{{ period.name }}"
                                maxlength="10"
                                size="10"
                                placeholder="0"
                                value="{{ value }}"
                                v-model="period.output[key]"
                            />
                            <i
                                :class="getClassObject(key, period.isActive[key])"
                                aria-hidden="true"
                                @click="toggleOutput(index, key)"
                            ></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/table.scss';
@import '@/assets/scss/input_checkbox.scss';
@import '@/assets/scss/input_radio.scss';

.content {
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
        align-items: center;
        margin: auto;
    }
}
.left {
    text-align: left;
}
.right {
    text-align: right;
}
.notVisible {
    visibility: hidden;
}
</style>
