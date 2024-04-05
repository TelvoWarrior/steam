import { Selector } from "testcafe";
import { BasePage } from "./base-page";

export class SubGenreGamePage extends BasePage {
    public static readonly GAME_CARDS_LIST = Selector(`#SaleSection_13268`);
    public static readonly GAME_CARD_SELECTOR = Selector(`#SaleSection_13268`).find(`div[class="ImpressionTrackedElement"]`);
}