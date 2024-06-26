import { t } from "testcafe";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { TEST_URL } from "../test-data/configuration";
import { MenuSteps } from "../page-objects/steps/menu-steps";
import { CategoriesMenu, MainMenu, NewAndNoteworthyItem } from "../page-objects/elements/menu-item";
import { SubGenreGamePageSteps } from "../page-objects/steps/sub-genre-game-page-steps";
import { GameCardSteps } from "../page-objects/steps/game-card-steps";
import { GameCardItem } from "../page-objects/entities/game-card";
import { GamePageSteps } from "../page-objects/steps/game-page-steps";
import { GamePage } from "../page-objects/pages/game-page";
import { DialogWindow } from "../page-objects/entities/dialog-window";
import { DialogWindowSteps } from "../page-objects/steps/dialog-window-steps";
import { ShoppingCartSteps } from "../page-objects/steps/shopping-cart-steps";

fixture('Steam Project')
    .page(TEST_URL);

test('Steam test', async () => {
    await t.maximizeWindow();
    Logger.step(1, 'First step');
    await MenuSteps.hoverMenuItem(MainMenu.NEW_AND_NOTEWORTHY);
    await MenuSteps.clickMenuItem(NewAndNoteworthyItem.SPECIAL_OFFERS);
    await SubGenreGamePageSteps.scrollIntoGameList(); 
    const gameDataInGameList = await GameCardSteps.getGameCardData(0);
    await GameCardSteps.clickGameCardItem(0, GameCardItem.GAME_TITLE);
    const gameDataInGamePage = await GamePageSteps.getGameCardData();
    await GamePageSteps.clickGamePageItem(GamePage.ADD_TO_CART);
    const gameDataInDialogWindow = await DialogWindowSteps.getGameCardData();
    await DialogWindowSteps.clickDialogWindowItem(DialogWindow.VIEW_MY_CART);
    const gameDataInCartPage = await ShoppingCartSteps.getGameCardData();
    console.log(`Game Data in Game List: ${Object.values(gameDataInGameList)}`);
    console.log(`Game Data in Game Page: ${Object.values(gameDataInGamePage)}`);
    console.log(`Game Data in Dialog Window: ${Object.values(gameDataInDialogWindow)}`);
    console.log(`Game Data in Cart Page: ${Object.values(gameDataInCartPage)}`); 
    console.log(`Job's done!`);
});

