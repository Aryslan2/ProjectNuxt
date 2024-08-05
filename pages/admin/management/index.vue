<template>
	<div>
		<div class="fix-style">
			<h1>Management</h1>
			<el-button type="success" class="button" @click="redirectToCreatePerson">Create</el-button>
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
			:data="managements"
			style="width: 100%">

			<el-table-column 
			label="Product"
			>
			<template slot-scope="{ row }">
				<a class="link" @click="handleRowClick(row._id)">
					{{ row.products && row.products.name ? row.products.name : "Empty"}}
				</a>
			</template>
 		 	</el-table-column>

			<el-table-column 
			label="User"
			>
			<template slot-scope="{ row }">
				{{ row.persons && row.persons.first_name && row.persons.last_name ? row.persons.first_name + ' ' + row.persons.last_name : 'No user assigned' }}
			</template>
 		 	</el-table-column>

			<el-table-column 
			label="Status"
			>
			<template slot-scope="{ row }">
				{{ row.statuses && row.statuses.name ? row.statuses.name : "No status" }}
			</template>
 		 	</el-table-column>

			<el-table-column 
			label="Branch"
			>
			<template slot-scope="{ row }">
				{{ row.persons && row.persons.departments.branches.name ? row.persons.departments.branches.name : "At the pick-up point"}}
			</template>
 		 	</el-table-column>

			<el-table-column label="Date">
				<template  slot-scope="{row: {date}}">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
				</template>
    	</el-table-column>

			<el-table-column label="Actions">
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="edit" placement="top">
						<el-button
							icon="el-icon-s-tools"
							type="primary"
							circle
							@click="open(row._id)" 
						/>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="remove" placement="top">
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
      managements: [],
      originalManagements: [],
      searchQuery: '',
			freeProducts: [] 
    };
  },

  async asyncData({ store }) {
    const managements = await store.dispatch('management/fetchAdmin');
		const freeProducts = await store.dispatch('product/fetchAdminFree');
    return { managements, originalManagements: managements, freeProducts };
  },

  methods: {
		handleSearch() {
			const filteredManagements = this.originalManagements.filter(management => {
				const productName = (management.products && management.products.name) || '';
				const userName = (management.persons && management.persons.first_name && management.persons.last_name) ? management.persons.first_name + ' ' + management.persons.last_name : '';
				const statusName = (management.statuses && management.statuses.name) || '';
				const branchName = (management.persons && management.persons.departments && management.persons.departments.branches && management.persons.departments.branches.name) || '';

				const searchQueryLowerCase = this.searchQuery.toLowerCase();
				
				return (
					productName.toLowerCase().includes(searchQueryLowerCase) ||
					userName.toLowerCase().includes(searchQueryLowerCase) ||
					statusName.toLowerCase().includes(searchQueryLowerCase) ||
					branchName.toLowerCase().includes(searchQueryLowerCase)
				);
			});

			this.managements = filteredManagements;
		},

    async fetchData() {
      this.managements = await this.$store.dispatch('management/fetchAdmin');
      this.originalManagements = [...this.managements];
    },

    redirectToCreatePerson() {
      this.$router.push('/admin/management/create');
    },

    handleRowClick(id) {
      this.$router.push(`/admin/management/info/${id}`);
    },

    open(id) {
      this.$router.push(`/admin/management/${id}`);
    },

    async remove(id) {
      try {
        await this.$confirm('Delete?', 'Warning!', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        });
        await this.$store.dispatch('management/remove', id);
        this.managements = this.managements.filter(p => p._id !== id);
        this.$message.success('Deleted');
      } catch (e) {
        console.error('Error removing management:', e);
      }
    }
  }
};
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
