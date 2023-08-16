<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

});
</script>

<template>

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
