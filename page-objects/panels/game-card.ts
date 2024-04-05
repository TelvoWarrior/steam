import { Selector } from "testcafe";
import { Label } from "../elements/label";
import { Button } from "../elements/button";

export enum GameCardItem {
    GAME_CARD_SELECTOR = `Game Card Selector`,
    GAME_TITLE = `Game Title`,
    GENRE_TAGS = `Genre Tags`,
    RELEASE_DATE = `Release Date`,
    REVIEW_SUMMARY = `Review Summary`,
    REVIEW_COUNT = `Review Count`,
    PRICE = `Price`,
    ADD_TO_CART = `Add to Cart`,
    DISCOUNT_LABEL = `Discount Label`,
    REGULAR_PRICE_LABEL = `Regular Price`,
    DISCOUNT_PRICE_LABEL = `Discount Price`,
    WISHLIST_BUTTON = `Wishlist Button`,
}

export class GameCard {
    private _gameCardSelector: Selector;
    private _gameTitleCardSelector: Label;
    private _genreTagsCardSelector;
    private _releaseDateCardSelector: Label;
    private _reviewsSummaryCardSelector: Label;
    private _reviewsCountCardSelector: Label;
    private _priceCardSelector: Label;
    private _addToCartButton: Button;
    private _discountLabelCardSelector: Label;
    private _regularPriceSelector: Label;
    private _discountPriceSelector: Label;
    private _wishListButton: Button;

    constructor(nth: number = 0) {
        this._gameCardSelector = Selector(`div[class*="sale_item_browser"]`).find(`div[class="ImpressionTrackedElement"]`).nth(nth);
        this._gameTitleCardSelector = new Label(this._gameCardSelector.find(`div[class*="StoreSaleWidgetTitle"]`), GameCardItem.GAME_TITLE);
        this._genreTagsCardSelector = this._gameCardSelector.find(`a[class*="WidgetTag"]`).filterVisible();
        this._releaseDateCardSelector = new Label(this._gameCardSelector.find(`span`).prevSibling(0), GameCardItem.RELEASE_DATE);
        this._reviewsSummaryCardSelector = new Label(this._gameCardSelector.find(`a[href*="reviews"]`).find(`div`).withText(``).nth(1), GameCardItem.REVIEW_SUMMARY);
        this._reviewsCountCardSelector = new Label(this._gameCardSelector.find(`a[href*="reviews"]`).find(`div`).withText(`Reviews`).nth(1), GameCardItem.REVIEW_COUNT);
        this._priceCardSelector = new Label(this._gameCardSelector.find('div[class*="StoreSalePriceWidgetContainer"]').child(0), GameCardItem.PRICE);
        this._addToCartButton = new Button(this._gameCardSelector.find('span').withText('Add to Cart'), GameCardItem.ADD_TO_CART);
        this._discountLabelCardSelector = new Label(this._gameCardSelector.find('div[class*="StoreSalePriceWidgetContainer"]').child().withText('%'), GameCardItem.DISCOUNT_LABEL);
        this._regularPriceSelector = new Label(this._gameCardSelector.find('div[class*="StoreSalePriceWidgetContainer"]').child().child(0), GameCardItem.REGULAR_PRICE_LABEL);
        this._discountPriceSelector = new Label(this._gameCardSelector.find('div[class*="StoreSalePriceWidgetContainer"]').child().child(1), GameCardItem.DISCOUNT_PRICE_LABEL);
        this._wishListButton = new Button(this._gameCardSelector.find('div[class*="WishlistButton"]'), GameCardItem.WISHLIST_BUTTON);
    }

    static getElement(nth: number, control: GameCardItem) {
        const gameCard = new GameCard(nth)
        switch (control) {
            case GameCardItem.GAME_TITLE:
                return gameCard._gameTitleCardSelector;
            case GameCardItem.GENRE_TAGS:
                return gameCard._genreTagsCardSelector;
            case GameCardItem.RELEASE_DATE:
                return gameCard._releaseDateCardSelector;
            case GameCardItem.REVIEW_SUMMARY:
                return gameCard._reviewsSummaryCardSelector;
            case GameCardItem.REVIEW_COUNT:
                return gameCard._reviewsCountCardSelector;
            case GameCardItem.PRICE:
                return gameCard._priceCardSelector;
            case GameCardItem.ADD_TO_CART:
                return gameCard._addToCartButton;
            case GameCardItem.DISCOUNT_LABEL:
                return gameCard._discountLabelCardSelector;
            case GameCardItem.REGULAR_PRICE_LABEL:
                return gameCard._regularPriceSelector;
            case GameCardItem.DISCOUNT_PRICE_LABEL:
                return gameCard._discountPriceSelector;
            case GameCardItem.WISHLIST_BUTTON:
                return gameCard._wishListButton;
        }
    }
}