import { Selector } from "testcafe";
import { GenreItems, MainMenuItem, NewAndNoteworthy, RolePlayingItems } from "../enums/menu-enums";
import { BaseElement } from "./base-element";

export class MenuItem extends BaseElement {
    constructor(selector: string | Selector, elementName: string) {
        super(selector, elementName, 'Menu Item')
    }
}

export class MainMenu extends MenuItem{
    public static readonly YOUR_STORE = new MenuItem(Selector(`#foryou_tab`), MainMenuItem.YOUR_STORE);
    public static readonly NEW_AND_NOTEWORTHY = new MenuItem(Selector(`#noteworthy_tab`), MainMenuItem.NEW_AND_NOTEWORTHY);
    public static readonly CATEGORIES = new MenuItem(Selector(`#genre_tab`), MainMenuItem.CATEGORIES);
    public static readonly POINTS_SHOP = new MenuItem(Selector(`#genre_tab`).nextSibling(1), MainMenuItem.POINTS_SHOP);
    public static readonly NEWS = new MenuItem(Selector(`#genre_tab`).nextSibling(2), MainMenuItem.NEWS);
    public static readonly LABS = new MenuItem(Selector(`#genre_tab`).nextSibling(3), MainMenuItem.LABS);
}

export class CategoriesMenu extends MenuItem{
    public static readonly ACTION = new MenuItem(Selector(`#genre_flyout`).find('div[data-genre-group="action"]').nth(1), GenreItems.ACTION);
    public static readonly ADVENTURE = new MenuItem(Selector(`#genre_flyout`).find('div[data-genre-group="adventure"]').nth(1), GenreItems.ADVENTURE);
    public static readonly RPG = new MenuItem(Selector(`#genre_flyout`).find(`div[data-genre-group="rpg"]`).nth(1), GenreItems.ROLE_PLAYING);
    public static readonly SIMULATION = new MenuItem(Selector(`#genre_flyout`).find('div[data-genre-group="simulation"]').nth(1), GenreItems.SIMULATION);
    public static readonly STRATEGY = new MenuItem(Selector(`#genre_flyout`).find('div[data-genre-group="strategy"]').nth(1), GenreItems.STRATEGY);
    public static readonly SPORTS_AND_RACING = new MenuItem(Selector(`#genre_flyout`).find('div[data-genre-group="sports_and_racing"]').nth(1), GenreItems.SPORTS_AND_RACING);
}

export class SubcategoryItem extends MenuItem {
    public static readonly ACTION_RPG = new MenuItem(Selector(`#genre_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${RolePlayingItems.ACTION_RPG}`),`${RolePlayingItems.ACTION_RPG}`);
    //...etc
}

export class NewAndNoteworthyItem extends MenuItem {
    public static readonly SPECIAL_OFFERS = new MainMenu(Selector(`#noteworthy_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${NewAndNoteworthy.SPECIAL_OFFERS}`), `${NewAndNoteworthy.SPECIAL_OFFERS}`);
    //...etc
}