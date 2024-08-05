<template>
	<div>
		<div class="fix-style">
			<h1>Products</h1>
			<el-button type="success" class="button" @click="redirectToCreateProduct()">Create</el-button>
		</div>
		<div class="search-box">
			<el-input
				v-model="searchQuery"
				placeholder="Search"
				clearable
				@input="handleSearch"
			></el-input>
		</div>
		<el-table
			:data="products"
			style="width: 100%">
			<el-table-column label="Name">
        <template slot-scope="{ row }">
          <a class="link" @click="handleRowClick(row._id)">{{ row.name }}</a>
        </template>
      </el-table-column>
			<el-table-column 
			prop="_id"
			label="id"
			/>
			<el-table-column 
			label="Barcode"
			>
			<template slot-scope="{ row }">
				{{ row.barcode}}
			</template>
 		 	</el-table-column>
			<el-table-column label="Actions">
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="edit product" placement="top">
						<el-button
							icon="el-icon-edit"
							type="primary"
							circle
							@click="open(row._id)" 
						/>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="remove product" placement="top">
						<el-button
							icon="el-icon-delete"
							type="danger"
							circle
							@click="remove(row._id)" 
						/>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	data() {
    return {
      originalSearch: [],
      searchQuery: '',
    };
  },

	async asyncData({store}) {
		const products = await store.dispatch('product/fetchAdmin')
		return {products, originalSearch: products}
	},

	methods: {
		handleSearch() {
			this.products = this.originalSearch.filter(product => {
				const productName = (product && product.name) || '';
				const barcodeName = (product && product.barcode) || '';

				const searchQueryLowerCase = this.searchQuery.toLowerCase();
				const searchQueryDigits = this.searchQuery.toString();

				return (
					productName.toLowerCase().includes(searchQueryLowerCase) ||
					barcodeName.toString().includes(searchQueryDigits)
				);
			});
		},

		redirectToCreateProduct() {
      this.$router.push('/admin/product/create')
    },

		handleRowClick(id) {
    this.$router.push(`/admin/product/info/${id}`);
  	},

		open(id) {
        this.$router.push(`/admin/product/${id}`)
    },
		async remove(id) {
			try {
				await this.$confirm('Delete product?', 'Warning!', {
					confirmButtonText: 'Yes',
					cancelButtonText: 'Cancel',
					type: 'warning'
				})
				await this.$store.dispatch('product/remove', id)
				this.products = this.products.filter(p => p._id !== id)

				this.$message.success('Product deleted')
			} catch (e) {

			}
		}
	}
}
</script>

<style scoped>
.fix-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
	color: rgb(0, 128, 255);
}

.link:hover {
	color: rgb(19, 58, 96);
	cursor: pointer;
	text-decoration: underline;
}

.search-box {
	width: 500px;
}
</style>

