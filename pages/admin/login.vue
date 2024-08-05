<template>
	<el-card shadow="always" :style="{width: '500px'}">
		<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
			<div class="thisT">
				<h2>Admin Login</h2>
				<nuxt-link to="/">
        	<i class="el-icon-back"></i>
      	</nuxt-link>
			</div>

			<el-form-item label="Login" prop="login">
				<el-input v-model.trim="controls.login" />
			</el-form-item>

			<div class="mb2">
				<el-form-item label="Password" prop="password">
					<el-input v-model.trim="controls.password" type="password"/>
				</el-form-item>
			</div>
			
			<el-form-item>
				<el-button type="primary" round native-type="submit" :loading="loading">Sign in</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
export default {
	layout: 'empty',
	data() {
		return {
			loading: false,
			controls: {
				login: '',
				password: ''
			},

			rules: {
          login: [
            { required: true, message: 'Please input login', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
						{ min: 6, message: 'Password must be at least 6 characters long', trigger: "blur" }
          ],
      }
		}
	},
	mounted() {
		const {message} = this.$route.query

		switch (message) {
			case 'login':
				this.$message.info('Firs login in system!')
				break
			case 'logout':
				this.$message.info('Logout in system!')
				break
			case 'session':
				this.$message.warning('Session time out')
				break
		}
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					this.loading = true

					try {
						const formData = {
							login: this.controls.login,
							password: this.controls.password
						}

						await this.$store.dispatch('auth/login', formData)
						console.log(formData);
						this.$router.push('/admin')
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
  justify-content: space-between;
  align-items: center;
}
</style>
