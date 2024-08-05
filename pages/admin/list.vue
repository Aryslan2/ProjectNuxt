<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Name" />
    <el-table-column prop="_id" label="id" />
    <el-table-column label="Date">
      <template slot-scope="{ row: { date } }">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          new Date(date).toLocaleString()
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Comments">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="open post" placement="top">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            @click="open(row._id)"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="remove post"
          placement="top"
        >
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
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return { posts };
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}`);
    },
    async remove(id) {
      try {
        await this.$confirm("Delete post?", "Warning!", {
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          type: "warning",
        });
        await this.$store.dispatch("post/remove", id);
        this.posts = this.posts.filter((p) => p._id !== id);

        this.$message.success("Post deleted");
      } catch (e) {}
    },
  },
};
</script>
