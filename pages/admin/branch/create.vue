<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Create Branch</h1>
			<nuxt-link to="/admin/branch">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Branch name:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item prop="address">
			<p>Branch address:</p>
			<el-input resize="none" v-model="controls.address" />
		</el-form-item>

		<el-form-item prop="phone">
			<p>Branch phone number:</p>
			<el-input resize="none" v-model="controls.phone" />
		</el-form-item>

		<el-form-item prop="email">
			<p>Branch email:</p>
			<el-input resize="none" v-model="controls.email" />
		</el-form-item>
		
		<el-form-item prop="company">
        <p>Company:</p>
        <el-select v-model="controls.company" placeholder="Select">
            <el-option
              v-for="company in companies"
              :key="company._id" 
              :label="company.name"
              :value="company._id"
						> 
            </el-option>
        </el-select>
    </el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Create Branch</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	layout: 'admin',
  middleware: ['admin-auth'],

	props: {
	},
	
	async asyncData({store}) {
		const companies = await store.dispatch('company/fetchAdmin')
		return {companies}
	},
	data() {
		return {
			loading: false,
			controls: {
				name: '',
				address: '',
				email: '',
				phone: '',
				company: '',
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
					company: [
            { required: true, message: 'Please select company', trigger: 'blur' }
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
							company: this.controls.company,
						}

						try {
							const newBranch = await this.$store.dispatch('branch/create', formData)
							this.$message.success('Branch created')
							this.$emit('created', newBranch)
							this.$router.push('/admin/branch')
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