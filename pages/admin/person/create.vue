<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Create Person</h1>
			<nuxt-link to="/admin/person">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="first_name">
			<p>First name:</p>
			<el-input v-model="controls.first_name" />
		</el-form-item>

		<el-form-item prop="last_name">
			<p>Last name:</p>
			<el-input resize="none" v-model="controls.last_name" />
		</el-form-item>

		<el-form-item prop="company">
        <p>Department:</p>
        <el-select v-model="controls.department" placeholder="Select">
            <el-option
              v-for="department in departments"
              :key="department._id" 
              :label="department.name"
              :value="department._id"
						> 
            </el-option>
        </el-select>
    </el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Create Person</el-button>
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
		const departments = await store.dispatch('department/fetchAdmin')
		return {departments}
	},

	data() {
		return {
			loading: false,
			controls: {
				first_name: '',
				last_name: '',
				department: '',
			},

			rules: {
          first_name: [
            { required: true, message: 'Please input first name', trigger: 'blur' }
          ],
					last_name: [
            { required: true, message: 'Please input last name', trigger: 'blur' }
          ],
					department: [
            { required: true, message: 'Please select department', trigger: 'blur' }
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
							first_name: this.controls.first_name,
							last_name: this.controls.last_name,
							department: this.controls.department,
						}

						try {
							const newPerson = await this.$store.dispatch('person/create', formData)
							this.$message.success('Person created')
							this.$emit('created', newPerson)
							this.$router.push('/admin/person')
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