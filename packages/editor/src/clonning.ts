import { Vertex } from './vertex'

function deepClone(obj) {
    var visitedNodes = [];
    var clonedCopy = [];

    function clone(item : any) {
        if (typeof item === "object" && !Array.isArray(item)) {
            if (visitedNodes.indexOf(item) === -1) {
                visitedNodes.push(item);
                var cloneObject = {};
                clonedCopy.push(cloneObject);
                for (var i in item) {
                    if (item.hasOwnProperty(i)) {
                        cloneObject[i] = clone(item[i]);
                    }
                }
                return cloneObject;
            } else {
                return clonedCopy[visitedNodes.indexOf(item)];
            }
        } else if (typeof item === "object" && Array.isArray(item)) {
            if (visitedNodes.indexOf(item) === -1) {
                var cloneArray = [];
                visitedNodes.push(item);
                clonedCopy.push(cloneArray);
                for (var j = 0; j < item.length; j++) {
                    cloneArray.push(clone(item[j]));
                }
                return cloneArray;
            } else {
                return clonedCopy[visitedNodes.indexOf(item)];
            }
        }
        return item;
    }
    return clone(obj);
}

/*function findElement(haystack : Vertex, needle, clonedArray : Array<Object>) : any {
    haystack.children.forEach((element, index) => {
        if (haystack.tagName == "html") {
            console.log('HTML');
        }
        if (element.tagName === needle) {
            clonedArray = haystack.children.slice(index);
            return element;
        } else if (element.children) {
            let foundEl = findElement(element, needle, clonedArray);
            if (foundEl) {
                return foundEl;
            }
        }
    });
} */





export function returnElement(vertexToClone: Vertex) {
    let clonedArray: Array<Object> = [];
    console.log(vertexToClone);
    clonedArray = deepClone(vertexToClone);
    console.log(clonedArray);
}
