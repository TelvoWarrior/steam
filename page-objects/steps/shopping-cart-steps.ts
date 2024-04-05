import { Selector, t } from "testcafe";
import { ShoppingCart } from "../pages/shopping-cart";
import { Label } from "../elements/label";
import { CartItem, CartItemEnum } from "../panels/cart-item";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";

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
        return await CartItem.getElement(nth, control).innerText;
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
        await t.expect(gameCardDataInDialogWindow.gameTitle === gameCardDataInCartPage.gameTitle)
            .ok(`Check game card title in Dialog Window and in Cart Page are the same`);

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
    async clickRandomAdvGame() {
        let isChooseAgeWindowAppears = await Selector('#app_agegate').visible;

        if (isChooseAgeWindowAppears) {
            const ageYearSelector = Selector('select[name="ageYear"]')
            const optionsSelector = ageYearSelector.find('option');
            await t.click(ageYearSelector);
            await t.click(optionsSelector.nth(0));
            await t.click(Selector('#view_product_page_btn'));
        }
        
        const rndNumber = Math.floor(Math.random() * 3);
        const advGameSelector = new Label(ShoppingCart.ADVERTING_GAME.nth(rndNumber), `Random Adverting Game`);
        await advGameSelector.click();
    }

    private async getGamesAmountInShoppingCart() {
        Logger.info(`Count games in shopping cart`)
        return await ShoppingCart.GAME_CARDS_CONTAINER.count
    }

    async checkGamesAmountInShoppingCart(expectedAmount: number) {
        const gamesCount = await this.getGamesAmountInShoppingCart();
        Logger.info(`Check games count in shopping cart the same as expected`);
        await t.expect(gamesCount === expectedAmount).ok(`Check current amount games in shopping cart equals to ${expectedAmount}`);
    }

    async getSumDiscountPrices() {
        const gamesCount = await this.getGamesAmountInShoppingCart();
        let discountPriceTotal = 0;
        for (let i = 0; i < gamesCount; i++) {
            let curGameData = this.getGameCardData(i);
            let curGameDiscountPrice = +((await curGameData).discountPrice).slice(1);
            discountPriceTotal = discountPriceTotal + curGameDiscountPrice;
        }
        return discountPriceTotal;
    }

    async checkInCartGamesDataCorrect(gameCardDataInDialogWindow: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
    }, gameDataAfterAddAdvGame: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
    }, advGameDataInGamePage: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
        releaseDate: string;
        genreTags: string;
        reviewsSummary: string;
        reviewsCount: string;
    }, advGameDataInCartPage: {
        gameTitle: string;
        discountAmount: string;
        discountPrice: string;
        regularPrice: string;
    }) {
        Logger.info(`Check in cart game data`)
        await t.expect(gameDataAfterAddAdvGame.gameTitle === gameCardDataInDialogWindow.gameTitle)
            .ok(`Check initial game title didnt change`);
        await t.expect(gameDataAfterAddAdvGame.regularPrice === gameCardDataInDialogWindow.regularPrice)
            .ok(`Check initial game regular price didnt change`);
        await t.expect(gameDataAfterAddAdvGame.discountPrice === gameCardDataInDialogWindow.discountPrice)
            .ok(`Check initial game discount price didnt change`);
        await t.expect(advGameDataInCartPage.gameTitle === advGameDataInGamePage.gameTitle)
            .ok(`Check adv game title in cart page the same as in game list`);
        await t.expect(advGameDataInCartPage.regularPrice === advGameDataInGamePage.regularPrice)
            .ok(`Check adv game regular price in cart page the same as in game list`);
        await t.expect(advGameDataInCartPage.discountPrice === advGameDataInGamePage.discountPrice)
            .ok(`Check adv game discount price in cart page the same as in game list`);
    }

    async checkSumDiscountTheSameAsEstimatedTotal() {
        let discountTotal = await this.getSumDiscountPrices();
        discountTotal = +discountTotal.toFixed(2);
        let estimatedTotal = +(await (ShoppingCart.ESTIMATED_TOTAL_PRICE.innerText)).slice(1);
        estimatedTotal = +estimatedTotal.toFixed(2);
        await t.expect(discountTotal === estimatedTotal).ok(`Check sum discount prices the same as estimated total price`);
    }
}

export const ShoppingCartSteps = new ShoppingCartStepsImpl();