export default {
	namespaced: true,
	state() {
		return {
			name: "gg",
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
