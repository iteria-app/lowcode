export class Vertex {
    tagName: string;
    type: string;
    children: Array<Vertex>;
    parents: Array<Vertex>;
    siblings: Array<Vertex>;
    constructor(tagName: string, type: string, children: Array<Vertex>, parents: Array<Vertex>, siblings: Array<Vertex>) {
        this.tagName = tagName;
        this.type = type;
        this.children = children;
        this.parents = parents;
        this.siblings = siblings
    }
}
