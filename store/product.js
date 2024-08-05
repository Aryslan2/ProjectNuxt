export const actions = {
	async create({commit}, data) {
		try {
			return await this.$axios.$post('/api/product/admin/create', data)
		} catch (e) {
			commit('setError', e, {root: true})
		}
	},

	async fetchAdmin({commit}) {
		try {
			return await this.$axios.$get('/api/product/admin')
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminFree({ commit }) {
		try {
			return await this.$axios.$get('/api/product/admin/free');
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async remove({commit}, id) {
		try {
			return await this.$axios.$delete(`/api/product/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
	
	async update({commit}, {id, barcode, name, characteristic}) {
		try {
			return await this.$axios.$put(`/api/product/admin/${id}`, {barcode, name, characteristic})
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async fetchAdminById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/product/admin/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},

	async getInfoById({commit}, id) {
		try {
			return await this.$axios.$get(`/api/product/admin/info/${id}`)
		} catch (e) {
			commit('setError', e, {root: true})
			throw e
		}
	},
}


