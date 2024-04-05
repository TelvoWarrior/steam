import { Selector } from "testcafe"
import { Label } from "../elements/label"
import { Button } from "../elements/button"

export enum DialogWindowItem {
    VIEW_MY_CART_BUTTON = `View My Cart`,
}

export class DialogWindow {
    private static readonly HELPER_SELECTOR = Selector(`div[class="Panel Focusable"]`).child(0).child(0).child(1);
    public static readonly GAME_TITLE = new Label(this.HELPER_SELECTOR.child(0).child(0), `Game Title`);
    public static readonly DISCOUNT_AMOUNT = new Label(this.HELPER_SELECTOR.child(2).child(0).child(0), `Discount Amount`);
    public static readonly DISCOUNT_PRICE = new Label(this.HELPER_SELECTOR.child(2).child(0).child(1).child(1), `Discount Price`);
    public static readonly REGULAR_PRICE = new Label(this.HELPER_SELECTOR.child(2).child(0).child(1).child(0), `Regular Price`);
    public static readonly VIEW_MY_CART = new Button(Selector(`button`).withText(`${DialogWindowItem.VIEW_MY_CART_BUTTON}`), DialogWindowItem.VIEW_MY_CART_BUTTON);
}