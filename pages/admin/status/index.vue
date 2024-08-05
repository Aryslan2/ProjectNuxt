<template>
	<div>
		<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
			<div class="thisT">
				<h1>Create Status</h1>
			</div>

			<el-form-item class="input-text" prop="name">
				<p>Status:</p>
				<el-input v-model="controls.name" />
			</el-form-item>

			<el-form-item>
				<el-button type="success" round native-type="submit" :loading="loading">Create Status</el-button>
			</el-form-item>
		</el-form>
		<h2 class="statuses">Statuses</h2>
		<el-table
			:data="statuses"
			style="width: 100%">
			<el-table-column 
			prop="name"
			label="Status"
			/>
			<el-table-column 
			prop="_id"
			label="id"
			/>
			<el-table-column label="Actions">
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="edit person" placement="top">
						<el-button
							icon="el-icon-edit"
							type="primary"
							circle
							@click="open(row._id)" 
						/>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="remove person" placement="top">
						<el-button
							icon="el-icon-delete"
							type="danger"
							circle
							@click="remove(row._id)" 
						/>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
	</div>
	
</template>

<script>
export default {
	layout: 'admin',
  middleware: ['admin-auth'],
	async asyncData({store}) {
		const statuses = await store.dispatch('status/fetchAdmin')
		return {statuses}
	},

	props: {
	},

	data() {
		return {
			loading: false,
			controls: {
				name: '',
			},

			rules: {
          name: [
            { required: true, message: 'Please input status name', trigger: 'blur' }
          ],
        }
		}
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async valid => {
          if (valid) {
						this.loading = true
            
						const formData = {
							name: this.controls.name,
						}

						try {
							const newStatus = await this.$store.dispatch('status/create', formData)
							this.$message.success('Status created')
							this.$emit('created', newStatus)
							this.$router.go();
						} catch(e) {
							this.loading = false
						}
          } 
        });
		},

		open(id) {
        this.$router.push(`/admin/status/${id}`)
    },

		async remove(id) {
			try {
				await this.$confirm('Delete status?', 'Warning!', {
					confirmButtonText: 'Yes',
					cancelButtonText: 'Cancel',
					type: 'warning'
				})
				await this.$store.dispatch('status/remove', id)
				this.statuses = this.statuses.filter(p => p._id !== id)

				this.$message.success('Status deleted')
			} catch (e) {

			}
		}
	}
}
</script>

<style scoped>
.thisT {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.statuses {
	padding-top: 30px;
}
</style>