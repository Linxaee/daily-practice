/**
 * renderer函数最基本原理
 * 2022/10/24
 */
const vnode = {
	tag: "div",
	props: {},
	children: [
		{
			tag: "div",
			props: {
				onClick: () => {
					alert(123);
				},
			},
			children: "点我",
		},
		{
			tag: "h1",
			props: {},
			children: "日",
		},
	],
};
/**
 * 将vnode作为container的子节点渲染
 * @param {*} vnode 虚拟节点
 * @param {*} container 容器
 */
function renderer(vnode, container) {
	//以vnode.tag作为标签名创建元素
	const el = document.createElement(vnode.tag);
	//遍历vnode.props将属性、事件添加到el元素
	for (const key in vnode.props) {
		// 以on开头说明是事件
		if (/^on/.test(key)) {
			// onClick的事件名为click
			el.addEventListener(
				key.substring(2).toLowerCase(),
				vnode.props[key]
			);
		}
	}
	// 类型为String说明是文本节点，直接赋值
	if (typeof vnode.children === "string") {
		el.appendChild(document.createTextNode(vnode.children));
	} else if (Array.isArray(vnode.children)) {
		// 递归调用renderer渲染子节点
		vnode.children.forEach((child) => {
			el.appendChild(renderer(child, el));
		});
	}
	// 元素挂载到当前节点下
	container.appendChild(el);
	return el;
}

renderer(vnode, document.body);
