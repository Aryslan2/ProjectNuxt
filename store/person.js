export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/person/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/person/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/person/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	
	async update({commit}, {id, first_name, last_name, departments}) {
		try {
			return await this.$axios.$put(`/api/person/admin/${id}`, {first_name, last_name, departments})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/person/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


