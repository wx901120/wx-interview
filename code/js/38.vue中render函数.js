/**
 * 将vnode转化为真实dom 
 * @param {*} vnode 虚拟节点
 * @returns 
 */
function render(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }
    let dom = document.createElement(vnode.tag)
    if (vnode.arrs) {
        Object.keys(vnode.arrs).forEach(key => {
            dom.setAttribute(key, vnode.arrs[key])
        })
    }
    if (vnode.children) {
        vnode.children.forEach(node => {
            dom.appendChild(render(node))
        })
    }
}