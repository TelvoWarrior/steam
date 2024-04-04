import { Selector, fixture, t } from 'testcafe';
import { TEST_URL } from '../test-data/configuration';
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";

fixture('Steam Project')
    .page(TEST_URL)
    .beforeEach(async () => {
        await t.maximizeWindow();
    });

const enum PopUpGenreExpandContent {
    ACTION = 'action',
    ADVENTURE = 'adventure',
    ROLE_PLAYING = 'rpg',
    SIMULATION = 'simulation',
    STRATEGY = 'strategy',
    SPORTS_AND_RACING = 'sports_and_racing'
}

const actionSelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.ACTION}]`).nth(2);
const adventureSelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.ADVENTURE}]`).nth(2);
const roleplayingSelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.ROLE_PLAYING}]`).nth(2);
const simulationSelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.SIMULATION}]`).nth(2);
const strategySelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.STRATEGY}]`).nth(2);
const sportsAndRacingSelector = Selector(`div[data-genre-group=${PopUpGenreExpandContent.SPORTS_AND_RACING}]`).nth(2);

test('Test 1. Check that each category has minimum 1 subcategory', async () => {
    await t.hover(Selector('#genre_tab'));
    await t.expect(actionSelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.ACTION} category has minimum 1 subcategory`);
    await t.expect(adventureSelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.ADVENTURE} category has minimum 1 subcategory`);
    await t.expect(roleplayingSelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.ROLE_PLAYING} category has minimum 1 subcategory`);
    await t.expect(simulationSelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.SIMULATION} category has minimum 1 subcategory`);
    await t.expect(strategySelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.STRATEGY} category has minimum 1 subcategory`);
    await t.expect(sportsAndRacingSelector.find('a').exists).ok(`Check that ${PopUpGenreExpandContent.SPORTS_AND_RACING} category has minimum 1 subcategory`);
});

//селектор первой попавшейся игры из списка
const gameCardSelector = Selector(`div[class='y9MSdld4zZCuoQpRVDgMm']`);
//селектор видимого тега в карточке с игрой 'Action RPG'
const gameCardWithActionRpgTagSelector = gameCardSelector.find('a').withText('Action RPG').filterVisible();

test('Test 2. Check game in the list with Action RPG tag in genres list exists', async () => {

    //ховер над разделом 'Categories' в главном меню
    await t.hover(Selector('#genre_tab'));
    await t.wait(1000);
    //ховер меню айтема с текстом 'Action RPG'
    await t.hover(roleplayingSelector.find('a').withText('Action RPG'));
    await t.wait(1000);
    //клик меню айтема с текстом 'Action RPG'
    await t.click(roleplayingSelector.find('a').withText('Action RPG'));
    //без скролла не находит список игр, как будто он подгружается на страницу только при необходимости
    //поэтому делаем скролл к той секции и потом проверку
    await t.scrollIntoView(Selector('#SaleSection_13268'));
    await t.expect(gameCardWithActionRpgTagSelector.exists).ok(`Check that there is mimimum 1 game in the list with Action RPG tag in genres list`)

    //что бы перейти на страницу с игрой, нужно кликнуть на тег 'a' который находится в диве идущим перед родительским
    // await t.wait(1000);
    // await t.hover(gameTitleSelector);
    // await t.wait(1000);
    // await t.click(gameTitleSelector);
    // await t.wait(1000);
});

const outerContainerSelector = gameCardWithActionRpgTagSelector.parent(2);
const gameTitleSelector = outerContainerSelector.child(1).find('a');

