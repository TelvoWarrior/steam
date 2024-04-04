import { t } from "testcafe";
import { MenuItem } from "../elements/menu-item";

export class MenuStepsImpl {
    async hoverMenuItem(item: MenuItem) {
        await item.hover();
    }
    async clickMenuItem(item: MenuItem) {
        await item.click();
    }
    async checkMenuItemExists(item: MenuItem) {
        await t.expect(item.exists).ok(`Check ${item} exists`);
    }
    async checkMenuItemVisible(item: MenuItem) {
        await t.expect(item.visible).ok(`Check ${item} visible`);
    }

    async checkCategoryHasSubcategory(item: MenuItem) {
        await t.expect(this.getParentSelector(item).nextSibling(0).find('a').exists).ok(`Check ${item} category has subcategory`);
    }

    private getParentSelector(item: MenuItem) {
        return item.parentSelector;
    }
}

export const MenuSteps = new MenuStepsImpl();
