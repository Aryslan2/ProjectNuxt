<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Edit Company</h1>
			<nuxt-link to="/admin/company">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Company name:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item prop="text">
			<p>Company activity:</p>
			<el-input resize="none" v-model="controls.text" />
		</el-form-item>

		<el-form-item prop="bin">
			<p>BIN:</p>
			<el-input resize="none" v-model="controls.bin" />
		</el-form-item>

		<el-form-item prop="kato">
			<p>KATO:</p>
			<el-input resize="none" v-model="controls.kato" />
		</el-form-item>

		<el-form-item prop="address">
			<p>Company address:</p>
			<el-input resize="none" v-model="controls.address" />
		</el-form-item>

		<el-form-item prop="director">
			<p>Director:</p>
				<el-input resize="none" v-model="controls.director" />
		</el-form-item>

		<el-form-item prop="email">
			<p>Company email:</p>

			<el-input resize="none" v-model="controls.email" />
		</el-form-item>

		<el-form-item prop="phone">
			<p>Company phone number:</p>
			<el-input resize="none" v-model="controls.phone" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Update Company</el-button>
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
		const company = await store.dispatch('company/fetchAdminById', params.id)
		return {company}
	},

	mounted() {
		this.controls.name = this.company.name
		this.controls.text = this.company.text
		this.controls.bin = this.company.bin
		this.controls.kato = this.company.kato
		this.controls.address = this.company.address
		this.controls.director = this.company.director
		this.controls.email = this.company.email
		this.controls.phone = this.company.phone
	},

	data() {
		return {
			loading: false,
			controls: {
				name: '',
				text: '',
				bin: '',
				kato: '',
				address: '',
				director: '',
				email: '',
				phone: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input company name', trigger: 'blur' }
          ],
          text: [
            { required: true, message: 'Please input company activity', trigger: 'blur' }
          ],
					bin: [
            { required: true, message: 'Please input company BIN', trigger: 'blur' }
          ],
					kato: [
            { required: true, message: 'Please input company KATO', trigger: 'blur' }
          ],
					address: [
            { required: true, message: 'Please input company address', trigger: 'blur' }
          ],
					director: [
            { required: true, message: 'Please input info director', trigger: 'blur' }
          ],
					email: [
            { required: true, message: 'Please input company email', trigger: 'blur' }
          ],
					phone: [
            { required: true, message: 'Please input company phone', trigger: 'blur' }
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
						text: this.controls.text,
						bin: this.controls.bin,
						kato: this.controls.kato,
						address: this.controls.address,
						director: this.controls.director,
						email: this.controls.email,
						phone: this.controls.phone,
						id: this.company._id
					}

					try {
						await this.$store.dispatch('company/update',formData)
						this.$message.success('Company updated')
						this.loading = false
						this.$router.push('/admin/company')
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