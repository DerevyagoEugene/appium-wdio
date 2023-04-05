import Page from "./page";
import { ProductInfo } from "./popular_screen";

class ProductPage extends Page {

    private productName = $('//*[@resource-id="com.kickstarter.kickstarter.debug:id/project_name"]');
    private productDays = $('//*[@resource-id="com.kickstarter.kickstarter.debug:id/deadline_countdown_text_view"]');
    
    constructor() {
        super('//android.view.ViewGroup[.//*[@resource-id="com.kickstarter.kickstarter.debug:id/project_pager"]]//android.widget.LinearLayout[@content-desc="Overview"]');
    }

    async isProductPageOpenedWithName(product: ProductInfo): Promise<boolean> {
        return await this.productName.getText() === product.name;
    }

    async isNumberOfDaysSame(product: ProductInfo): Promise<boolean> {
        return parseInt(await this.productDays.getText()) === product.days;
    }
}

export default new ProductPage();
