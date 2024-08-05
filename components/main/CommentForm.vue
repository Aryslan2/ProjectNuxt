<template>
	<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
		<h1>Add Comment</h1>

		<el-form-item label="Username" prop="name">
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item label="Text comments" prop="text">
			<el-input type="textarea" resize="none" :rows="2" v-model="controls.text" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Add Comment</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	props: {
		postId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			controls: {
				name: '',
				text: ''
			},

			rules: {
          name: [
            { required: true, message: 'Please input username', trigger: 'blur' }
          ],
          text: [
            { required: true, message: 'Please input your comment', trigger: 'blur' }
          ],
        }
		}
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async valid => {
          if (valid) {
						this.loading = true
            
						const formData = {
							name: this.controls.name,
							text: this.controls.text,
							postId: this.postId
						}

						try {
							const newComment = await this.$store.dispatch('comment/create', formData)
							this.$message.success('Comment added')
							this.$emit('created', newComment)
						} catch(e) {
							this.loading = false
						}
          } 
        });
		}
	}
}
</script>

<style scoped>

</style>