import { Selector } from "testcafe"
import { Label } from "../elements/label";

export class ShoppingCart {
    public static readonly PAGE_TITLE = new Label(Selector(`div`).withExactText(`Your Shopping Cart`), `Page Title`);
    public static readonly ESTIMATED_TOTA_PRICE = new Label(Selector(`div`).withExactText(`Your Shopping Cart`).nextSibling(0).child(1).child().child(0).child(1), `Estimated total price`);
    public static readonly GAME_CARDS_CONTAINER = Selector(`div`).withExactText(`Your Shopping Cart`).nextSibling(0).child(0).child(0).find(`div[class="Panel Focusable"]`);
}