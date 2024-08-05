<template>
  <el-card class="company-card" :default-active="$route.path" router>
    <div slot="header" class="clearfix">
      <span>{{ company.name }}</span>
      <el-button type="primary" class="button" @click="openCompany">Edit</el-button>
    </div>
      
    <div class="company-info">
      <p>{{ company.text }}</p>
      <p>BIN: {{ company.bin }}</p>
      <p>KATO: {{ company.kato }}</p>
      <p>Address: {{ company.address }}</p>
      <p>Director: {{ company.director }}</p>
      <p>Email: {{ company.email }}</p>
      <p>Phone-number: {{ company.phone }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
		company: {
			type: Object,
			required: true
		}
	},

  methods: {
		openCompany() {
			const id = this.company._id
			this.$router.push(`/admin/company/${id}`)
		}
	}
}
</script>

<style scoped>

.company-card {
  width: 800px;
}

.clearfix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>