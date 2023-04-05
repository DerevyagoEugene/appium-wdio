import { RectReturn } from '@wdio/protocols/build/types';
import { Location } from 'webdriverio/build/commands/element';

export default class Swipe {

    static async swipeUp(): Promise<void> {
        const resolution = await this.getResolution();

        const from: Coordinates = {
            x: Math.round(resolution.width / 2),
            y: Math.round(resolution.height / 2)
        }

        const to: Coordinates = {
            x: Math.round(resolution.width / 2),
            y: Math.round(resolution.height * 4 / 5)
        }

        await this.swipe(from, to);
    }

    static async swipeFromAndTo(from: Location, to: Location): Promise<void> {
        await this.swipe(from, to);
    }

    static async swipeDownLittle() {
        const resolution = await this.getResolution();

        const from: Coordinates = {
            x: Math.round(resolution.width / 2),
            y: Math.round(resolution.height / 2)
        }

        const to: Coordinates = {
            x: from.x,
            y: from.y - 200
        }

        await this.swipe(from, to);
    }

    static async swipeLeft(): Promise<void> {
        const resolution = await this.getResolution();

        const from: Coordinates = {
            x: Math.round(resolution.width * 4 / 5),
            y: Math.round(resolution.height / 2)
        }

        const to: Coordinates = {
            x: Math.round(resolution.width / 5),
            y: Math.round(resolution.height / 2)
        }

        await this.swipe(from, to);
    }

    static async swipe(from: Coordinates, to: Coordinates): Promise<void> {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 300, x: to.x, y: to.y },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        // Add a pause, just to make sure the swipe is done
        await driver.pause(1000);
    }

    private static getResolution = async (): Promise<RectReturn> => SCREEN_SIZE || await driver.getWindowRect();
}

let SCREEN_SIZE: RectReturn;

interface Coordinates {
    x: number;
    y: number;
}
