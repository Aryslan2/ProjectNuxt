<template>
  <el-card class="branch-card" :default-active="$route.path" router>
    <div slot="header" class="clearfix">
      <span>{{ branch.name }}</span>
      <div>
        <el-button type="primary" class="button" @click="openBranch">Edit</el-button>
        <el-button type="danger" class="button" @click="remove(branch._id)">Delete</el-button>
      </div>
    </div>
      
    <div class="branch-info">
      <p>Address: {{ branch.address }}</p>
      <p>Phone-number: {{ branch.phone }}</p>
      <p>Email: {{ branch.email }}</p>
      <p>Company: {{ branch.companies.name }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    branch: {
      type: Object,
      required: true
    }
  },

  methods: {
    openBranch() {
      const id = this.branch._id;
      this.$router.push(`/admin/branch/${id}`);
    },
    async remove(id) {
      try {
        await this.$confirm('Delete branch?', 'Warning!', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        });
        await this.$store.dispatch('branch/remove', id);
        delete this.branch._id;

        this.$message.success('Branch deleted');
        this.$router.go();
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

.branch-card {
  width: 600px;
}

.clearfix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.branch-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>