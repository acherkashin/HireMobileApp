import { observable, computed, action } from 'mobx';
import Guid from "./../src/utils/guid-utils";

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
    @observable description = "";

    store = null;

    constructor(store, id = Guid()) {
        this.store = store;
        this.id = id;
    }

    @computed get asJson() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            pledge: this.pledge,
            dayPrice: this.dayPrice,
            workShiftPrice: this.workShiftPrice,
            description: this.description,
        };
    }

    save() {
        return this.store.save(this);
    }

    delete() {
        this.store.delete(this);
    }
    /**
     * Update this tool with information from the server
     */
    @action updateFromJson(json) {
        this.name = json.name;
        this.price = json.price;
        this.pledge = json.pledge;
        this.dayPrice = json.dayPrice;
        this.workShiftPrice = json.workShiftPrice;
        this.description = json.description;
    }
}