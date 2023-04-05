import Page from "./page";
import Swipe from "../components/swipe";

class Magic extends Page {
    
    private magicTab = $("//*[@resource-id='com.kickstarter.kickstarter.debug:id/login_tout_button']");

    constructor() {
        super("//android.widget.LinearLayout[@content-desc='Magic']");
    }

    async isMagicTabDisplayed(): Promise<boolean> {
        return this.magicTab.waitForDisplayed();
    }

    async swipeToPopular(): Promise<void> {
        await Swipe.swipeLeft();
    }
}

export default new Magic();
