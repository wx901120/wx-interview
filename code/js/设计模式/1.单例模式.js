class Single{
    constructor(name){
       this.name = name
    }
    static getInstance(name){
        if(!this.instance){
            this.instance = new Single(name)
        }
        return this.instance
    }
}

let single1 = Single.getInstance("name1");
let single2 = Single.getInstance("name2");
console.log(single1 === single2);  // true
