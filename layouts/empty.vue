<template>
	<div class="empty-layout">
		<nuxt />
	</div>
</template>

<script>
export default {
	computed: {
		error() {
			return this.$store.getters.error
		}
	},
	watch: {
		error(value) {
			this.$message.error(value.response.data.message)
		}
	}
}
</script>

<style scoped>
	.empty-layout {
		display: flex;
		justify-content: center;
		widows: 100%;
		padding-top: 4rem;
	}
</style>