<template>
	<div>
		<div class="fix-style">
			<h1>Persons</h1>
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
			:data="persons"
			style="width: 100%">
			<el-table-column 
			prop="first_name"
			label="First Name"
			/>
			<el-table-column 
			prop="last_name"
			label="Last Name"
			/>
			<el-table-column 
			prop="departments.name"
			label="Department"
			/>
			<el-table-column 
			prop="_id"
			label="id"
			/>
			<el-table-column label="Actions">
				<template slot-scope="{row}">
					<el-tooltip effect="dark" content="edit person" placement="top">
						<el-button
							icon="el-icon-edit"
							type="primary"
							circle
							@click="open(row._id)" 
						/>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="remove person" placement="top">
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
		const persons = await store.dispatch('person/fetchAdmin')
		return {persons, originalSearch: persons}
	},

	methods: {
		handleSearch() {
			this.persons = this.originalSearch.filter(person => {
				const userName = (person && person.first_name && person.last_name) ? person.first_name + ' ' + person.last_name : '';
				const departmentName = (person.departments && person.departments.name) || '';

				const searchQueryLowerCase = this.searchQuery.toLowerCase();

				return (
					userName.toLowerCase().includes(searchQueryLowerCase) ||
					departmentName.toLowerCase().includes(searchQueryLowerCase)
				);
			});
		},

		redirectToCreatePerson() {
      this.$router.push('/admin/person/create')
    },

		open(id) {
        this.$router.push(`/admin/person/${id}`)
    },
		async remove(id) {
			try {
				await this.$confirm('Delete person?', 'Warning!', {
					confirmButtonText: 'Yes',
					cancelButtonText: 'Cancel',
					type: 'warning'
				})
				await this.$store.dispatch('person/remove', id)
				this.persons = this.persons.filter(p => p._id !== id)

				this.$message.success('Person deleted')
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

.search-box {
	width: 500px;
}
</style>
