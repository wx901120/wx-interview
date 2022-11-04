var foo = 'foo1'

const ctx = {
    func: variable => {
        console.log(variable);
    }
}

function withedYourCode(code) {
    code = `with(shadow) {${code}}`
    return new Function('shadow', code)
}

const access_white_list = ['func']
const code = 'func(foo)'

const ctxProxy = new Proxy(ctx,{
    has:(target,prop)=>{
        if(access_white_list.includes(prop)){
            return target.hasOwnProperty(prop)
        }
        if(!target.hasOwnProperty(prop)){
            throw new Error(`Not found - ${prop}!`)
        }
        return true
    }
})

function littlePoorSandbox(code,ctx){
    debugger
    withedYourCode(code).call(ctx,ctx)
}

littlePoorSandbox(code,ctxProxy)