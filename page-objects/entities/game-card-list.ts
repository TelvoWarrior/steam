import { Selector } from "testcafe";
import { GameCard } from "./game-card";

export class GameCardList {
    private _GameCardListBlock: Selector;
    private _GameCardList: GameCard[];
    
    constructor() {
        this._GameCardListBlock = Selector('#SaleSection_13268');
        this._GameCardList = GameCardList.fillGameCardList();    
    }

    static fillGameCardList(){
        const arr:GameCard[] = []; 
        for (let i = 0; i<12; i++) {
            arr.push(new GameCard(i));
        }
        return arr;
    }

    get GameCardListBlock() {
        return this._GameCardListBlock;
    }

    get GameCardList() {
        return this._GameCardList;
    }
}

    