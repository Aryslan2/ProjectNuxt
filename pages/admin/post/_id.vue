<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      @submit.native.prevent="onSubmit"
      :model="controls"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="Text .md or .html" prop="text">
        <el-input
          type="textarea"
          resize="none"
          :rows="10"
          v-model="controls.text"
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading"
          >Update</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],

  validate({ params }) {
    return true;
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
    return { post };
  },
  data() {
    return {
      loading: false,
      controls: {
        text: "",
      },

      rules: {
        text: [
          { required: true, message: "Text not to be empty", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.controls.text = this.post.text;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          const formData = {
            text: this.controls.text,
            id: this.post._id,
          };

          try {
            await this.$store.dispatch("post/update", formData);
            this.$message.success("Post updated");
            this.loading = false;
          } catch (e) {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.page-wrap {
  width: 600px;
}

.mr {
  margin-right: 2rem;
}
</style>
