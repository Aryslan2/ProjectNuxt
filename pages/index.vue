<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <AppPost v-for="post in posts" :key="post._id" :post="post" />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from "@/components/main/Post";
export default {
  head: {},

  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetch");
    return { posts };
  },

  components: {
    AppPost,
  },
};
</script>

<style scoped></style>
