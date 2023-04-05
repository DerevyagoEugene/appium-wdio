export const convert = {

    percentToNumber: (text: string): number => {
        return parseInt(text.replace('%', ''));
    }
}
