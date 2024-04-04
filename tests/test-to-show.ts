import { t } from "testcafe";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { TEST_URL } from "../test-data/configuration";
import { MenuSteps } from "../page-objects/steps/menu-steps";
import { CategoriesMenu, MainMenu, NewAndNoteworthyItem, SubcategoryItem } from "../page-objects/elements/menu-item";
import { SubGenreGamePageSteps } from "../page-objects/steps/sub-genre-game-page-steps";
import { GameCardSteps } from "../page-objects/steps/game-card-steps";
import { GameCardItem } from "../page-objects/entities/game-card";
import { GameTag } from "../page-objects/enums/game-tags";
import { SubGenreGamePage } from "../page-objects/pages/sub-genre-game-page";
import { GamePageSteps } from "../page-objects/steps/game-page-steps";
import { GamePage } from "../page-objects/pages/game-page";
import { DialogWindow } from "../page-objects/entities/dialog-window";
import { DialogWindowSteps } from "../page-objects/steps/dialog-window-steps";
import { ShoppingCartSteps } from "../page-objects/steps/shopping-cart-steps";
import { ShoppingCart } from "../page-objects/pages/shopping-cart";

fixture('Steam Project')
    .page(TEST_URL);

test('Steam test', async () => {
    await t.maximizeWindow();
    Logger.step(1, 'Open Categories menu. Check each category has subcategory');
    await MenuSteps.hoverMenuItem(MainMenu.CATEGORIES);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.ACTION);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.ADVENTURE);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.RPG);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.SIMULATION);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.STRATEGY);
    await MenuSteps.checkCategoryHasSubcategory(CategoriesMenu.SPORTS_AND_RACING);

    Logger.step(2, 'Select Action RPG category. Check there is at least 1 game with Action RPG tag within genres list');
    await MenuSteps.clickMenuItem(SubcategoryItem.ACTION_RPG);
    await SubGenreGamePageSteps.checkGameCardWithSpecifiedTagExists(GameTag.ACTION_RPG);

    Logger.step(3, `Hover game with Action RPG tag. Check its size changes and Add to wishlist button appears`);
    const gameCardIndex = await SubGenreGamePageSteps.getGameCardIndexWithSpecifiedTag(GameTag.ACTION_RPG);
    await SubGenreGamePageSteps.checkGameCardSizeChangedAfterHover(gameCardIndex);
    await GameCardSteps.checkGameCardItemVisible(gameCardIndex, GameCardItem.WISHLIST_BUTTON);

    Logger.step(4, `Go to New & Noteworthy -> Special Offers. Check that each game card has discount label and 2 prices.`);
    await MenuSteps.hoverMenuItem(MainMenu.NEW_AND_NOTEWORTHY);
    await MenuSteps.clickMenuItem(NewAndNoteworthyItem.SPECIAL_OFFERS);
    await SubGenreGamePageSteps.scrollIntoGameList();
    const len = await SubGenreGamePage.GAME_CARD_SELECTOR.count;
    for (let i = 0; i < len-1; i++) {
        console.log(`Check ${await GameCardSteps.getInnerText(i, GameCardItem.GAME_TITLE)}`);
        await GameCardSteps.checkGameCardItemVisible(i, GameCardItem.DISCOUNT_LABEL);
        await GameCardSteps.checkGameCardItemVisible(i, GameCardItem.DISCOUNT_PRICE_LABEL);
        await GameCardSteps.checkGameCardItemVisible(i, GameCardItem.REGULAR_PRICE_LABEL);
    }
    
    Logger.step(5, `Hover game with the biggest discount. Check that the card changed its color`)
    const maxDiscountIndex = await GameCardSteps.getMaxDiscountGameCardIndex()
    await GameCardSteps.hoverGameCardItem(maxDiscountIndex, GameCardItem.GAME_TITLE);

    Logger.step(6, `Go to the game page. Check...`)
    const gameCardDataInGameList = await GameCardSteps.getGameCardData(maxDiscountIndex);
    await GameCardSteps.clickGameCardItem(maxDiscountIndex, GameCardItem.GAME_TITLE);
    const gameCardDataInGamePage = await GamePageSteps.getGameCardData();
    await GamePageSteps.checkGamePageTitleExists(GamePage.TITLE);
    await GamePageSteps.checkGameDataTheSameAsInGameList(gameCardDataInGameList, gameCardDataInGamePage);

    Logger.step(7, `Click add to card button -> View cart. Check that Your Shopping Cart page is opened, game name, prices in the game card and total price are the same with the previous pages`)
    await GamePageSteps.clickGamePageItem(GamePage.ADD_TO_CART);
    const gameCardDataInDialogWindow = await DialogWindowSteps.getGameCardData();
    await DialogWindowSteps.clickDialogWindowItem(DialogWindow.VIEW_MY_CART);
    const gameCardDataInCartPage = await ShoppingCartSteps.getGameCardData();
    await ShoppingCartSteps.checkShoppingCartPageOpened(ShoppingCart.PAGE_TITLE);
    await ShoppingCartSteps.checkGameCardData(gameCardDataInGameList, gameCardDataInGamePage, gameCardDataInDialogWindow, gameCardDataInCartPage);

    Logger.step(8, `Click any adverting game card. Click Add to Card. Check...`)
    await ShoppingCartSteps.clickRandomAdvGame();
    const advGameDataInGamePage = await GamePageSteps.getGameCardData();
    await GamePageSteps.clickGamePageItem(GamePage.ADD_TO_CART);
    await DialogWindowSteps.clickDialogWindowItem(DialogWindow.VIEW_MY_CART);
    const advGameDataInCartPage = await ShoppingCartSteps.getGameCardData(0);
    await ShoppingCartSteps.checkGamesAmountInShoppingCart(2);
    const gameDataAfterAddAdvGame = await ShoppingCartSteps.getGameCardData(1);
    await ShoppingCartSteps.checkInCartGamesDataCorrect(gameCardDataInDialogWindow, gameDataAfterAddAdvGame, advGameDataInGamePage, advGameDataInCartPage);
    await ShoppingCartSteps.checkSumDiscountTheSameAsEstimatedTotal();
});

