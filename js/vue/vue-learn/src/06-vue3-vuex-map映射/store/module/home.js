export default {
	namespaced: true,
	state() {
		return {
			address: "成信大",
			counter: 0,
		};
	},
	getters: {
		doubleCounter(state) {
			return state.counter * 2;
		},
	},
	mutations: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
	},
	actions: {
		incrementAction({ commit }) {
			commit("increment");
		},
	},
};
