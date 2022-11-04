class Car {
    constructor(name, color) {
        this.name = name
        this.color = color
    }
}
class Factory {
    static create(type) {
        switch (type) {
            case 'car':
                return new Car('汽车', '白色');
            case "bicycle":
                return new Car("自行车", "黑色");
            default:
                break;
        }
    }
}
let p1 = Factory.create("car");
let p2 = Factory.create("bicycle");
console.log(p1, p1 instanceof Car); // {name: '汽车', color: '白色'} true
console.log(p2, p2 instanceof Car); // {name: '自行车', color: '黑色'} true
