export default class Model{
    constructor(){
        this._score = 0;
    }

    set score(value){
        this._score = value
    }

    get score(){
        return this._score;
    }
}