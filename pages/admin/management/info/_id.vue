<template>
  <el-form class="card-in-card" style="max-width: 800px; margin: 0 auto;">
    <div class="header">
      <h1>Information</h1>
      <nuxt-link to="/admin/management" class="back-link">
        <i class="el-icon-back"></i> Back
      </nuxt-link>
    </div>
		<div class="info">
			<div><span class="m-text">Product: </span>
				{{ management.products.name ? management.products.name : "None" }}
			</div>
			<div><span class="m-text">Product barcode: </span>
				{{ management.products.barcode ? management.products.barcode : 'None' }}
			</div>
			<div><span class="m-text">User: </span> 
				{{ management.persons && management.persons.first_name && management.persons.last_name 
				? management.persons.first_name + ' ' + management.persons.last_name 
				: 'No user assigned' }}
			</div>
			<div><span class="m-text">Information id: </span>
				{{ management._id ? management._id : 'None'}}
			</div>
			<div><span class="m-text">Branch: </span>
				{{ management.persons && management.persons.departments.branches.name ? management.persons.departments.branches.name : 'None' }}
			</div>
			<div><span class="m-text">Status: </span>
				{{ management.statuses.name ?  management.statuses.name : 'None'}}
			</div>
			<div><span class="m-text">Date: </span>
				{{ management.date ? management.date : 'None' }}
			</div>
			<div><span class="m-text">Description: </span>
				{{ management.description ? management.description : 'None' }}
			</div>
			<div><span class="m-text">Issue: </span>
				{{ management.issue ? management.issue : 'None' }}
			</div>
		</div>
  </el-form>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	async asyncData({store, params}) {
		const management = await store.dispatch('management/getInfoById', params.id)
		return {management}
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