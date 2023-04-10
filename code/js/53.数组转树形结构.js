const arr = [
    {
        id: 2,
        name: '部门B',
        parentId: 0
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1
    },
    {
        id: 1,
        name: '部门A',
        parentId: 2
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4
    }
]
// 针对单个根节点
const arrToTree = arr => {
    // 1.先找到根
    let root = {}
    arr.forEach(el => {
        if (el.parentId === 0) {
            root = el
        }
    })
    return arr.reduce((pre, cur) => {
        // 如果不是根，那就要看它属于那个节点
        if (cur.parentId !== 0) {
            find(pre, cur)
        }
        function find(pre, cur) {
            if (cur.parentId === pre.id) {
                if (!pre.children) {
                    pre.children = []
                }
                pre.children.push(cur)
            } else if (pre.children) {
                pre.children.forEach(item => {
                    find(item, cur)
                })
            }
        }
        return pre
    }, root)
}
console.dir(arrToTree(arr), { depth: 200 })

// 针对多个根节点
const arr2Tree = arr => {
    const roots = []
    arr.forEach(item => {
        if (item.parentId === 0) {
            roots.push(item)
        }
    })
    return arr.reduce((pre, cur) => {
        if (cur.parentId !== 0) {
            find(pre, cur)
        }
        function find(pre, cur) {
            pre.forEach(item => {
                if (item.id === cur.parentId) {
                    if (!item.children) {
                        item.children = []
                    }
                    item.children.push(cur)
                } else if (item.children) {
                    // item.children.forEach(el => {
                    //     find(el, cur)
                    // })
                    // 应该这样写
                    find(item.children, cur)
                }
            })
        }
        return pre
    }, roots)
}
