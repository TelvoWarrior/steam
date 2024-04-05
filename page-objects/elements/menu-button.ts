import { Selector } from "testcafe";
import { MainMenuButtonEnum, NewAndNoteworthy, RolePlayingItems } from "../enums/menu-enums";
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
export class CategoriesMenuEnum {
    private constructor(public readonly name, public readonly propertyName) {
 
    }
    public static readonly ACTION = new CategoriesMenuEnum("Action", "action");
    public static readonly ADVENTURE = new CategoriesMenuEnum("Adventure", "adventure");
    public static readonly RPG = new CategoriesMenuEnum("Role-Playing", "rpg");
    public static readonly SIMULATION = new CategoriesMenuEnum("Simulation", "simulation");
    public static readonly STRATEGY = new CategoriesMenuEnum("Strategy", "strategy");
    public static readonly SPORTS_AND_RACING = new CategoriesMenuEnum("Sports & Racing", "sports_and_racing");
    //...etc
}
export class CategoriesMenu extends MenuButton{
    private static readonly _selectorHelper = Selector(`#genre_flyout`);
    public static readonly ACTION = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.ACTION.propertyName}]`).nth(1), CategoriesMenuEnum.ACTION.name);
    public static readonly ADVENTURE = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.ADVENTURE.propertyName}]`).nth(1), CategoriesMenuEnum.ADVENTURE.name);
    public static readonly RPG = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.RPG.propertyName}]`).nth(1), CategoriesMenuEnum.RPG.name);
    public static readonly SIMULATION = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.SIMULATION.propertyName}]`).nth(1), CategoriesMenuEnum.SIMULATION.name);
    public static readonly STRATEGY = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.STRATEGY.propertyName}]`).nth(1), CategoriesMenuEnum.STRATEGY.name);
    public static readonly SPORTS_AND_RACING = new MenuButton(this._selectorHelper.find(`div[data-genre-group=${CategoriesMenuEnum.SPORTS_AND_RACING.propertyName}]`).nth(1), CategoriesMenuEnum.SPORTS_AND_RACING.name);
}

export class SubcategoryItem extends MenuButton {
    public static readonly ACTION_RPG = new MenuButton(Selector(`#genre_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${RolePlayingItems.ACTION_RPG}`),`${RolePlayingItems.ACTION_RPG}`);
    //...etc
}

export class NewAndNoteworthyItem extends MenuButton {
    public static readonly SPECIAL_OFFERS = new MenuButton(Selector(`#noteworthy_flyout`).find(`a[class="popup_menu_item"]`).withExactText(`${NewAndNoteworthy.SPECIAL_OFFERS}`), `${NewAndNoteworthy.SPECIAL_OFFERS}`);
    //...etc
}