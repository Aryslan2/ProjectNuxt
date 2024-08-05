export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/management/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/management/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/management/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	
	async update({commit}, {id, persons, statuses, products, description, issue}) {
		try {
			return await this.$axios.$put(`/api/management/admin/${id}`, {persons, statuses, products, description, issue})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/management/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async getInfoById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/management/admin/info/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


