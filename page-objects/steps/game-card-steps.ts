import { Selector, t } from "testcafe";
import { GameCard, GameCardItem } from "../entities/game-card";
import { SubGenreGamePage } from "../pages/sub-genre-game-page";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";

export class GameCardStepsImpl extends GameCard {
    async hoverGameCardItem(nth: number, control: GameCardItem) {
        GameCard.getSelector(nth, control).hover();
    }

    async clickGameCardItem(nth: number, control: GameCardItem) {
        await GameCard.getSelector(nth, control).click();
    }

    async getInnerText(nth: number, control: GameCardItem) {
        return GameCard.getSelector(nth, control).innerText;
    }

    async getListOfVisibleTags(nth: number) {
        let listOfVisibleItems: string[] = [];
        let listItemsSelector = await GameCard.getSelector(nth, GameCardItem.GENRE_TAGS);
        let itemsCount = await GameCard.getSelector(nth, GameCardItem.GENRE_TAGS).count;
        for (let i = 0; i < itemsCount; i++) {
            listOfVisibleItems.push(await listItemsSelector.nth(i).innerText);
        }
        return listOfVisibleItems;
    }

    async isGameCardItemVisible(nth: number, control: GameCardItem) {
        return GameCard.getSelector(nth, control).visible;
    }

    async checkGameCardItemVisible(nth: number, control: GameCardItem, expect: boolean = true) {
        const gameCardTitle = await this.getInnerText(nth, GameCardItem.GAME_TITLE);
        await t.expect(await this.isGameCardItemVisible(nth, control)).eql(expect, `Check ${control} item in ${gameCardTitle} Game Card is ${expect ? 'visible' : 'not visible'}`);
    }

    async getMaxDiscountGameCardIndex() {
        let maxDiscount = 0;
        let cardIndex = 0;

        const len = await SubGenreGamePage.GAME_CARD_SELECTOR.count;

        for (let i = 0; i < len; i++) {
            let currDiscount = (await this.getInnerText(i, GameCardItem.DISCOUNT_LABEL)).slice(1, -1);
            console.log(`Current discount is: ${currDiscount}`)
            if (currDiscount > maxDiscount) {
                maxDiscount = currDiscount;
                cardIndex = i;
            }
        }
        return cardIndex;
    }

    async getTagArr(nth: number) {
        const tagCount = GameCard.getSelector(nth, GameCardItem.GENRE_TAGS).count;
        console.log(`Tags Count: ${await tagCount}`)
        const tagArr: string[] = [];
        for (let i = 0; i < tagCount; i++) {
            let tagName = GameCard.getSelector(nth, GameCardItem.GENRE_TAGS).nth(i);
            console.log(`current tag: ${tagName}`)
            tagArr.push(tagName);
        }
        console.log(`Array of tags: ${tagArr}`)
        return tagArr;
    }

    async getGameCardData(nth: number) {
        const gameCardDataInGameList = {
            gameTitle: await GameCardSteps.getInnerText(nth, GameCardItem.GAME_TITLE),
            discountAmount: (await this.getInnerText(nth, GameCardItem.DISCOUNT_LABEL)).slice(1, -1),
            discountPrice: await GameCardSteps.getInnerText(nth, GameCardItem.DISCOUNT_PRICE_LABEL),
            regularPrice: await GameCardSteps.getInnerText(nth, GameCardItem.REGULAR_PRICE_LABEL),
            releaseDate: new Date(await GameCardSteps.getInnerText(nth, GameCardItem.RELEASE_DATE)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            genreTags: ``,
            reviewsSummary: await GameCardSteps.getInnerText(nth, GameCardItem.REVIEW_SUMMARY),
            reviewsCount: (await GameCardSteps.getInnerText(nth, GameCardItem.REVIEW_COUNT)).slice(2, -13),
        }
        return gameCardDataInGameList
    }

}

export const GameCardSteps = new GameCardStepsImpl();