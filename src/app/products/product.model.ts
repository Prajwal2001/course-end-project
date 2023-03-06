export class Product {
    name: string;
    description: string;
    quantity: number;
    amount: number;
    imgUrl: string;
    id: string;
    addedDate: string;
    lastUpdatedDate: string;
    productTypeId: number;

    constructor(name: string, description: string, quantity: number, amount: number, imgUrl: string, id: string, addedDate: string, lastUpdatedDate: string, productTypeId: number) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.amount = amount;
        this.imgUrl = imgUrl;
        this.id = id;
        this.addedDate = addedDate;
        this.lastUpdatedDate = lastUpdatedDate;
        this.productTypeId = productTypeId;
    }
}