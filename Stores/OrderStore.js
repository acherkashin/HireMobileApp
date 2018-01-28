import { observable, autorun, action, runInAction } from 'mobx';
import Tool from './Tool';
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
            this.orders = responce;
        })).catch(action('getActiveOrdersFailed', error => {
            console.log(error);
        }))
    }

}