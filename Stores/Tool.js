import { observable, computed } from 'mobx';

export default class Tool {
    /**
    * unique id of this tool, immutable.
    */
    id = null;

    @observable name = "";
    @observable price = 0;
    @observable pledge = 0;
    @observable dayPrice = 0;
    @observable workShiftPrice = 0

    store = null;

    constructor(store, id = '') {
        this.store = store;
        this.id = id;
    }

    @computed get asJson() {
        return {
            name: this.name,
            price: this.price,
            pledge: this.pledge,
            dayPrice: this.dayPrice,
            workShiftPrice: this.workShiftPrice,
        };
    }

    save() {
        this.store.save(this);
    }

    delete() {
        this.store.delete(this);
    }
    /**
     * Update this tool with information from the server
     */
    updateFromJson(json) {
        this.name = json.name;
        this.price = json.price;
        this.pledge = json.pledge;
        this.dayPrice = json.dayPrice;
        this.workShiftPrice = json.workShiftPrice;
    }
}