import { Selector } from "testcafe";
import { Label } from "../elements/label";
import { Button } from "../elements/button";

export class GamePage {
    public static readonly RELEASE_DATE = new Label(Selector(`#userReviews`).nextSibling(0).child(1), `Release Date`);
    public static readonly REVIEW_SUMMARY = new Label(Selector(`#userReviews`).child(1).child(1).child(0), `Review Summary`);
    public static readonly REVIEW_COUNT = new Label(Selector(`#userReviews`).child(1).child(1).child(1), `Review Count`);
    public static readonly DISCOUNT_AMOUNT = new Label(Selector(`div[class="game_purchase_action"]`).find(`div[class="discount_pct"]`), `Discount Amount`);
    public static readonly REGULAR_PRICE = new Label(Selector(`div[class="game_purchase_action"]`).find(`div[class="discount_original_price"]`), `Regular Price`);
    public static readonly DISCOUNT_PRICE = new Label(Selector(`div[class="game_purchase_action"]`).find(`div[class="discount_final_price"]`), `Discount Price`);
    public static readonly ADD_TO_CART = new Button(Selector(`div[class="game_purchase_action"]`).find(`div[class="btn_addtocart"]`), `Add to Cart`);
    public static readonly TITLE = new Label(Selector(`#appHubAppName`), `Title`);
}