export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/department/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/department/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/department/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	
	async update({commit}, {id, name, email, phone, branches}) {
		try {
			return await this.$axios.$put(`/api/department/admin/${id}`, {name, email, phone, branches})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/department/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


