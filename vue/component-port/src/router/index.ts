import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import foo from "../views/foo.vue";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/foo",
		name: "foo",
		component: foo,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
