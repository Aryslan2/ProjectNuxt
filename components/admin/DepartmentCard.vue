<template>
  <el-card class="depart-card" :default-active="$route.path" router>
    <div slot="header" class="clearfix">
      <span>{{ department.name }}</span>
      <div>
        <el-button type="primary" class="button" @click="openDepartment">Edit</el-button>
        <el-button type="danger" class="button" @click="remove(department._id)">Delete</el-button>
      </div>
    </div>
      
    <div class="branch-info">
      <p>Phone-number: {{ department.phone }}</p>
      <p>Email: {{ department.email }}</p>
      <p>Branch: {{ department.branches && department.branches.name ? department.branches.name : "Empty" }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    department: {
      type: Object,
      required: true
    }
  },

  methods: {
    openDepartment() {
      const id = this.department._id;
      this.$router.push(`/admin/department/${id}`);
    },
    async remove(id) {
      try {
        await this.$confirm('Delete department?', 'Warning!', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        });
        await this.$store.dispatch('department/remove', id);
        delete this.department._id;

        this.$message.success('Department deleted');
        this.$router.go();
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

.depart-card {
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