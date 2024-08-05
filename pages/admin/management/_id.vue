<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Update</h1>
			<nuxt-link to="/admin/management">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item prop="product">
        <p>Product:</p>
        <el-select v-model="controls.product" placeholder="Select">
            <el-option
              v-for="product in products"
              :key="product._id" 
              :label="`${product.name}`"
              :value="product._id"
						> 
            </el-option>
        </el-select>
    </el-form-item>

		<el-form-item prop="person">
        <p>Product user:</p>
        <el-select v-model="controls.person" placeholder="Select">
            <el-option
              v-for="person in persons"
              :key="person._id" 
              :label="`${person.first_name} ${person.last_name}`"
              :value="person._id"
						> 
            </el-option>
						<el-option
							label="None" 
							:value="''"
						> 
						</el-option>
        </el-select>
    </el-form-item>

		<el-form-item prop="status">
        <p>Status:</p>
        <el-select v-model="controls.status" placeholder="Select" @change="handleStatusChange">
            <el-option
              v-for="status in statuses"
              :key="status._id" 
              :label="`${status.name}`"
              :value="status._id"
						> 
            </el-option>
        </el-select>
    </el-form-item>

		<el-form-item class="input-text" prop="description">
			<p>Description:</p>
			<el-input type="textarea" resize="none" :rows="10" v-model="controls.description" />
		</el-form-item>

		<el-form-item v-if="isStatusRequiresIssue(controls.status)" prop="issue">
			<p>Product issue:</p>
			<el-input type="textarea" resize="none" :rows="10" v-model="controls.issue" />
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
		const management = await store.dispatch('management/fetchAdminById', params.id)
		const persons = await store.dispatch('person/fetchAdmin')
		const products = await store.dispatch('product/fetchAdminFree')
		const statuses = await store.dispatch('status/fetchAdmin')
		return {management, persons, products, statuses}
	},

	mounted() {
		this.controls.product = this.management.products
		this.controls.person = this.management.persons
		this.controls.status = this.management.statuses
		this.controls.description = this.management.description
		this.controls.issue = this.management.issue
	},

	data() {
		return {
			loading: false,
			controls: {
				product: '',
				person: '',
				status: '',
				description: '',
				issue: ''
			},

			rules: {
					product: [
            { required: true, message: 'Please select product', trigger: 'blur' }
          ],
					status: [
            { required: true, message: 'Please select product status', trigger: 'blur' }
          ],
        }
		}
	},

	methods: {
		getStatusById(statusId) {
    return this.statuses.find(status => status._id === statusId);
  	},

		isStatusRequiresIssue(statusId) {
    const status = this.getStatusById(statusId);
    return status && (status.name === 'Under Repair' || status.name === 'Faulty ');
  	},

		handleStatusChange() {
      const selectedStatus = this.statuses.find(status => status._id === this.controls.status);  

      if (selectedStatus && ['Under Repair', 'Faulty'].includes(selectedStatus.name)) {
      } else {
        this.controls.issue = '';
      }
    },
		
		onSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					this.loading = true

					const personValue = this.controls.person === '' ? null : this.controls.person;

					const formData = {
						products: this.controls.product,
						statuses: this.controls.status,
						persons: personValue,
						description: this.controls.description,
						issue: this.controls.issue,
						id: this.management._id
					}

					try {
						await this.$store.dispatch('management/update',formData)
						this.$message.success('Updated')
						this.loading = false
						this.$router.push('/admin/management')
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