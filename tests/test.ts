import { t } from "testcafe";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { TEST_URL } from "../test-data/configuration";
import { MenuSteps } from "../page-objects/steps/menu-steps";
import { CategoriesMenu, MainMenuButton, NewAndNoteworthyItem } from "../page-objects/elements/menu-button";
import { SubGenreGamePageSteps } from "../page-objects/steps/sub-genre-game-page-steps";
import { GameCardSteps } from "../page-objects/steps/game-card-steps";
import { GameCardItem } from "../page-objects/panels/game-card";
import { GamePageSteps } from "../page-objects/steps/game-page-steps";
import { GamePage } from "../page-objects/pages/game-page";
import { DialogWindow } from "../page-objects/panels/dialog-window";
import { DialogWindowSteps } from "../page-objects/steps/dialog-window-steps";
import { ShoppingCartSteps } from "../page-objects/steps/shopping-cart-steps";
import { MainMenuButtonEnum } from "../page-objects/enums/menu-enums";

fixture('Steam Project')
    .page(TEST_URL);

test('Steam test', async () => {
    await t.maximizeWindow();
    // Logger.step(1, 'First step');
    // await MenuSteps.hoverMenuButton(MainMenu.NEW_AND_NOTEWORTHY);
    // await MenuSteps.clickMenuButton(NewAndNoteworthyItem.SPECIAL_OFFERS);
    // await SubGenreGamePageSteps.scrollIntoGameList(); 
    // const gameDataInGameList = await GameCardSteps.getGameCardData(0);
    // await GameCardSteps.clickGameCardItem(0, GameCardItem.GAME_TITLE);
    // const gameDataInGamePage = await GamePageSteps.getGameCardData();
    // await GamePageSteps.clickGamePageItem(GamePage.ADD_TO_CART);
    // const gameDataInDialogWindow = await DialogWindowSteps.getGameCardData();
    // await DialogWindowSteps.clickDialogWindowItem(DialogWindow.VIEW_MY_CART);
    // const gameDataInCartPage = await ShoppingCartSteps.getGameCardData();
    // console.log(`Game Data in Game List: ${Object.values(gameDataInGameList)}`);
    // console.log(`Game Data in Game Page: ${Object.values(gameDataInGamePage)}`);
    // console.log(`Game Data in Dialog Window: ${Object.values(gameDataInDialogWindow)}`);
    // console.log(`Game Data in Cart Page: ${Object.values(gameDataInCartPage)}`); 
    // console.log(`Job's done!`);

    // console.log(`Here's MainMenuItem keys: ${Object.keys(MainMenuItem)}`)
    // console.log(`Here's MainMenuItem values: ${Object.values(MainMenuItem)}`)
    // console.log(`Here's MainMenuItem key-value pairs: ${Object.entries(MainMenuItem)}`)
    // console.log(`Trying to printout 'New & Noteworthy' key in not obvious way: ${Object.entries(MainMenuItem)[1][0]}`)
    // console.log(`Trying to printout 'New & Noteworthy' value in not obvious way: ${Object.entries(MainMenuItem)[1][1]}`)
    // let x = Object.keys(MainMenuItem)
});

