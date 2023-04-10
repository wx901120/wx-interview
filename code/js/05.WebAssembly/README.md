## webAssembly

1. 可以分成 web 和 Assembly，它是 web 方面的汇编，可以将一些不能在浏览器中运行的代码,如 c/c++/java/swift 等语言编译成.wasm 文件，它是一个字节码文件
2. 运行在沙箱化的执行环境中，在 web 环境中，严格遵守**同源策略和安全策略**
3. 场景：web 版本的 autoCAD,谷歌地球

## 过程

### javascript 执行过程

下载 javascript 文件=》parse=》ast 语法树 ===》字节码 =》机器 code

1. JavaScript 文件会被下载下来。
2. 然后进入 Parser，Parser 会把代码转化成 AST（抽象语法树）.
3. 然后根据抽象语法树，Bytecode Compiler 字节码编译器会生成引擎能够直接阅读、执行的字节码。
4. 字节码进入翻译器，将字节码一行一行的翻译成效率十分高的 Machine Code.
5. 在项目运行的过程中，引擎会对执行次数较多的 function 记性优化，引擎将其代码编译成 Machine Code 后打包送到顶部的 Just-In-Time(JIT) Compiler，下次再执行这个 function，就会直接执行编译好的 Machine Code。但是由于 JavaScript 的动态变量，上一秒可能是 Array，下一秒就变成了 Object。那么上一次引擎所做的优化，就失去了作用，此时又要再一次进行优化。

### webAssembly 过程

c++/c/java ==> .wasm 文件（本身就是字节码文件）=》机器 code
主要就是少了解析和转成字节码的过程

## 优势

1. 更好的性能（因为它是字节码）
2. 体积小
