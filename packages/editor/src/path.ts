import { Vertex } from "./vertex"

export function removeElement(htmlCode: Vertex, path: Array<Array<Vertex>>) {
    if (path.length < 1) {
        return null
    }

    let top = path[0]
    for (let i = 0; i < htmlCode.children.length && i < top.length; i++) {
        let child = htmlCode.children[i]
        let sibling = top[i]

        if (sibling.tagName != child.tagName) {
            throw new Error('wrong path sibling')
        }

        if (i + 1 == top.length) {
            let found = child
            return found
        } else if (child.children && path.length > 1) {
            let findedEl = removeElement(child, path.slice(1))
            if (findedEl) {
                return findedEl
            }
        }
    }
}