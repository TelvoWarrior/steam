import { GamePage } from "../pages/game-page"
import { GamePageSteps } from "../steps/game-page-steps"

export class GameCardDataInGamePage {
    public static readonly DISCOUNT_AMOUNT = (await GamePageSteps.getInnerText(GamePage.DISCOUNT_AMOUNT)).slice(1, -1);
    public static readonly DISCOUNT_PRICE = (await GamePageSteps.getInnerText(GamePage.DISCOUNT_PRICE)).slice(0, -4);
    public static readonly REGULAR_PRICE = await GamePageSteps.getInnerText(GamePage.REGULAR_PRICE);
    public static readonly RELEASE_DATE = new Date(await GamePageSteps.getInnerText(GamePage.RELEASE_DATE)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    public static readonly GENRE_TAGS = ``;
    public static readonly REVIEWS_SUMMARY = await GamePageSteps.getInnerText(GamePage.REVIEW_SUMMARY);
    public static readonly REVIEWS_COUNT = (await GamePageSteps.getInnerText(GamePage.REVIEW_COUNT)).slice(1, -1);
}
