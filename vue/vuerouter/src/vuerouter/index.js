let _Vue = null;
export default class VueRouter {
	static install(Vue) {
		// 判断当前插件是否已安装
		if (VueRouter.install.installed) {
			return;
		}
		VueRouter.install.installed = true;
		// 把Vue构造函数记录到全局
		_Vue = Vue;
		// 把创建Vue实例时传入的router对象注入到Vue实例上
		_Vue.mixin({
			beforeCreate() {
				console.log("this", this);
				if (this.$options.router) {
					_Vue.prototype.$router = this.$options.router;
					this.$options.router.init();
				}
			},
		});
	}

	constructor(options) {
		this.options = options;
		// 存储解析的routes
		this.routeMap = new Map();
		this.data = _Vue.observable({
			current: "/",
		});
	}
	init() {
		this.createRouteMap();
		this.initComponents(_Vue);
		this.initEvent();
	}
	// 遍历路由规则解析成键值对存入routeMap
	createRouteMap() {
		let routes = this.options.routes;
		routes.forEach((route) => {
			this.routeMap.set(route.path, route.component);
		});
		console.log("this.routeMap", this.routeMap);
	}
	// 减少方法和外部的依赖所以引入Vue
	initComponents(Vue) {
		const self = this;
		Vue.component("router-link", {
			props: {
				to: String,
			},
			// template: '<a :href="to"><slot></slot></a>',
			render(h) {
				return h(
					"a",
					{
						attrs: {
							href: this.to,
						},
						on: {
							click: this.clickHandler,
						},
					},
					[this.$slots.default]
				);
			},
			methods: {
				clickHandler(e) {
					/**
					 * @param data 传给popState的数据
					 * @param title 网页标题
					 * @param url 网址
					 */
					history.pushState({}, "", this.to);
					// 更改当前地址
					this.$router.data.current = this.to;
					e.preventDefault();
				},
			},
		});
		Vue.component("router-view", {
			render(h) {
				const component = self.routeMap.get(self.data.current);
				return h(component);
			},
		});
	}
	// 注册popstate事件
	initEvent() {
		window.addEventListener("popstate", () => {
			this.data.current = window.location.pathname;
		});
	}
}
