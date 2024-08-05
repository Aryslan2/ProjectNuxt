<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Create Department</h1>
			<nuxt-link to="/admin/department">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Department name:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item prop="phone">
			<p>Department phone number:</p>
			<el-input resize="none" v-model="controls.phone" />
		</el-form-item>

		<el-form-item prop="email">
			<p>Department email:</p>
			<el-input resize="none" v-model="controls.email" />
		</el-form-item>

		<el-form-item prop="company">
        <p>Branches:</p>
        <el-select v-model="controls.branch" placeholder="Select">
            <el-option
              v-for="branch in branches"
              :key="branch._id" 
              :label="branch.name"
              :value="branch._id"
						> 
            </el-option>
        </el-select>
    </el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Create Department</el-button>
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
		const branches = await store.dispatch('branch/fetchAdmin')
		return {branches}
	},

	data() {
		return {
			loading: false,
			controls: {
				name: '',
				email: '',
				phone: '',
				branch: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input department name', trigger: 'blur' }
          ],
					email: [
            { required: true, message: 'Please input department email', trigger: 'blur' }
          ],
					phone: [
            { required: true, message: 'Please input department phone', trigger: 'blur' }
          ],
					branch: [
            { required: true, message: 'Please select department branch', trigger: 'blur' }
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
							email: this.controls.email,
							phone: this.controls.phone,
							branch: this.controls.branch,
						}

						try {
							const newDepartment = await this.$store.dispatch('department/create', formData)
							this.$message.success('Department created')
							this.$emit('created', newDepartment)
							this.$router.push('/admin/department')
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