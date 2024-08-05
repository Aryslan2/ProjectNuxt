export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/branch/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/branch/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/branch/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async update({commit}, {id, name, address, email, phone}) {
		try {
			return await this.$axios.$put(`/api/branch/admin/${id}`, {name, address, email, phone})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/branch/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


