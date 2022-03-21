<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			ownerPermissions: ['', '', ''],
			groupPermissions: ['', '', ''],
			otherPermissions: ['', '', ''],
			shortString: '',
		};
	},
	beforeMount() {
		this.restoreSession();
	},
	computed: {
		permissionsLongString: function () {
			let tempArray = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
			if (this.ownerPermissions.includes('read')) {
				tempArray[1] = 'r';
			}
			if (this.ownerPermissions.includes('write')) {
				tempArray[2] = 'w';
			}
			if (this.ownerPermissions.includes('execute')) {
				tempArray[3] = 'x';
			}
			if (this.groupPermissions.includes('read')) {
				tempArray[4] = 'r';
			}
			if (this.groupPermissions.includes('write')) {
				tempArray[5] = 'w';
			}
			if (this.groupPermissions.includes('execute')) {
				tempArray[6] = 'x';
			}
			if (this.otherPermissions.includes('read')) {
				tempArray[7] = 'r';
			}
			if (this.otherPermissions.includes('write')) {
				tempArray[8] = 'w';
			}
			if (this.otherPermissions.includes('execute')) {
				tempArray[9] = 'x';
			}
			return tempArray.join('');
		},
	},
	methods: {
		restoreSession() {
			this.shortString = localStorage.getItem('permShort') || '000';
			this.handleInputShortString();
		},
		handleInputCheckboxes() {
			let tempArray = [0, 0, 0];
			if (this.ownerPermissions.includes('execute')) {
				tempArray[0] += 1;
			}
			if (this.ownerPermissions.includes('write')) {
				tempArray[0] += 2;
			}
			if (this.ownerPermissions.includes('read')) {
				tempArray[0] += 4;
			}
			if (this.groupPermissions.includes('execute')) {
				tempArray[1] += 1;
			}
			if (this.groupPermissions.includes('write')) {
				tempArray[1] += 2;
			}
			if (this.groupPermissions.includes('read')) {
				tempArray[1] += 4;
			}
			if (this.otherPermissions.includes('execute')) {
				tempArray[2] += 1;
			}
			if (this.otherPermissions.includes('write')) {
				tempArray[2] += 2;
			}
			if (this.otherPermissions.includes('read')) {
				tempArray[2] += 4;
			}
			this.shortString = tempArray.join('');
			localStorage.setItem('permShort', this.shortString);
		},
		handleInputShortString() {
			let tempArray = this.shortString.split('');
			this.ownerPermissions = [];
			this.groupPermissions = [];
			this.otherPermissions = [];
			tempArray.forEach((element, index) => {
				let elAsNumber = parseInt(element);
				let tempPrivArray = [];
				if (elAsNumber >= 4) {
					tempPrivArray.push('read');
					elAsNumber -= 4;
				}
				if (elAsNumber >= 2) {
					tempPrivArray.push('write');
					elAsNumber -= 2;
				}
				if (elAsNumber >= 1) {
					tempPrivArray.push('execute');
					elAsNumber -= 1;
				}
				switch (index) {
					case 0:
						this.ownerPermissions = tempPrivArray;
						break;
					case 1:
						this.groupPermissions = tempPrivArray;
						break;
					case 2:
						this.otherPermissions = tempPrivArray;
						break;
				}
			});
			localStorage.setItem('permShort', this.shortString);
		},
	},
});
</script>

<template>
	<div class="content">
		<table>
			<tbody>
				<tr>
					<td></td>
					<td>Read</td>
					<td>Write</td>
					<td>Execute</td>
				</tr>
				<tr>
					<td>Owner</td>
					<td>
						<input
							id="ownerRead"
							type="checkbox"
							value="read"
							v-model="ownerPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="ownerRead"></label>
					</td>
					<td>
						<input
							id="ownerWrite"
							type="checkbox"
							value="write"
							v-model="ownerPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="ownerWrite"></label>
					</td>
					<td>
						<input
							id="ownerExecute"
							type="checkbox"
							value="execute"
							v-model="ownerPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="ownerExecute"></label>
					</td>
				</tr>
				<tr>
					<td>Group</td>
					<td>
						<input
							id="groupRead"
							type="checkbox"
							value="read"
							v-model="groupPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="groupRead"></label>
					</td>
					<td>
						<input
							id="groupWrite"
							type="checkbox"
							value="write"
							v-model="groupPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="groupWrite"></label>
					</td>
					<td>
						<input
							id="groupExecute"
							type="checkbox"
							value="execute"
							v-model="groupPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="groupExecute"></label>
					</td>
				</tr>
				<tr>
					<td>Other</td>
					<td>
						<input
							id="otherRead"
							type="checkbox"
							value="read"
							v-model="otherPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="otherRead"></label>
					</td>
					<td>
						<input
							id="otherWrite"
							type="checkbox"
							value="write"
							v-model="otherPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="otherWrite"></label>
					</td>
					<td>
						<input
							id="otherExecute"
							type="checkbox"
							value="execute"
							v-model="otherPermissions"
							@change="handleInputCheckboxes"
						/>
						<label for="otherExecute"></label>
					</td>
				</tr>
			</tbody>
		</table>
		Permissions:
		<input
			type="text"
			maxlength="3"
			size="3"
			v-model="shortString"
			@input="handleInputShortString"
		/>
		<input
			type="text"
			maxlength="10"
			size="10"
			disabled
			v-model="permissionsLongString"
		/>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/table.scss';
@import '@/assets/scss/input_checkbox.scss';
</style>
