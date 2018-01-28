import { observable, autorun, action, runInAction } from 'mobx';
import Order from './Order';
import config from './../config';
import axios from 'axios';

const instance = axios.create({
    baseURL: `${config.URL_API}order/`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export default class OrderStore {
    @observable orders = [];
    @observable isLoading = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    /**
     * Fetches all order's from the server
     */
    @action loadActiveOrders() {
        this.isLoading = true;

        instance.get('actives').then(action('getActivesOrdersSuccessfully', responce => {
            const orders = responce.data;
            orders.forEach(order => this.updateOrderFromServer(order));
        })).catch(action('getActiveOrdersFailed', error => {
            console.log(error);
        }))
    }

    updateOrderFromServer(json) {
        let order = this.orders.find(order => order.id === json.id);
        if (!order) {
            order = new Order(this, json.id);
            this.orders.push(order);
        }

        order.updateFromJson(json);
    }
}