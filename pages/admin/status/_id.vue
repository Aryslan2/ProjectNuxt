<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Edit Status</h1>
			<nuxt-link to="/admin/status">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Status:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Update</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	validate({ params }) {
		return true
	},
	async asyncData({store, params}) {
		const status = await store.dispatch('status/fetchAdminById', params.id)
		return {status}
	},

	mounted() {
		this.controls.name = this.status.name
	},

	data() {
		return {
			loading: false,
			controls: {
				name: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input status name', trigger: 'blur' }
          ]
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
						id: this.status._id
					}

					try {
						await this.$store.dispatch('status/update',formData)
						this.$message.success('Status updated')
						this.loading = false
						this.$router.push('/admin/status')
					} catch (e) {
						this.loading = false
					}
				}
			})
		}
	}
}
</script>

<style scoped>
.thisT {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>