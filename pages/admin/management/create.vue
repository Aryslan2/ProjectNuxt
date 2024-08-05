<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Create</h1>
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
        <el-select v-model="controls.status" placeholder="Select">
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
			<el-button type="primary" round native-type="submit" :loading="loading">Create</el-button>
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
		try {
			const persons = await store.dispatch('person/fetchAdmin');
			const products = await store.dispatch('product/fetchAdminFree');
			const statuses = await store.dispatch('status/fetchAdmin');

			console.log('Persons:', persons); 
			console.log('Products:', products);
			console.log('Statuses:', statuses); 

			return { persons, products, statuses };
		} catch (error) {
			console.error('Error fetching data:', error); 
			throw error;
		}
	},

	data() {
		return {
			loading: false,
			controls: {
				product: '',
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
					description: [],
  				issue: [] 
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

		onSubmit() {
			this.$refs.form.validate(async valid => {
          if (valid) {
						this.loading = true

						const personValue = this.controls.person === '' ? null : this.controls.person;
						

						const formData = {
							product: this.controls.product,
							status: this.controls.status,
							description: this.controls.description,
							issue: this.controls.issue,
							person: personValue,
						}

						try {
							const newManagement = await this.$store.dispatch('management/create', formData)
							this.$message.success('Created')
							this.$emit('created', newManagement)
							this.$router.push('/admin/management')
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