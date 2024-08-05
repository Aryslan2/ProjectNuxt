export const actions = {
	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/company/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/company/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async update({commit}, {id, name, text, bin, kato, address, director, email, phone}) {
		try {
			return await this.$axios.$put(`/api/company/admin/${id}`, {text, name, bin, kato, address, director, email, phone})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/company/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


