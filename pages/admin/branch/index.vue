<template>
  <div class="branch">
    <div class="fix-style">
      <h1>Branches</h1>
      <el-button type="success" class="button" @click="redirectToCreateBranch"
        >Create</el-button
      >
    </div>
    <div class="list-style">
      <BranchCard
        v-for="branch in branches"
        :key="branch._id"
        :branch="branch"
      />
    </div>
  </div>
</template>

<script>
import BranchCard from "@/components/admin/BranchCard";
export default {
  layout: "admin",
  middleware: ["admin-auth"],

  async asyncData({ store }) {
    const branches = await store.dispatch("branch/fetchAdmin");
    return { branches };
  },

  components: {
    BranchCard,
  },

  methods: {
    redirectToCreateBranch() {
      this.$router.push("/admin/branch/create");
    },
  },
};
</script>

<style scoped>
.button {
  margin-bottom: 30px;
}

.list-style {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
}

.fix-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
