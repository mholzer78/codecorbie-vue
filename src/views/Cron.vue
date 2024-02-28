<script lang="ts">
import { defineComponent } from 'vue';
import CronChoices from '../components/Cron/CronChoices.vue';

export default defineComponent({
    components: {
        CronChoices: CronChoices,
    },
    data() {
        return {
            options: ['every', 'even', 'odd', 'recurring', 'exactly'],
            crontab: '',
            seconds: 'every',
            secondsDetail: [0],
            minutes: 'every',
            minutesDetail: [0],
            hours: 'every',
            hoursDetail: [0],
            days: 'every',
            daysDetail: [0],
            months: 'every',
            monthsDetail: [0],
            weekdays: 'every',
            weekdaysDetail: [0],
            text: '',
        };
    },
    beforeMount() {},
    emits: ['copyToClipboard'],
	watch: {
		crontab() {
            while (this.crontab.includes('  ')) {
                this.crontab.replace('  ','')
            }
			console.log(this.crontab);
		},
	},
    methods: {
        changeRadio(model: string, value: string | []) {
            console.log(model, value);
            this[model] = value;
            return true;
        },
        copyMe() {
            this.$emit('copyToClipboard', this.text);
        },
    },
});
</script>

<template>
    <div class="content">
        <div>
            <label for="height">crontab </label>
            <input
                type="text"
                size="20"
                v-model="crontab"
            />
        </div>
        <div class="flex spaceEvenly">
            <CronChoices />
            <div class="left">
                Seconds:
                <radio-input
                    v-for="item in options"
                    model="seconds"
                    addClass="small"
                    :value="item"
                    :selected="seconds"
                    @radio-changed="changeRadio"
                />
                <div v-if="['recurring', 'exactly'].includes(seconds)">
                    <select multiple="true" size="12" v-model="secondsDetail">
                        <option v-for="index in 60" :value="index - 1">
                            {{ index - 1 }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="left">
                Minutes:
                <radio-input
                    v-for="item in options"
                    model="minutes"
                    addClass="small"
                    :value="item"
                    :selected="minutes"
                    @radio-changed="changeRadio"
                />
                <div v-if="['recurring', 'exactly'].includes(minutes)">
                    <select multiple="true" size="12" v-model="minutesDetail">
                        <option v-for="index in 60" :value="index - 1">
                            {{ index - 1 }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="left">
                Hours:
                <radio-input
                    v-for="item in options"
                    model="hours"
                    addClass="small"
                    :value="item"
                    :selected="hours"
                    @radio-changed="changeRadio"
                />
                <div v-if="hours === 'recurring'">
                    <select multiple="true" size="12" v-model="hoursDetail">
                        <option v-for="index in 24" :value="index - 1">
                            {{ index - 1 }}
                        </option>
                    </select>
                </div>
                <div v-if="hours === 'exactly'">
                    <select multiple="true" size="12" v-model="hoursDetail">
                        <option value="0">Midnight</option>
                        <option value="1">1am</option>
                        <option value="2">2am</option>
                        <option value="3">3am</option>
                        <option value="4">4am</option>
                        <option value="5">5am</option>
                        <option value="6">6am</option>
                        <option value="7">7am</option>
                        <option value="8">8am</option>
                        <option value="9">9am</option>
                        <option value="10">10am</option>
                        <option value="11">11am</option>
                        <option value="12">noon</option>
                        <option value="13">1pm</option>
                        <option value="14">2pm</option>
                        <option value="15">3pm</option>
                        <option value="16">4pm</option>
                        <option value="17">5pm</option>
                        <option value="18">6pm</option>
                        <option value="19">7pm</option>
                        <option value="20">8pm</option>
                        <option value="21">9pm</option>
                        <option value="22">10pm</option>
                        <option value="23">11pm</option>
                    </select>
                </div>
            </div>
            <div class="left">
                Days:
                <radio-input
                    v-for="item in options"
                    model="days"
                    addClass="small"
                    :value="item"
                    :selected="days"
                    @radio-changed="changeRadio"
                />
                <div v-if="['recurring', 'exactly'].includes(days)">
                    <select multiple="true" size="12" v-model="daysDetail">
                        <option v-for="index in 32" :value="index - 1">
                            {{ index - 1 }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="left">
                Months:
                <radio-input
                    v-for="item in options"
                    model="months"
                    addClass="small"
                    :value="item"
                    :selected="months"
                    @radio-changed="changeRadio"
                />
                <div v-if="months === 'recurring'">
                    <select multiple="true" size="12" v-model="monthsDetail">
                        <option v-for="index in 13" :value="index - 1">
                            {{ index - 1 }}
                        </option>
                    </select>
                </div>
                <div v-if="months === 'exactly'">
                    <select
                        class="overflowHidden"
                        multiple="true"
                        size="12"
                        v-model="monthsDetail"
                    >
                        <option value="1">JAN</option>
                        <option value="2">FEB</option>
                        <option value="3">MAR</option>
                        <option value="4">APR</option>
                        <option value="5">MAY</option>
                        <option value="6">JUN</option>
                        <option value="7">JUL</option>
                        <option value="8">AUG</option>
                        <option value="9">SEP</option>
                        <option value="10">OCT</option>
                        <option value="11">NOV</option>
                        <option value="12">DEC</option>
                    </select>
                </div>
            </div>
            <div class="left">
                Weekday:
                <radio-input
                    v-for="item in options.filter((e) => e !== 'recurring')"
                    model="weekdays"
                    addClass="small"
                    :value="item"
                    :selected="weekdays"
                    @radio-changed="changeRadio"
                />
                <div v-if="weekdays === 'exactly'">
                    <select
                        class="overflowHidden"
                        multiple="true"
                        size="7"
                        v-model="weekdaysDetail"
                    >
                        <option value="0">SUN</option>
                        <option value="1">MON</option>
                        <option value="2">TUE</option>
                        <option value="3">WED</option>
                        <option value="4">THU</option>
                        <option value="5">FRI</option>
                        <option value="6">SAT</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/input_range.scss';
@import '@/assets/scss/input_radio.scss';

input[type='radio'] + label {
    font-size: 0.7em;
}
select {
    font-size: 1em;
}
option {
    font-size: 0.5em;
}
select.overflowHidden {
    overflow: hidden;
}

.flex {
    display: flex;
}
.flex.spaceEvenly > div {
    width: 16.6667%;
}

.left {
    text-align: left;
}
.right {
    text-align: right;
}
</style>
