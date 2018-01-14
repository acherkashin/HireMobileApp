import ToolStore from './ToolStore';

export default class RootStore {
    constructor() {
        this.toolStore = new ToolStore(this);
    }
}
