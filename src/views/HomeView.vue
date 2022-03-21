<script setup lang="ts">
console.log('console.greet("Hello CodeCorbie");');
</script>

<template>
	<div class="content">
		<h3>console.greet("Hello CodeCorbie");</h3>
		<p>CodeCorbie wants to be your best buddy when you need to quickly:</p>
		<div class="cardWrapper">
			<div>
				generate passwords of any length and complexity
				<p class="small">
					including A-Z, a-z, 1-9 and a lot of special signs to make
					your password secure
				</p>
			</div>
			<div>
				convert between HEX, RGB, CMYK, HSV(HUE)
				<p class="small">
					including HEX2RGB, RGB2HEX, RGB2HSV, HSV2RGB, RGB2CMYK,
					CMYK2RGB, and all the other ways around
				</p>
			</div>
			<div>and many more tools are currently under development</div>
		</div>

		<div class="cardSummary">All in one place!</div>
		<p class="small">
			To make things easy and secure you can click the
			<i class="icon-docs" aria-hidden="true"></i>
			to simply copy the password or the color to the clipboard.
		</p>

		<p class="small">
			Now check out the available tools and give Corbie a chance to become
			your best buddy whenever you code.
		</p>
	</div>
</template>

<style scoped lang="scss">
.corbie {
	height: 1.5em;
	margin-bottom: -0.4em;
}
h3 {
	margin-top: 0;
}
.cardWrapper {
	display: flex;
	> div {
		width: 33%;
		padding: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.26);
		&:not(:first-child) {
			margin-left: 0.5rem;
		}
		&:not(:last-child) {
			margin-right: 0.5rem;
		}
	}
}
.cardSummary {
	padding: 0.5rem;

	border: 1px solid rgba(0, 0, 0, 0.26);
}
</style>
