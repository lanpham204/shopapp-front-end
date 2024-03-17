import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class OrderDTO {
    user_id:number;

    @IsString()
    fullname:string;
    @IsString()
    email:string;
    @IsPhoneNumber()
    @IsNotEmpty()
    phone_number:string;
    @IsString()
    @IsNotEmpty()
    address:string;
    @IsString()
    note:string;
    total_money:number;
    shipping_method:string;
    payment_method:string;
    cart_items: { product_id:number, quantity: number }[] = []
    constructor(data: any){
       this.user_id = data.user_id,
       this.fullname = data.fullname,
       this.email = data.email,
       this.phone_number = data.phone_number,
       this.address = data.address,
       this.note = data.note,
       this.total_money = data.total_money,
       this.shipping_method = data.shipping_method
       this.payment_method = data.payment_method
       this.cart_items = data.cart_items
    }
}
