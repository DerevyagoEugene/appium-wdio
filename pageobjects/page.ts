import { ChainablePromiseElement } from "webdriverio";

export default abstract class Page {

    private uniqueElement: ChainablePromiseElement<WebdriverIO.Element>;

    constructor(locator: string) {
        this.uniqueElement = $(locator);
    }

    async isPageDisplayed(): Promise<boolean> {
        await this.uniqueElement.waitForDisplayed();
        return this.uniqueElement.isSelected();
    }
}
