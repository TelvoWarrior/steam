import { Selector, t } from 'testcafe';
import { Logger } from 'testcafe-reporter-acd-html-reporter/lib/Logger';

export abstract class BaseElement {
    protected _selector: Selector;
    protected _elementName: string;
    private _elementType: string;

    constructor(selector: string | Selector, elementName: string, elementType: string) {
        this._selector = typeof selector === 'string' ? Selector(selector) : selector;
        this._elementName = elementName;
        this._elementType = elementType;
    }

    get FullElementName() {
        return `'${this._elementType}: ${this._elementName}'`;
    }

    get text() {
        Logger.info(`Getting text content from ${this.FullElementName}`);
        return this._selector.textContent.then(text => text.trim());
    }

    get exists() {
        Logger.info(`Check if element exists: ${this.FullElementName}`);
        return this._selector.exists;
    }

    get visible() {
        Logger.info(`Check if element visible: ${this.FullElementName}`);
        return this._selector.filterVisible().exists;
    }

    get disabled() {
        Logger.info(`Check if element disabled: ${this.FullElementName}`);
        return this._selector.hasAttribute('disabled');
    }

    get innerText() {
        Logger.info(`Get element's inner text: ${this.FullElementName}`);
        return this._selector.innerText;
    }

    get count() {
        Logger.info(`Check elements count: ${this.FullElementName}`);
        return this._selector.count;
    }

    get parentSelector() {
        Logger.info(`Get parent selector: ${this.FullElementName}`);
        return this._selector.parent(0);
    }

    async click() {
        Logger.info(`Click of ${this.FullElementName}`);
        await t.click(this._selector);
    }

    async hover() {
        Logger.info(`Move mouse to ${this.FullElementName}`);
        await t.hover(this._selector);
    }

    async getAttribute(name: string) {
        Logger.info(`Getting value of ${name} attribute in ${this.FullElementName}`);
        return await this._selector.getAttribute(name);
    }
}