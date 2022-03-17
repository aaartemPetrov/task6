import { priceBlock } from "./priceBlock";
import { raitingBlock } from "./raitingBlock";

export class FilterBlock {

    constructor() {
        this.priceBlock = priceBlock;
        this.raitingBlock = raitingBlock;
    }

    getPriceBlock() {
        return this.priceBlock;
    }

    getRaitingBlock() {
        return this.raitingBlock;
    }

    locator() {
        return '#s-refinements';
    }

}

export const filterBlock = new FilterBlock();