import { t } from "testcafe";
import { MenuButton } from "../elements/menu-button";

export class MenuStepsImpl {
    async hoverMenuButton(item: MenuButton) {
        await item.hover();
    }
    async clickMenuButton(item: MenuButton) {
        await item.click();
    }
    async checkMenuButtonExists(item: MenuButton) {
        await t.expect(item.exists).ok(`Check ${item} exists`);
    }
    async checkMenuButtonVisible(item: MenuButton) {
        await t.expect(item.visible).ok(`Check ${item} visible`);
    }

    async checkCategoryHasSubcategory(item: MenuButton) {
        await t.expect(this.getParentSelector(item).nextSibling(0).find('a').exists).ok(`Check ${item} category has subcategory`);
    }

    private getParentSelector(item: MenuButton) {
        return item.parentSelector;
    }
}

export const MenuSteps = new MenuStepsImpl();
