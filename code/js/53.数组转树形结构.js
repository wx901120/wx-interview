const arr = [
	{ id: 1, parentId: 0, label: 'Root1' },
	{ id: 2, parentId: 1, label: 'Child 1' },
	{ id: 3, parentId: 1, label: 'Child 2' },
	{ id: 4, parentId: 2, label: 'Grandchild 1' },
	{ id: 5, parentId: 2, label: 'Grandchild 2' },
	{ id: 6, parentId: 3, label: 'Grandchild 3' }
]
function arrToTree(arr) {
	const map = new Map()
	const tree = []
	for (const item of arr) {
		map.set(item.id, item)
	}
	for (const node of arr) {
		if (node.parentId) {
			if (!map.get(node.parentId).children) {
				map.get(node.parentId).children = []
			}
			map.get(node.parentId).children.push(node)
		} else {
			tree.push(node)
		}
	}
    return tree
}
console.dir(arrToTree(arr), { depth: 200 })
