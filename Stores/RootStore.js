import ToolStore from './ToolStore';
import OrderStore from './OrderStore';

export default class RootStore {
    constructor() {
        this.toolStore = new ToolStore(this);
        this.orderStore = new OrderStore(this);
    }
}
