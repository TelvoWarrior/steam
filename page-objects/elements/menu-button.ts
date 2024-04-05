import { Selector } from "testcafe";
import { GenreItems, MainMenuButtonEnum, NewAndNoteworthy, RolePlayingItems } from "../enums/menu-enums";
import { BaseElement } from "./base-element";

export class MenuButton extends BaseElement {
    constructor(selector: string | Selector, elementName: string) {
        super(selector, elementName, 'Menu Button')
    }
}

export class MainMenuButton extends MenuButton{
    private readonly _menuSelector = ".store_nav_bg";
    public static readonly YOUR_STORE = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.YOUR_STORE), MainMenuButtonEnum.YOUR_STORE);
    public static readonly NEW_AND_NOTEWORTHY = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.NEW_AND_NOTEWORTHY), MainMenuButtonEnum.NEW_AND_NOTEWORTHY);
    public static readonly CATEGORIES = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.CATEGORIES), MainMenuButtonEnum.CATEGORIES);
    public static readonly POINTS_SHOP = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.POINTS_SHOP), MainMenuButtonEnum.POINTS_SHOP);
    public static readonly NEWS = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.NEWS), MainMenuButtonEnum.NEWS);
    public static readonly LABS = new MenuButton(Selector(`.store_nav_bg .tab`).withExactText(MainMenuButtonEnum.LABS), MainMenuButtonEnum.LABS);

    getMenuItem(item: MainMenuButton) {
        return new MenuButton(Selector(`${this._menuSelector} .tab`).withExactText(`${item}`), `${item}`)
    }
}

export class CategoriesMenu extends MenuButton{
    public static readonly ACTION = new MenuButton(Selector(`#genre_flyout`).find('div[data-genre-group="action"]').nth(1), GenreItems.ACTION);
    public static readonly ADVENTURE = new MenuButton(Selector(`#genre_flyout`).find('div[data-genre-group="adventure"]').nth(1), GenreItems.ADVENTURE);
    public static readonly RPG = new MenuButton(Selector(`#genre_flyout`).find(`div[data-genre-group="rpg"]`).nth(1), GenreItems.ROLE_PLAYING);
    public static readonly SIMULATION = new MenuButton(Selector(`#genre_flyout`).find('div[data-genre-group="simulation"]').nth(1), GenreItems.SIMULATION);
    public static readonly STRATEGY = new MenuButton(Selector(`#genre_flyout`).find('div[data-genre-group="strategy"]').nth(1), GenreItems.STRATEGY);
    public static readonly SPORTS_AND_RACING = new MenuButton(Selector(`#genre_flyout`).find('div[data-genre-group="sports_and_racing"]').nth(1), GenreItems.SPORTS_AND_RACING);
}

export class SubcategoryItem extends MenuButton {
    public static readonly ACTION_RPG = new MenuButton(Selector(`#genre_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${RolePlayingItems.ACTION_RPG}`),`${RolePlayingItems.ACTION_RPG}`);
    //...etc
}

export class NewAndNoteworthyItem extends MenuButton {
    public static readonly SPECIAL_OFFERS = new MenuButton(Selector(`#noteworthy_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${NewAndNoteworthy.SPECIAL_OFFERS}`), `${NewAndNoteworthy.SPECIAL_OFFERS}`);
    //...etc
}