export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/status/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/status/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/status/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	
	async update({commit}, {id, name}) {
		try {
			return await this.$axios.$put(`/api/status/admin/${id}`, {name})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/status/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


