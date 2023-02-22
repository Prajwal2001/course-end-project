export class Product {
    name: string;
    description: string;
    quantity: number;
    amount: number;
    imgUrl: string;
    id: string

    constructor(name: string, description: string, quantity: number, amount: number, imgUrl: string, id: string) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.amount = amount;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}