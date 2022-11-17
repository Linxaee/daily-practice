import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			name: "Linxae",
			age: 21,
			address: "cxd",
			counter: 0,
		};
	},
	mutations: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
	},
});

export default store;
