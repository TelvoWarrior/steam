import { GameCardSteps } from "../steps/game-card-steps"
import { GameCardItem } from "./game-card"

export class GetGameCardDataInGameList {
        public readonly gameTitle:string;
        public readonly discountAmount:string;
        public readonly discountPrice:string;
        public readonly regularPrice:string;
        public readonly releaseDate:string;
        public readonly genreTags:string;
        public readonly reviewsSummary:string;
        public readonly reviewsCount:string;
    
    constructor(nth:number) {
        this.gameTitle = await GameCardSteps.getInnerText(nth, GameCardItem.GAME_TITLE),
        this.discountAmount = (await GameCardSteps.getInnerText(nth, GameCardItem.DISCOUNT_LABEL)).slice(1, -1),
        this.discountPrice = await GameCardSteps.getInnerText(nth, GameCardItem.DISCOUNT_PRICE_LABEL),
        this.regularPrice = await GameCardSteps.getInnerText(nth, GameCardItem.REGULAR_PRICE_LABEL),
        this.releaseDate = new Date(await GameCardSteps.getInnerText(nth, GameCardItem.RELEASE_DATE)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        this.genreTags,
        this.reviewsSummary = await GameCardSteps.getInnerText(nth, GameCardItem.REVIEW_SUMMARY),
        this.reviewsCount = (await GameCardSteps.getInnerText(nth, GameCardItem.REVIEW_COUNT)).slice(2, -13),
    }
}
