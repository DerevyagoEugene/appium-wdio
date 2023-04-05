import { convert } from "../utils/covertions";
import { ProductInfo } from "./popular_screen";

class SearchForm {

    private search = $('//android.widget.ImageButton[@content-desc="Search"]');
    private searchTextBox = $('//*[@resource-id="com.kickstarter.kickstarter.debug:id/search_edit_text"]');
    private searchProductsPattern = (text: string) => `//android.widget.LinearLayout[./*[@resource-id='com.kickstarter.kickstarter.debug:id/project_name_text_view'][contains(@text,'${text}')]]`;
    private procentSelector = '//*[@resource-id="com.kickstarter.kickstarter.debug:id/search_result_percent_funded_text_view"]';
    private daysSelector = '//*[@resource-id="com.kickstarter.kickstarter.debug:id/search_result_deadline_countdown_text_view"]';

    async searchForProduct(name: string): Promise<void> {
        await this.search.click();
        await this.searchTextBox.addValue(name);
    }

    async getProductFromSearch(name: string): Promise<ProductInfo> {
        const product = $(this.searchProductsPattern(name));
        const procent = convert.percentToNumber(await product.$(this.procentSelector).getText());
        const days = parseInt(await product.$(this.daysSelector).getText());
        return {
            name: name,
            financeProcent: procent,
            days: days
        }
    }

    async clickProductFromSearch(product: ProductInfo) {
        await $(this.searchProductsPattern(product.name)).click();
    }
}

export default new SearchForm();
