function func() {
    console.time("func");
    var obj = {
        a: [1, 2, 3]
    };
    for (var i = 0; i < 100000; i++) {
        var v = obj.a[0];
    }
    console.timeEnd("func");
}
func();

function funcWith() {
    console.time("funcWith");
    var obj = {
        a: [1, 2, 3]
    };
    with (obj) {
        for (var i = 0; i < 100000; i++) {
            var v = a[0];
        }
    }
    console.timeEnd("funcWith");
}

funcWith();
// func: 1.145ms
// funcWith: 24.136ms
// 差距不是一般的大
// 为什么呢？

