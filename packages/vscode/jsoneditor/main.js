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
        vscode.postMessage({
            json: jsonString
        });
    }
};

const editor = new JSONEditor(container, options);

window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    const json = JSON.parse(message.json);
    console.log(json);
    editor.update(json);
});