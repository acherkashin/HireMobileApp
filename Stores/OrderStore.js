import { observable, autorun, action, runInAction, computed } from 'mobx';
import Order from './Order';
import config from './../config';
import axios from 'axios';

const api = axios.create({
    baseURL: `${config.URL_API}order`,
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

    @observable searchString = '';

    @computed get filteredOrders() {
        return this.orders.filter(order => order.clientName && order.clientName.indexOf(this.searchString) !== -1);
    }

    createOrder() {
        const order = new Order(this);
        this.orders.push(order);
        return order;
    }

    getById(id) {
        let order = this.orders.find(t => t.id === id);
        if (!order) {
            runInAction(() => {
                this.isLoading = true;
            });
            //do request to server
        }

        return new Promise((resolve) => { resolve(order) });
    }

    /**
     * Fetches all order's from the server
     */
    @action loadActiveOrders() {
        this.isLoading = true;

        return api.get('actives').then(action('getActivesOrdersSuccessfully', responce => {
            const orders = responce.data;
            orders.forEach(order => this.updateOrderFromServer(order));
        })).catch(action('getActiveOrdersFailed', error => {
            console.log(error);
        }))
    }

    @action save(tool) {
        return api.post('', tool.asJson).then(action('saveToolSuccessefully'), response => {
            //add checking status code. Why 400 is ok???
            this.updateToolFromServer(response.data)
        }).catch(action('saveToolFaild'), response => {
            console.error(response);
        });
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