import { t } from "testcafe";
import { SubGenreGamePage } from "../pages/sub-genre-game-page";
import { GameCardItem } from "../entities/game-card";
import { GameCardSteps } from "./game-card-steps";

export class SubGenreGamePageStepsImpl {
    async hoverGameCard(nth: number) {
        await this.scrollIntoGameList()
        await t.hover(SubGenreGamePage.GAME_CARD_SELECTOR.nth(nth));
    }

    async scrollIntoGameList() {
        await t.scrollIntoView(SubGenreGamePage.GAME_CARDS_LIST);
    }

    async checkGameCardWithSpecifiedTagExists(tagName:string) {
        await this.scrollIntoGameList()
        await t.expect(await SubGenreGamePage.GAME_CARD_SELECTOR.find(`a`).withExactText(tagName).visible).ok(`Check game card with ${tagName} exists`);
    }

    async selectGameCardWithSpecifiedTag(tagName:string) {
        const gameCardIndex = await this.getGameCardIndexWithSpecifiedTag(tagName);
        await GameCardSteps.clickGameCardItem(gameCardIndex, GameCardItem.GAME_TITLE);
    }

    async getGameCardIndexWithSpecifiedTag(tagName:string) {
        await this.scrollIntoGameList()
        const len = await SubGenreGamePage.GAME_CARD_SELECTOR.count;
        for (let i = 0; i < len; i++) {
            const tagList = await GameCardSteps.getListOfVisibleTags(i);
            if (tagList.includes(tagName)){return i}
        }
    }

    
}

export const SubGenreGamePageSteps = new SubGenreGamePageStepsImpl();