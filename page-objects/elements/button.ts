import { BaseElement } from "./base-element";

export class Button extends BaseElement {
    constructor(selector: string | Selector, elementName: string) {
        super(selector, elementName, 'Button')
    }
}