<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Create Company</h1>
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
			<p>
				<el-input resize="none" v-model="controls.director" />
			</p>
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
			<el-button type="primary" round native-type="submit" :loading="loading">Create Company</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	layout: 'admin',
  middleware: ['admin-auth'],

	props: {
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
						}

						try {
							const newCompany = await this.$store.dispatch('company/create', formData)
							this.$message.success('Company created')
							this.$emit('created', newCompany)
							this.$router.push('/admin/company')
						} catch(e) {
							this.loading = false
						}
          } 
        });
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

</style>