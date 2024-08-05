<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Edit Branch</h1>
			<nuxt-link to="/admin/branch">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Name:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item prop="address">
			<p>Address:</p>
			<el-input resize="none" v-model="controls.address" />
		</el-form-item>

		<el-form-item prop="email">
			<p>Email:</p>
			<el-input resize="none" v-model="controls.email" />
		</el-form-item>

		<el-form-item prop="phone">
			<p>Phone number:</p>
			<el-input resize="none" v-model="controls.phone" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Update Branch</el-button>
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
		const branch = await store.dispatch('branch/fetchAdminById', params.id)
		return {branch}
	},

	mounted() {
		this.controls.name = this.branch.name
		this.controls.address = this.branch.address
		this.controls.email = this.branch.email
		this.controls.phone = this.branch.phone
	},

	data() {
		return {
			loading: false,
			controls: {
				name: '',
				address: '',
				email: '',
				phone: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input branch name', trigger: 'blur' }
          ],
					address: [
            { required: true, message: 'Please input branch address', trigger: 'blur' }
          ],
					email: [
            { required: true, message: 'Please input branch email', trigger: 'blur' }
          ],
					phone: [
            { required: true, message: 'Please input branch phone', trigger: 'blur' }
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
						address: this.controls.address,
						email: this.controls.email,
						phone: this.controls.phone,
						id: this.branch._id
					}

					try {
						await this.$store.dispatch('branch/update',formData)
						this.$message.success('Branch updated')
						this.loading = false
						this.$router.push('/admin/branch')
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