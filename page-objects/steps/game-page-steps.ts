import { t } from "testcafe";
import { Label } from "../elements/label";
import { GamePage } from "../pages/game-page";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";

export class GamePageStepsImpl extends GamePage {
    async hoverGamePageItem(control: Label) {
        await control.hover();
    }

    async clickGamePageItem(control: Label) {
        await control.click();
    }

    async getInnerText(control: Label) {
        return await control.innerText;
    }

    async getGameCardData() {
        const gameCardDataInGamePage = {
            gameTitle: await GamePageSteps.getInnerText(GamePage.TITLE),
            discountAmount: (await GamePageSteps.getInnerText(GamePage.DISCOUNT_AMOUNT)).slice(1, -1),
            discountPrice: (await GamePageSteps.getInnerText(GamePage.DISCOUNT_PRICE)).slice(0, -4),
            regularPrice: await GamePageSteps.getInnerText(GamePage.REGULAR_PRICE),
            releaseDate: new Date(await GamePageSteps.getInnerText(GamePage.RELEASE_DATE)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            genreTags: ``,
            reviewsSummary: await GamePageSteps.getInnerText(GamePage.REVIEW_SUMMARY),
            reviewsCount: (await GamePageSteps.getInnerText(GamePage.REVIEW_COUNT)).slice(1, -1),
        }

        return gameCardDataInGamePage
    }

    async checkGameDataTheSameAsInGameList(DataInGameList: {
        releaseDate: string;
        reviewsSummary: string;
        reviewsCount: string;
        discountPrice: string;
        regularPrice: string;
    }, DataInGamePage: {
        releaseDate: string;
        reviewsSummary: string;
        reviewsCount: string;
        discountPrice: string;
        regularPrice: string;
    }) {
        await t.expect(DataInGameList === DataInGamePage).ok(`Check ${Object.values(DataInGameList)} the same as ${Object.values(DataInGamePage)}`);
    }

    async checkGamePageTitleExists(title: Label) {
        Logger.info(`Checking ${await title.innerText} title existence`);
        await t.expect(title.exists).ok(`Check ${title} title in game page exists`);
    }
}

export const GamePageSteps = new GamePageStepsImpl();