test(`Test 3. Hover that game. Check that the game card changed its size and "Add to wishlist" icon appears`, async () => {
    //ховер над разделом 'Categories' в главном меню
    await t.hover(Selector('#genre_tab'));
    //ховер меню айтема с текстом 'Action RPG'
    await t.hover(roleplayingSelector.find('a').withText('Action RPG'));
    //клик меню айтема с текстом 'Action RPG'
    await t.click(roleplayingSelector.find('a').withText('Action RPG'));
    //без скролла не находит список игр, как будто он подгружается на страницу только при необходимости
    //поэтому делаем скролл к той секции и потом проверку
    await t.scrollIntoView(Selector('#SaleSection_13268'));
    //hover game, check size changed 'add to wishlist' appears

    //получаем внешний контейнер
    const outerOuterContainerSelector = Selector(outerContainerSelector).parent(0);
    //получаем значение ширины контейнера
    const containerWidth = await outerOuterContainerSelector.getStyleProperty('width')
    //выводим консоль полученое значение
    console.log(`Width before hover: ${containerWidth}`)
    //делаем ховер
    await t.hover(outerOuterContainerSelector);
    //получаем значение ширины контейнера во время ховера
    const containerWidthWhileHover = await outerOuterContainerSelector.getStyleProperty('width')
    //выводим в консоль
    console.log(`Width while hover: ${containerWidthWhileHover}`)

    //с помощью кода ниже, я выяснил, что кнопки Wishlist существуют на странице и, вроде бы как, считаются видимыми
    //если выбрать конкретную карточку с игрой и проверить существует ли кнопка, ответ будет true
    //если проверить видна ли кнопка, ответ будет false
    //соответственно, мы обращаемся к кнопке в конкретной карточке и делаем проверку
    await t.expect(containerWidth < containerWidthWhileHover).ok(`Check that the game card changed its size`)
    const whishListIconInCurrentContainer = outerOuterContainerSelector.find('div[class*="WishlistButton"]');
    console.log(`Is WishlistButton exists?: ${await whishListIconInCurrentContainer.exists}`)
    console.log(`Is WishlistButton visible?: ${await whishListIconInCurrentContainer.visible}`)
    await t.hover(outerOuterContainerSelector)
    console.log(`Is WishlistButton visible while hovering?: ${await whishListIconInCurrentContainer.visible}`)
    await t.expect(await whishListIconInCurrentContainer.visible).ok(`"Add to wishlist" icon appears while hovering game card`);
});

