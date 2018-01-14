import { observable, autorun, action } from 'mobx';
import Tool from './Tool';

/**
 * @link https://mobx.js.org/best/store.html 
 */
export default class ToolStore {
    @observable tools = [];
    @observable isLoading = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    /**
     * Fetches all tool's from the server
     */
    loadTools() {
        this.isLoading = true;
        fetch('http://localhost:56644/api/tool')
            .then((resp) => resp.json())
            .then(fetchedTools => {
                console.log(fetchedTools);
                fetchedTools.forEach(json => this.updateToolFromServer(json));
                this.isLoading = false;
            });
    }

    /**
     * Update a tool with information from the server. Guarantees a tool
     * only exists once. Might either construct a new tool, update an existing one,
     * or remove an tool if it has been deleted on the server.
     */
    updateToolFromServer(json) {
        var tool = this.tools.find(tool => tool.id === json.id);
        if (!tool) {
            tool = new Tool(this, json.id);
            this.tools.push(tool);
        }

        tool.updateFromJson(json);
    }
    /**
     * Creates a fresh tool on the client and server
     */
    createTool() {
        const tool = new Tool(this);
        this.tools.push(tool);
        return tool;
    }
    /**
     * A tool was somehow deleted, clean it from the client memory
     */
    removeTool(tool) {
        fetch(`http://localhost:56644/api/tool/${tool.id}`, { method: 'DELETE' })
            .then((resp) => resp.json())
            .then(() => {
                this.tools.splice(this.tools.indexOf(tool), 1);
            });
    }

    save(tool) {
        return fetch(`http://localhost:56644/api/tool/`, {
            method: 'POST',
            body: JSON.stringify(tool.asJson),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json())
            .then((respTool) => {
                this.updateToolFromServer(respTool);
            });
    }
}

