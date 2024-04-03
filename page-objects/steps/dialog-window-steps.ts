import { t } from "testcafe";
import { DialogWindow, DialogWindowItem } from "../entities/dialog-window";
import { BaseElement } from "../elements/base-element";

export class DialogWindowStepsImpl extends DialogWindow {

    async clickDialogWindowItem(control: BaseElement) {
        await control.click();
    }

    async getInnerText(control: BaseElement) {
        return await control.innerText;
    }

    async getGameCardData() {
        const gameCardDataInDialogWindow = {
            gameTitle: await DialogWindowSteps.getInnerText(DialogWindow.GAME_TITLE),
            discountAmount: ((await DialogWindowSteps.getInnerText(DialogWindow.DISCOUNT_AMOUNT)).slice(1, -1)),
            discountPrice: await DialogWindowSteps.getInnerText(DialogWindow.DISCOUNT_PRICE),
            regularPrice: await DialogWindowSteps.getInnerText(DialogWindow.REGULAR_PRICE),
        }
        return gameCardDataInDialogWindow
    }
}

export const DialogWindowSteps = new DialogWindowStepsImpl();