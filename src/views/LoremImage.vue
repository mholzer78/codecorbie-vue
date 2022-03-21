<script lang="ts">
import { hex2rgb } from '@/assets/ts/color';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			canvas: {} as CanvasRenderingContext2D,
			canvasForDownload: {} as CanvasRenderingContext2D,
			colorHex: '#0000FF' as string,
			colorRGB: [0, 0, 255] as number[],
			color: 1020 as number,
			width: 400,
			height: 200,
			satiation: '20',
			colorRGBArray: [0, 0, 0, 1] as number[],
			textColor: '',
		};
	},
	mounted() {
		let SourceCodePro = new FontFace(
			'SourceCodePro',
			'url("/assets/fonts/sourcecodepro/SourceCodePro-Regular.otf")'
		);
		SourceCodePro.load().then((font) => {
			document.fonts.add(font);
			this.canvas = <CanvasRenderingContext2D>(
				(<HTMLCanvasElement>(
					document.querySelector('#canvasPreview')!
				)).getContext('2d')
			);

			this.canvasForDownload = <CanvasRenderingContext2D>(
				(<HTMLCanvasElement>(
					document.querySelector('#canvasForDownload')!
				)).getContext('2d')
			);
			this.updateCanvas();
		});
	},
	beforeMount() {},
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
			this.colorRGB = hex2rgb(this.colorHex.split('').splice(1, 6));
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
				this.canvas,
				true,
				this.colorRGB,
				this.textColor,
				800,
				200
			);
		},
		mathInRange(value: number, relation: number, margin: number) {
			if (value >= relation - margin && value <= relation + margin) {
				return true;
			}
			return false;
		},
		fillCanvas(
			canvas: CanvasRenderingContext2D,
			preview: boolean,
			colorArray: number[],
			textColor: string,
			width = 800,
			height = 200
		) {
			let fontSize = width / 20;
			if (fontSize < 20) {
				fontSize = 20;
			}
			canvas.clearRect(0, 0, width, height);

			canvas.beginPath();
			canvas.rect(0, 0, width, height);
			canvas.fillStyle = parseInt(this.satiation) < 0 ? 'black' : 'white';
			canvas.fill();

			canvas.beginPath();
			canvas.rect(0, 0, width, height);
			canvas.fillStyle = 'rgba(' + colorArray.join(',') + ')';
			canvas.fill();

			canvas.font = fontSize + 'px SourceCodePro, monospace';
			canvas.textAlign = 'center';
			canvas.textBaseline = 'middle';
			canvas.fillStyle = textColor;
			canvas.fillText(
				this.width.toString() + 'px',
				width / 2,
				height / 2 - fontSize
			);
			canvas.fillText('x', width / 2, height / 2);
			canvas.fillText(
				this.height.toString() + 'px',
				width / 2,
				height / 2 + fontSize
			);

			if (preview) {
				canvas.font = '1rem sans-serif';
				canvas.textAlign = 'right';
				canvas.textBaseline = 'top';
				canvas.fillStyle = textColor;
				canvas.fillText(
					'* Neither size or ratio are updated in the preview!',
					width - 10,
					10
				);
			} else {
				let img = <HTMLImageElement>document.getElementById('corbie')!;
				// 550 x 640
				let imgSize = {
					width: (11 * width) / 100,
					height: (12.8 * width) / 100,
				};
				canvas.drawImage(
					img,
					width - imgSize.width - 10,
					height - imgSize.height - 10,
					imgSize.width,
					imgSize.height
				);
			}
		},
		downloadMe() {
			this.fillCanvas(
				this.canvasForDownload,
				false,
				this.colorRGB,
				this.textColor,
				+this.width,
				+this.height
			);
			const image = this.canvasForDownload.canvas.toDataURL('image/png');
			var a = document.createElement('a');
			a.href = image;
			a.setAttribute(
				'download',
				this.width.toString() + 'x' + this.height.toString() + '_codecorbie'
			);
			a.click();
		},
	},
});
</script>

<template>
	<div class="content">
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
