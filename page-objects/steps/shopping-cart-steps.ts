import { t } from "testcafe";
import { ShoppingCart } from "../pages/shopping-cart";
import { Label } from "../elements/label";
import { CartItem, CartItemEnum } from "../entities/cart-item";

export class ShoppingCartStepsImpl extends ShoppingCart {
    async checkShoppingCartPageOpened(title: Label) {
        await t.expect(`${await title.innerText}` === `Your Shopping Cart`).ok(`Check Shopping Cart page is oppened`);
    }
    async getGameCardData(nth: number = 0) {
        const gameCardDataInShoppingCart = {
            gameTitle: await this.getCartItemInnerText(nth, CartItemEnum.GAME_TITLE),
            discountAmount: ((await this.getCartItemInnerText(nth, CartItemEnum.DISCOUNT_AMOUNT)).slice(1, -1)),
            discountPrice: await this.getCartItemInnerText(nth, CartItemEnum.DISCOUNT_PRICE),
            regularPrice: await this.getCartItemInnerText(nth, CartItemEnum.REGULAR_PRICE),
        }

        return gameCardDataInShoppingCart
    }
    async getCartItemInnerText(nth: number, control: CartItemEnum) {
        return await CartItem.getSelector(nth, control).innerText;
    }

    async checkGameCardData(gameCardDataInGameList: {
        gameTitle: any;
        discountAmount: any;
        discountPrice: any;
        regularPrice: any;
        releaseDate: string;
        genreTags: string;
        reviewsSummary: any;
        reviewsCount: any;
    }, gameCardDataInGamePage: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
        releaseDate: string;
        genreTags: string;
        reviewsSummary: string;
        reviewsCount: string;
    }, gameCardDataInDialogWindow: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
    }, gameCardDataInCartPage: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
    }) {
        await t.expect(gameCardDataInGameList.gameTitle === gameCardDataInGamePage.gameTitle)
            .ok(`Check game card title in game list and in game page are the same`);
        await t.expect(gameCardDataInGameList.gameTitle === gameCardDataInDialogWindow.gameTitle)
            .ok(`Check game card title in game list and in dialog window are the same`);
        await t.expect(gameCardDataInGameList.gameTitle === gameCardDataInCartPage.gameTitle)
            .ok(`Check game card title in game list and in cart page are the same`);

        await t.expect(gameCardDataInGameList.discountAmount === gameCardDataInGamePage.discountAmount)
            .ok(`Check game card discount amount in game list and in game page are the same`);
        await t.expect(gameCardDataInGameList.discountAmount === gameCardDataInDialogWindow.discountAmount)
            .ok(`Check game card discount amount in game list and in dialog window are the same`);
        await t.expect(gameCardDataInGameList.discountAmount === gameCardDataInCartPage.discountAmount)
            .ok(`Check game card discount amount in game list and in cart page are the same`);

        await t.expect(gameCardDataInGameList.discountPrice === gameCardDataInGamePage.discountPrice)
            .ok(`Check game card discount price in game list and in game page are the same`);
        await t.expect(gameCardDataInGameList.discountPrice === gameCardDataInDialogWindow.discountPrice)
            .ok(`Check game card discount price in game list and in dialog window are the same`);
        await t.expect(gameCardDataInGameList.discountPrice === gameCardDataInCartPage.discountPrice)
            .ok(`Check game card discount price in game list and in cart page are the same`);

        await t.expect(gameCardDataInGameList.regularPrice === gameCardDataInGamePage.regularPrice)
            .ok(`Check game card regular price in game list and in game page are the same`);
        await t.expect(gameCardDataInGameList.regularPrice === gameCardDataInDialogWindow.regularPrice)
            .ok(`Check game card regular price in game list and in dialog window are the same`);
        await t.expect(gameCardDataInGameList.regularPrice === gameCardDataInCartPage.regularPrice)
            .ok(`Check game card regular price in game list and in cart page are the same`);
    }
}

export const ShoppingCartSteps = new ShoppingCartStepsImpl();