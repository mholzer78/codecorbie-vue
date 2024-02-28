<script lang="ts">
import { hex2rgb } from '@/assets/ts/color';
import { rgb2hex } from '@/assets/ts/color';
import { defineComponent, withCtx } from 'vue';

export default defineComponent({
	data() {
		return {
            hostname: window.location.hostname,
            colorHexUrl: '#0000FF',
			colorHex: '#0000FF',
			colorRGB: [0, 0, 255],
			color: 1020,
			width: 400,
			height: 200,
			satiation: '20',
			colorRGBArray: [0, 0, 0, 1],
			textColor: '',
            pauseUpdate: true,
            directDownload: false,
		};
	},
	mounted() {
		let SourceCode = new FontFace(
			'SourceCode',
			'url("/assets/fonts/sourceCode/SourceCodePro-Regular.otf")'
		);
		SourceCode.load().then((font) => {
			document.fonts.add(font);

            this.pauseUpdate = false;

			this.updateCanvas();

            if (this.directDownload) {
                this.downloadMe();
            }
		});
	},
	beforeMount() {
        const paramWidth = <string>this.$route.params.width;
        const paramHeight = <string>this.$route.params.height;
        const paramColor = <string>this.$route.params.color;
        this.directDownload = paramWidth !== '' && paramHeight !== '' && !isNaN(parseFloat(paramWidth)) && !isNaN(parseFloat(paramHeight));

        if (this.directDownload) {
            this.width = +this.$route.params.width;
            this.height = +this.$route.params.height;
            if (paramColor.match(/[0-9A-Fa-f]{6}/g)) {
                this.colorHex = '#' + paramColor;
            } else {
                this.colorHex = '#000000';
            }
        }
    },
	watch: {
		colorHex() {
			this.updateCanvas();
		},
		color() {
			this.updateCanvas();
		},
		satiation() {
			this.updateCanvas();
		},
		width() {
			this.updateCanvas();
		},
		height() {
			this.updateCanvas();
		},
	},
	methods: {
		updateCanvas() {
            if (this.pauseUpdate) { return; };
            const canvas = document.querySelector('#canvasPreview')! as HTMLCanvasElement;
            canvas.width = +this.width;
            canvas.height = +this.height;
			this.colorRGB = hex2rgb(this.colorHex.split('').splice(1, 6));
            this.colorHexUrl = this.colorHex.slice(1);
			var o = Math.round(
				(this.colorRGB[0] * 299 +
					this.colorRGB[1] * 587 +
					this.colorRGB[2] * 114) /
					1000
			);

			if (o > 125) {
				this.textColor = 'black';
			} else {
				this.textColor = 'white';
			}
			this.fillCanvas(
				canvas,
				true,
				this.colorRGB,
				this.textColor,
				+this.width,
				+this.height,
			);
		},
		mathInRange(value: number, relation: number, margin: number) {
			if (value >= relation - margin && value <= relation + margin) {
				return true;
			}
			return false;
		},
		fillCanvas(
			canvas: HTMLCanvasElement,
			preview: boolean,
			colorArray: number[],
			textColor: string,
			width: number,
			height: number,
		) {
			let fontSize = width / 20;
			if (fontSize < 20) {
				fontSize = 20;
			}
            const ctx = canvas.getContext('2d')!;

			ctx.clearRect(0, 0, width, height);

			ctx.beginPath();
			ctx.rect(0, 0, width, height);
			ctx.fillStyle = parseInt(this.satiation) < 0 ? 'black' : 'white';
			ctx.fill();

			ctx.beginPath();
			ctx.rect(0, 0, width, height);
			ctx.fillStyle = 'rgba(' + colorArray.join(',') + ')';
			ctx.fill();

			ctx.font = fontSize + 'px SourceCode, monospace';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = textColor;
			ctx.fillText(
				this.width.toString() + 'px',
				width / 2,
				height / 2 - fontSize
			);
			ctx.fillText('x', width / 2, height / 2);
			ctx.fillText(
				this.height.toString() + 'px',
				width / 2,
				height / 2 + fontSize
			);

			if (!preview) {
				let img = <HTMLImageElement>document.getElementById('corbie')!;
				// 550 x 640
				let imgSize = {
					width: (11 * width) / 100,
					height: (12.8 * width) / 100,
				};
				ctx.drawImage(
					img,
					width - imgSize.width - 10,
					height - imgSize.height - 10,
					imgSize.width,
					imgSize.height
				);
			}
		},
		downloadMe() {
            const canvasForDownload = document.querySelector('#canvasForDownload')! as HTMLCanvasElement;
			this.fillCanvas(
				canvasForDownload as HTMLCanvasElement,
				false,
				this.colorRGB,
				this.textColor,
				+this.width,
				+this.height
			);
            const ctx = canvasForDownload.getContext('2d')!;
			const image = canvasForDownload.toDataURL('image/png');
			var a = document.createElement('a');
			a.href = image;
			a.setAttribute(
				'download',
				this.width.toString() + 'x' + this.height.toString() + '_' + rgb2hex(this.colorRGB) + '_codecorbie'
			);
			a.click();
		},
	},
});
</script>

<template>
	<div class="content">
        <div>
            In the preview below, only the ratio is updated accordingly, the size of the preview is limited.
        </div>
		<div class="imagePreview">
			<canvas id="canvasPreview" width="800" height="200"></canvas>
		</div>
		<div class="flex">
			<div class="flex">
				<label for="colorPicker">Color </label>
				<input type="color" id="colorPicker" v-model="colorHex" />
			</div>
			<div>
				<div>
					<label for="width">Width </label>
					<input
						type="number"
						size="4"
						min="100"
						max="1920"
						v-model="width"
					/>
					<input
						type="range"
						min="100"
						max="1920"
						class="slider"
						id="width"
						v-model="width"
					/>
				</div>
			</div>
			<div>
				<div>
					<label for="height">Height </label>
					<input
						type="number"
						size="4"
						min="100"
						max="1920"
						v-model="height"
					/>
					<input
						type="range"
						min="100"
						max="1920"
						class="slider"
						id="height"
						v-model="height"
					/>
				</div>
			</div>
			<div>
                <multi-button icon="download" @click="downloadMe" />
			</div>
		</div>
        <div>
            For direct download try entering https://{{hostname}}/lorem-image/{{width}}/{{height}}/{{colorHexUrl}}
        </div>
		<div>
			<canvas
				id="canvasForDownload"
				:width="width"
				:height="height"
			></canvas>
			<img src="/assets/img/corbie.svg" id="corbie" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/partials/fonts';
@import '@/assets/scss/input_range.scss';
@import '@/assets/scss/input_checkbox.scss';

.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.left {
	text-align: left;
}
.right {
	text-align: right;
}
canvas {
	border: 1px solid black;
}
.imagePreview {
    height: 300px;
}
#canvasPreview {
    max-width: 600px;
    max-height: 300px;
}
#canvasForDownload,
#corbie {
	display: none;
}
#width,
#height {
	width: 10rem;
}
.icon-download {
	display: flex;
	align-items: center;
	padding: 0.25rem;
	width: 3rem;
	height: 3rem;
	background-color: var(--colorHighlight);
	border-radius: 50%;
	font-size: 2rem;
}

input[type='color'] {
	-webkit-appearance: none;
	margin-left: 1rem;
	padding: 0;
	border: none;
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
}
input[type='color']::-webkit-color-swatch {
	border: none;
	border-radius: 50%;
	padding: 0;
}
input[type='color']::-webkit-color-swatch-wrapper {
	border: none;
	border-radius: 50%;
	padding: 0;
}
</style>
