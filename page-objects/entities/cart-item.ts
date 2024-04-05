import { Selector } from "testcafe"
import { Button } from "../elements/button"
import { Label } from "../elements/label"

export enum CartItemEnum {
    GAME_TITLE = `Game Title`,
    REGULAR_PRICE = `Regular Price`,
    DISCOUNT_PRICE = `Discount Price`,
    DISCOUNT_AMOUNT = `Discount Amount`,
}

export class CartItem {
    private _cartItemSelector:Selector
    private _gameTitle:Label
    private _discountAmount:Label
    private _regularPriceLabel:Label
    private _discountPriceLabel:Label

    constructor(nth:number) {
        this._cartItemSelector = Selector(`div`).withExactText(`Your Shopping Cart`).nextSibling(0).find(`div[class="Panel Focusable"]`).nth(nth);
        this._gameTitle = new Label(this._cartItemSelector.child(0).child(0).child(1).child(0).child(0), `${CartItemEnum.GAME_TITLE}`)
        this._discountAmount = new Label(this._cartItemSelector.find(`span[class*="StoreSaleDiscountBox"]`),`${CartItemEnum.DISCOUNT_AMOUNT}`)
        this._regularPriceLabel = new Label(this._cartItemSelector.find('div[class*="StoreOriginalPrice"]'), `${CartItemEnum.REGULAR_PRICE}`);
        this._discountPriceLabel = new Label(this._cartItemSelector.find('div[class*="StoreOriginalPrice"]').nextSibling(), `${CartItemEnum.DISCOUNT_PRICE}`);
    }

    static getElement(nth:number, control: CartItemEnum) {
        const cartItem = new CartItem(nth);
        switch (control) {
            case CartItemEnum.GAME_TITLE:
                return cartItem._gameTitle;
            case CartItemEnum.DISCOUNT_AMOUNT:
                return cartItem._discountAmount;
            case CartItemEnum.REGULAR_PRICE:
                return cartItem._regularPriceLabel;
            case CartItemEnum.DISCOUNT_PRICE:
                return cartItem._discountPriceLabel;
        }
    }
}