import { observable, computed, action } from 'mobx';
import Guid from "./../src/utils/guid-utils";

export default class Order {
    /**
    * unique id of this tool, immutable.
    */
    id = null;

    @observable tool;
    @observable clientName;
    @observable clientPhoneNumber;
    @observable contractNumber;
    @observable description;
    @observable paidPledge;
    @observable price;
    @observable startDate;
    @observable createdBy;
    @observable endDate;
    @observable payment;
    @observable isClosed;

    store = null;

    constructor(store, id = Guid()) {
        this.store = store;
        this.id = id;
    }

    save() {
        return this.store.save(this);
    }

    /**
     * Update this order with information from the server
     */
    @action async updateFromJson(json) {
        this.clientName = json.clientName;
        this.clientPhoneNumber = json.clientPhoneNumber;
        this.contractNumber = json.contractNumber;
        this.description = json.description;
        this.paidPledge = json.paidPledge;
        this.price = json.price;
        this.startDate = json.startDate;
        this.createdBy = json.createdBy;
        this.endDate = json.endDate;
        this.payment = json.payment;
        this.isClosed = json.isClosed;
        if (json.tool) {
            this.tool = json.tool;
        } else {
            this.tool = await this.store.rootStore.toolStore.getById(json.toolID);
        }
    }

    @computed get asJson() {
        return {
            id: this.id,
            clientName: this.clientName,
            clientPhoneNumber: this.clientPhoneNumber,
            contractNumber: this.contractNumber,
            description: this.description,
            paidPledge: this.paidPledge,
            price: this.price,
            startDate: this.startDate,
            createdBy: this.createdBy,
            endDate: this.endDate,
            payment: this.payment,
            toolID: this.tool && this.tool.id,
            isClosed: this.isClosed
        };
    }
}