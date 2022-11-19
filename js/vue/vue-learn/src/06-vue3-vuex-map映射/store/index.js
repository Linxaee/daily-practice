import { createStore } from "vuex";
import home from "./module/home";
import user from "./module/user";
const store = createStore({
	state() {
		return {
			name: "Linxae",
			age: 21,
			address: "aaa",
			counter: 456,
		};
	},
	mutations: {},
	getters: {
		doubleCounter(state) {
			return state.counter * 2;
		},
	},
	modules: {
		home,
		user,
	},
});

export default store;
