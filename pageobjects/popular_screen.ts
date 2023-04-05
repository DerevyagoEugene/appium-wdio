import { convert } from "../utils/covertions";
import Swipe from "../components/swipe";
import Page from "./page";
import searchForm from "./search_form";

export interface ProductInfo {
    name: string,
    financeProcent: number,
    days: number
}

class PopularScreen extends Page {

    private productPhoto = () => $("//*[@resource-id='com.kickstarter.kickstarter.debug:id/photo']");
    private productNames = () => $$("//*[@resource-id='com.kickstarter.kickstarter.debug:id/name_and_blurb_text_view']");
    private productPercent = () => $$("//*[@resource-id='com.kickstarter.kickstarter.debug:id/percent']");
    private productDays = () => $$("//*[@resource-id='com.kickstarter.kickstarter.debug:id/deadline_countdown']");

    public searchForm = searchForm;

    constructor() {
        super('//android.widget.LinearLayout[@content-desc="Popular"]');
    }

    async getInfoOfTheSecondProduct(): Promise<ProductInfo> {
        await this.swipeToSecondProduct();
        const productName = (await (await this.productNames()[1]).getText()).split(':')[0];
        const productPercent = convert.percentToNumber(await this.productPercent()[1].getText());
        const productDays = parseInt(await (await this.productDays()[1]).getText());
        return {
            name: productName,
            financeProcent: productPercent,
            days: productDays
        }
    }

    async findRememberedProductInSearch(product: ProductInfo): Promise<ProductInfo> {
        await Swipe.swipeUp();
        await this.searchForm.searchForProduct(product.name);
        return this.searchForm.getProductFromSearch(product.name);
    }

    private async swipeToSecondProduct(): Promise<void> {
        await this.productPhoto().waitForDisplayed();
        while (await this.productDays().length < 2) {
            await Swipe.swipeDownLittle();
        }
    }
}

export default new PopularScreen();