test.only(`Test 4. Go to New & Noteworthy -> Special Offers. Check that each game card has discount label and 2 prices.`, async () => {
    const noteWorthyMenuItemSelector = Selector('#noteworthy_tab');
    const specialOffersSelector = Selector(noteWorthyMenuItemSelector.nextSibling().find('a').withText('Special Offers'));
    const specialOffersListSectionSelector = Selector('#SaleSection_13268');
    const gameCardSelector = Selector(`div[class='y9MSdld4zZCuoQpRVDgMm']`);

    await t.hover(noteWorthyMenuItemSelector);
    await t.hover(specialOffersSelector);
    await t.click(specialOffersSelector);
    await t.scrollIntoView(specialOffersListSectionSelector);

    let maxDiscount = 0;
    let discountIndex = 0;

    for (let i = 0; i <= 11; i++) {
        await t.hover(gameCardSelector.nth(i));
        await t.expect(gameCardSelector.nth(i).find('span').withExactText('Add to Cart').exists).ok(`Check that each game card has discount has 'Add to Cart' button`);
        // await t.expect(gameCardSelector.nth(i).find('div[class*="StoreSalePrice"]').exists).ok(`Check that each game card has discount label`);

        if (await gameCardSelector.nth(i).find('div[class*="StoreSalePrice"]').exists) {
            let discountAmountOfCurrentGameCard = await Selector(gameCardSelector.nth(i).find('div[class="_2fpFvkG2gjtlAHB3ZxS-_7"]')).innerText
            let convertDiscountIntoNumber = +discountAmountOfCurrentGameCard.slice(1, 3);
            if (convertDiscountIntoNumber > maxDiscount) {
                maxDiscount = convertDiscountIntoNumber;
                discountIndex = i;
            }
        }
    }

    const firstGameCardWithMaxDiscount = gameCardSelector.nth(discountIndex)

    console.log(`Max discount is: ${maxDiscount} and it's index is ${discountIndex}`);
    // await t.wait(1000);
    // await t.hover(firstGameCardWithMaxDiscount);
    // await t.wait(1000);
    //TODO:develop how to and Check that the card changed its color

    const releaseDateOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class="_3eOdkTDYdWyo_U5-JPeer1"]');
    
    const genreTagsOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class="_3OSJsO_BdhSFujrHvCGLqV"]').find('a').filterVisible();
    
    const genreTagsOnGameCardCount = await genreTagsOnGameCardSelector.count;
    
    const reviewsSummaryOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class*="_2SbZztpb7hkhurwbFMdyhL"]').child(0);
    const reviewsCountOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class*="_2SbZztpb7hkhurwbFMdyhL"]').child(1);
    const priceOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class="_1EKGZBnKFWOr3RqVdnLMRN"]');
    const priceWithDiscountOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class="Wh0L8EnwsPV_8VAu8TOYr"]');
    const discountOnGameCardSelector = firstGameCardWithMaxDiscount.find('div[class="_2fpFvkG2gjtlAHB3ZxS-_7"]');

    const releaseDateOnGameCard = new Date(await releaseDateOnGameCardSelector.innerText).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const genreTagsOnGameCard: string[] = [];
    
    const reviewsSummaryOnGameCard = await reviewsSummaryOnGameCardSelector.innerText;
    const reviewsCountOnGameCard = (await reviewsCountOnGameCardSelector.innerText).slice(2, -13);
    const priceOnGameCard = await priceOnGameCardSelector.innerText;
    const priceWithDiscountOnGameCard = await priceWithDiscountOnGameCardSelector.innerText;
    const discountOnGameCard = await discountOnGameCardSelector.innerText;

    //добавляю теги со страницы с игрой в массив
    for (let i = 0; i < genreTagsOnGameCardCount; i++) {
        genreTagsOnGameCard.push(await genreTagsOnGameCardSelector.nth(i).innerText);
    }

    console.log(`Trying to select and print out releaseDateOnGameCard ${releaseDateOnGameCard}`);
    console.log(`Trying to print out count of genreTagsOnGameCardCount: ${genreTagsOnGameCardCount}`);
    console.log(`Trying to print out array of visible tags: ${genreTagsOnGameCard}`);
    console.log(`Trying to print out reviewsSummaryOnGameCard: ${reviewsSummaryOnGameCard}`);
    console.log(`Trying to print out reviewsCountOnGameCard: ${reviewsCountOnGameCard}`);
    console.log(`Trying to print out priceOnGameCard: ${priceOnGameCard}`);
    console.log(`Trying to print out priceWithDiscountOnGameCard: ${priceWithDiscountOnGameCard}`);
    console.log(`Trying to print out discountOnGameCard: ${discountOnGameCard}`);



    //     6. Go to the game page
    // Check the following:
    // - The opened page has the game name in the header;
    // - All data in the card at top of the page the same with the game popup:
    // release date, 
    // genres tags,
    // reviews summary (positive, negative), 
    // reviews count - on the page can't be more than in the popup, but difference isn't more than 20
    // - A buying card has the same prices and discount with the game card from previous page
    Logger.step(6, 'Go to the game page.');
    //получаю селектор названия игры
    const gameTitleSelector = gameCardSelector.nth(discountIndex).find('div[class*="StoreSaleWidgetTitle"]');
    //получаю само название игры
    const gameTitleName = await gameTitleSelector.innerText;
    console.log(gameTitleName);
    await t.hover(gameTitleSelector);
    //перехожу на страницу с игрой
    await t.click(gameTitleSelector);
    //получаю селектор названия игры на странице с игрой
    const gameTitleOnGamePage = Selector('#appHubAppName');
    //получаю название игры на странице с игрой
    const gameNameOnGamePage = await gameTitleOnGamePage.innerText;
    //делаю проверку на соответствие названия игры в списке с названием игры на странице
    await t.expect(gameTitleName === gameNameOnGamePage).ok(`The opened page has the game name in the header`);
    const releaseDateOnGamePageSelector = Selector('div[class="release_date"]').child(1);
    const genreTagsOnGamePageSelector = Selector('#glanceCtnResponsiveRight').find('a').filterVisible();
    const genreTagsOnGamePageCount = await genreTagsOnGamePageSelector.count;
    const reviewsSummaryOnGamePageSelector = Selector('#userReviews').child(1).child(1).find('span').nth(0);
    const reviewsCountOnGamePageSelector = Selector('#userReviews').child(1).child(1).find('span').nth(1);
    const priceOnGamePageSelector = Selector('div[class="game_purchase_action"]').find('div[class="discount_original_price"]');
    const priceWithDiscountOnGamePageSelector = Selector('div[class="game_purchase_action"]').find('div[class="discount_final_price"]');
    const discountOnGamePageSelector = Selector('div[class="game_purchase_action"]').find('div[class="discount_pct"]');

    const releaseDateOnGamePage = new Date(await releaseDateOnGamePageSelector.innerText).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const genreTagsOnGamePage: string[] = [];
    const reviewsSummaryOnGamePage = await reviewsSummaryOnGamePageSelector.innerText;
    const reviewsCountOnGamePage = (await reviewsCountOnGamePageSelector.innerText).slice(1, -1);
    const priceOnGamePage = await priceOnGamePageSelector.innerText;
    const priceWithDiscountOnGamePage = (await priceWithDiscountOnGamePageSelector.innerText).slice(0, 5);
    const discountOnGamePage = await discountOnGamePageSelector.innerText;

    //добавляю теги со страницы с игрой в массив
    for (let i = 0; i < genreTagsOnGamePageCount; i++) {
        genreTagsOnGamePage.push(await genreTagsOnGamePageSelector.nth(i).innerText);
    }

    console.log(`Trying to select and print out releaseDateOnGamePage ${releaseDateOnGamePage}`);
    console.log(`Trying to print out count of genreTagsOnGamePageCount: ${genreTagsOnGamePageCount}`);
    console.log(`Trying to print out array of visible tags: ${genreTagsOnGamePage}`);
    console.log(`Trying to print out reviewsSummaryOnGamePage: ${reviewsSummaryOnGamePage}`);
    console.log(`Trying to print out reviewsCountOnGamePage: ${reviewsCountOnGamePage}`);
    console.log(`Trying to print out priceOnGamePage: ${priceOnGamePage}`);
    console.log(`Trying to print out priceWithDiscountOnGamePage: ${priceWithDiscountOnGamePage}`);
    console.log(`Trying to print out discountOnGamePage: ${discountOnGamePage}`);

    await t.expect(releaseDateOnGameCard === releaseDateOnGamePage).ok('Check date on the game card and the game page are the same');
    // await t.expect('').ok('Check tags on the game card and the game page are the same');
    await t.expect(reviewsSummaryOnGameCard === reviewsSummaryOnGamePage).ok('Check review on the game card and the game page are the same');
    // await t.expect(reviewsCountOnGameCard === reviewsCountOnGamePage).ok('Check review counts on the game card and the game page are the same');
    await t.expect(priceOnGameCard === priceOnGamePage).ok('Check prices on the game card and the game page are the same');
    await t.expect(priceWithDiscountOnGameCard === priceWithDiscountOnGamePage).ok('Check discount prices on the game card and the game page are the same');
    await t.expect(discountOnGameCard === discountOnGamePage).ok('Check discounts on the game card and the game page are the same');

    //     7. Click add to card button -> View cart
    // Check that Your Shopping Cart page is opened, game name, prices in the game card and total price are the same with the previous pages

    //селектор для кнопки 'Add to Cart' на странице с игрой
    const addToCartButtonSelector = Selector('div[class="game_purchase_action"]').find('div[class="btn_addtocart"]').find('a[id*="btn_add_to_cart"]');
    await t.hover(addToCartButtonSelector);
    await t.click(addToCartButtonSelector);

    //селектор для кнопки 'View My Cart'
    const viewMyCartButtonSelector = Selector('button').withText('View My Cart');
    await t.hover(viewMyCartButtonSelector);
    await t.click(viewMyCartButtonSelector);

    let gameTitle = gameNameOnGamePage;

    //селектор для выбора дива с конкретным названием игры
    let gameTitleShoppingCartSelector = Selector('div').withExactText(`${gameTitle}`);

    //селектор для выбора дива в котором содержится суммарная стоимость по корзине
    const totalPriceShoppingCartSelector = Selector('div[class*="_3HIve50RR17shqpJqmrUps"]').find('div[class="_2WLaY5TxjBGVyuWe_6KS3N"]');

    //получаем название игры
    let gameTitleShoppingCartInnerText = await gameTitleShoppingCartSelector.innerText;

    //получаем суммарную стоимость по корзине
    let estimatedTotalCartInnerText = await totalPriceShoppingCartSelector.innerText;

    await t.expect(gameTitleShoppingCartInnerText === gameNameOnGamePage).ok('Check game title is the same as in the previous page');
    await t.expect(estimatedTotalCartInnerText === priceWithDiscountOnGamePage).ok('Check total price is the same as in the previous page');
    //     8. Click any adverting game card on the right. Click Add to Card
    // Check the following:
    // - There are 2 games in the card
    // - Each game has correct prices and name
    // - Total price is the sum of the lower prices

    //выбираю рандомную игру из 3 маленьких
    const randomNumber = Math.floor(Math.random() * 3);
    const advGameSelector = Selector('div[class*="Btar9KImKsrj4f4gudcqh"]').nth(randomNumber);
    await t.click(advGameSelector);

    let isChooseAgeWindowAppears = await Selector('#app_agegate').visible;

    if (isChooseAgeWindowAppears) {
        const ageYearSelector = Selector('select[name="ageYear"]')
        const optionsSelector = ageYearSelector.find('option');
        await t.click(ageYearSelector);
        await t.click(optionsSelector.nth(0));
        await t.click(Selector('#view_product_page_btn'));
    }

    const priceOnAdvGamePageSelector = Selector('div[class="game_purchase_action"]').find('div[class="discount_original_price"]');
    const priceWithDiscountOnAdvGamePageSelector = Selector('div[class="game_purchase_action"]').find('div[class="discount_final_price"]');
    const priceOnAdvGamePage = await priceOnGamePageSelector.innerText;
    const priceWithDiscountOnAdvGamePage = (await priceWithDiscountOnAdvGamePageSelector.innerText).slice(0, -4);
    
    let name = 'Suzerain';
    
    const allGamesInCartSelector = Selector('div[class="_3SgHVt1Zp2MeobFUVwwJ2q"]').find('div[class*="_2KiPYlH9C9k_-RZZgGJiF5"]');
    
    (name = "something") => {}
    let particularGameTitleSelector = Selector('div[class="yW_j0xWpHbU537U49A8C9"]').find('div').withExactText(`${name}`);
    let particularGamePriceInCartSelector = particularGameTitleSelector.parent(0).nextSibling(1).find('div[class="_2WBvzE2CywKDLD0QTnbmUE"]');


    await t.click(addToCartButtonSelector);
    await t.click(viewMyCartButtonSelector);

    await t.expect(await allGamesInCartSelector.count === 2).ok('Check there are two games in the cart');
    
    console.log(`priceWithDiscountOnGamePage: ${priceWithDiscountOnGamePage}`)
    console.log(`current title ${name}: ${await particularGamePriceInCartSelector.innerText}`)
    await t.expect(priceWithDiscountOnGamePage === await particularGamePriceInCartSelector.innerText)
        .ok('Check the first game price in the cart the same as in game page');

        name ='God of War';
    console.log(`priceWithDiscountOnAdvGamePage ${priceWithDiscountOnAdvGamePage}`)
    console.log(`current title ${name}: ${await particularGamePriceInCartSelector.innerText}`)
    await t.expect(priceWithDiscountOnAdvGamePage === await particularGamePriceInCartSelector.innerText)
        .ok('Check the second game price in the cart the same as in game page');
    
    //По какой-то причине, товары в корзине могут быть расположены не в том порядке, в котором они добавлялись
    //Как сделать проверку стоимость конкретного товара не ссылаясь на его позицию в корзине?
    //Нужно сделать селектор с переменной, которая будет принимать название игры
});
