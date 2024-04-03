import { BaseElement } from "./base-element";

export class Label extends BaseElement {
    constructor(selector: string | Selector, elementName: string) {
        super(selector, elementName, 'Label')
    }
}