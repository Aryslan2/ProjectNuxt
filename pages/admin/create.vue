<template>
	<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
		
		<h1 class="mb">Create new post</h1>

		<el-form-item label="Input post name" prop="title">
			<el-input type="text" v-model="controls.title" />
		</el-form-item>

		<el-form-item label="Text .md or .html" prop="text">
			<el-input type="textarea" resize="none" :rows="10" v-model="controls.text" />
		</el-form-item>

		<el-button class="mb" type="success" plain @click="previewDialog=true">
			Preview post
		</el-button>

		<el-dialog title="Preview" :visible.sync="previewDialog">
			<div :key="controls.text">
				<vue-markdown>{{ controls.text }}</vue-markdown>
			</div>
		</el-dialog>

		<el-upload
			class="mb"
			drag
			ref="upload"
			action="https://jsonplaceholder.typicode.com/posts/"
			:on-change="handleImageChange"
			:auto-upload="false"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">Drop image here  <em> or click</em></div>
			<div class="el-upload__tip" slot="tip">file type jpg/png</div>
		</el-upload>

		<el-form-item>
			<el-button type="primary" round native-type="submit" :loading="loading">Create post</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	data() {
		return {
			image: null,
			previewDialog: false,
			loading: false,
			controls: {
				title: '',
				text: '',
			},

			rules: {
        text: [
          { required: true, message: 'Text not to be empty', trigger: 'blur' }
        ],
				title: [
          { required: true, message: 'Post name not to be empty', trigger: 'blur' }
        ],
      }
		}
	},
	methods: {
		handleImageChange(file, fileList) {
			this.image = file.raw
		},
		onSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid && this.image) {
					this.loading = true

					const formData = {
						title: this.controls.title,
						text: this.controls.text,
						image: this.image
					}

					try {
						await this.$store.dispatch('post/create', formData)
						this.controls.text = ''
						this.controls.title = ''
						this.image = null
						this.$refs.upload.clearFiles()
						this.$message.success('Post created')
					} catch (e) {} finally {
						this.loading = false
					}
				} else {
					this.$message.warning('Form not valid')
				}
			})
		}
	}
}
</script>

<style scoped>
	form {
		width: 600px;
	}
</style>