<template>
	<div class="department">
    <div class="fix-style">
      <h1>Departments</h1>
      <el-button type="success" class="button" @click="redirectToCreateDepartment">Create</el-button>
    </div>
    <div class="list-style">
      <DepartmentCard 
      v-for="department in departments"
      :key="department._id"
      :department="department"
      />
    </div>
	</div>
</template>

<script>
import DepartmentCard from '@/components/admin/DepartmentCard'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],

	async asyncData({store}) {
    const departments = await store.dispatch('department/fetchAdmin')
    return {departments}
  },

  components: {
    DepartmentCard
  },

  methods: {
    redirectToCreateDepartment() {
      this.$router.push('/admin/department/create')
    },
  },
}
</script>

<style scoped>
.button {
  margin-bottom: 30px;
}

.list-style {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px
}

.fix-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>