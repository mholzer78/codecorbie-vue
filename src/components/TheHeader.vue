<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: ['route'],
});
</script>

<template>
	<header class="container">
		<div class="item">
			<img
				id="logo"
				:src="
					route === 'not-found' || route === 'bad-not-found'
						? '/assets/img/corbie.dull.svg'
						: '/assets/img/corbie.svg'
				"
				alt="CodeCorbie"
			/>
		</div>
		<div class="item dynFG">
			<h1 id="title">CodeCorbie</h1>
			<h2 id="slogan">developers best buddy</h2>
		</div>
	</header>
	<nav>
		<RouterLink to="/"
			><i class="icon-home" aria-hidden="true"></i
		></RouterLink>
		<RouterLink to="/color-convert">Color Convert</RouterLink>
		<RouterLink to="/password-generator">Password Generator</RouterLink>
		<RouterLink to="/permission-calculator">Permission Generator</RouterLink>
		<RouterLink to="/change-case">Change Case</RouterLink>
		<RouterLink to="/lorem-ipsum">Lorem Ipsum</RouterLink>
		<RouterLink to="/lorem-image">Lorem Image</RouterLink>
		<RouterLink to="/calculate-time">Calculate Time</RouterLink>
		<RouterLink to="/about">
			<i class="icon-help-circled" aria-hidden="true"></i>
		</RouterLink>
	</nav>
</template>

<style scoped lang="scss">
header {
    &.container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
    }
    #logo {
        height: 5rem;
    }
    #title,
    #slogan {
        margin: 0 auto;
    }
}
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    background-color: var(--colorText);
    a {
        text-decoration: none;
        font-size: 1rem;
        width: 7rem;
        padding: 0.5rem 1rem;
        color: white;
        border: 1px solid var(--colorHighlight);
        border-width: 0 1px;
        &.router-link-active {
            color: var(--colorHighlight);
        }
        &:not(.router-link-active):hover {
            opacity: 0.85;
        }
        &:first-child,
        &:last-child {
            font-size: 2rem;
        }
        &:first-child {
            border-left-width: 2px;
        }
        &:last-child {
            border-right-width: 2px;
        }
    }
}
</style>
