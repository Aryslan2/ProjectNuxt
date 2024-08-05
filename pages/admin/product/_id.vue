<template>
	<el-form class="card-in-card" @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" style="width: 500px;">
		<div class="thisT">
			<h1>Edit Product</h1>
			<nuxt-link to="/admin/product">
				<i class="el-icon-back"></i>
			</nuxt-link>
		</div>

		<el-form-item class="input-text" prop="name">
			<p>Name:</p>
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item prop="characteristic">
			<p>Characteristic:</p>
			<el-input type="textarea" resize="none" :rows="10" v-model="controls.characteristic" />
		</el-form-item>
	
		<el-form-item label="Barcode" prop="barcode">
      <el-input v-model="controls.barcode" />
    </el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Update Product</el-button>
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
		const product = await store.dispatch('product/fetchAdminById', params.id)
		return {product}
	},

	mounted() {
		this.controls.name = this.product.name
		this.controls.characteristic = this.product.characteristic
		this.controls.barcode = this.product.barcode
	},

	data() {
		return {
			loading: false,
			controls: {
				name: '',
				characteristic: '',
				barcode: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input product info', trigger: 'blur' }
          ],
					characteristic: [
            { required: true, message: 'Please input product characteristic', trigger: 'blur' }
          ],
					barcode: [
          { required: true, message: 'Please input product barcode', trigger: 'blur' },
          { validator: this.validateBarcode, trigger: 'blur' } 
        ],
        }
		}
	},

	methods: {
		handlePersonChange(value) {
        this.controls.person = value === "null" ? null : value;
    },

		onSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					this.loading = true

					const formData = {
						name: this.controls.name,
						characteristic: this.controls.characteristic,
						barcode: this.controls.barcode,
						id: this.product._id
					}

					try {
						await this.$store.dispatch('product/update',formData)
						this.$message.success('Product updated')
						this.loading = false
						this.$router.push('/admin/product')
					} catch (e) {
						this.loading = false
					}
				}
			})
		},

		validateBarcode(rule, value, callback) {
      const valid = /^\d{13}$/.test(value);

      if (!valid) {
        callback(new Error('Barcode must be exactly 13 digits'));
      } else {
        callback();
      }
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