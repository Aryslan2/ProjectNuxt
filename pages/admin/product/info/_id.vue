<template>
  <el-form class="card-in-card" style="max-width: 800px; margin: 0 auto;">
    <div class="header">
      <h1>Product Information</h1>
      <nuxt-link to="/admin/product" class="back-link">
        <i class="el-icon-back"></i> Back
      </nuxt-link>
    </div>
		<div class="info">
			<div><span class="m-text">Name: </span>{{ product.name }}</div>
			<div><span class="m-text">Characteristic:</span><br><div style="white-space: pre-wrap;">{{ product.characteristic }}</div></div>
			<div><span class="m-text">Barcode: </span>{{ product.barcode }}</div>
		</div>
  </el-form>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	async asyncData({store, params}) {
		const product = await store.dispatch('product/fetchAdminById', params.id)
		return {product}
	},


	data() {
		return {
			loading: false,
			controls: {
				name: '',
				characteristic: '',
				barcode: ''
			},
		}
	},
}
</script>

<style scoped>
	.card-in-card {
		background-color: #f7f7f7;
		padding: 20px;
		border-radius: 10px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.back-link {
		text-decoration: none;
		color: #333;
	}

	.back-link:hover {
		color: #000;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.m-text {
		font-weight: bold;
	}
</style>