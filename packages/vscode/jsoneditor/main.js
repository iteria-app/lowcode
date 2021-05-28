const vscode = acquireVsCodeApi();

// create the editor
const container = document.getElementById("jsoneditor");
container.style.height = window.innerHeight + "px";

const options = {
    mode: 'tree',
    onError: function(err) {
        alert(err.toString());
    },
    onChangeJSON: function(json) {
        const jsonString = JSON.stringify(json, null, 2);
        console.log("change", jsonString)
        vscode.postMessage({
            json: jsonString
        });
    }
};

const editor = new JSONEditor(container, options);

window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    const oldjson = message.json.replace(/(\r\n|\n|\r)/gm, "");
    let json = JSON.parse(oldjson)
    // console.log(json)
    json = JSON.parse(json)

    editor.update(json)
});