interface Vertex {
   readonly tagName: String;
   readonly type: String;
   readonly parent?: Vertex;
   readonly children: Vertex[];
}

interface Listenable {
   addEventListener(eventType: String, callback: (e: Event) => void): void
}

export declare let DevListener: {
    new (): {
        getNode(node: Node): Vertex;
        getRootNodes(): Vertex[];
        getSvelteVersion(): String;
        setup(doc: Listenable): void;
    };
};
