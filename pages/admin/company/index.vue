<template>
  <div class="company">
    <el-button v-if="!companies.length" type="success" class="button" @click="redirectToCreateCompany">Create</el-button>
    <CompanyCard
      v-for="company in companies"
			:key="company._id"
			:company="company"
    />
  </div>
</template>

<script>
import CompanyCard from '@/components/admin/CompanyCard'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],

  async asyncData({store}) {
    const companies = await store.dispatch('company/fetchAdmin')
    return {companies}
  },

  components: {
    CompanyCard
  },

  methods: {
    redirectToCreateCompany() {
      this.$router.push('/admin/company/create')
    },
  },

  computed: {
    isVisible() {
      return this.companies.length === 0; 
    }
  }
}
</script>


<style scoped>
.company {
  display: flex;
  flex-direction: column;
  margin: 10px;
  gap: 10px;
}
</style>