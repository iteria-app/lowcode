const { Fragment, Suspense, useState } = React;
const { render } = ReactDOM;
function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Table />
        </Suspense>
    );
}

function Loading() {
    return <em style={{ color: 'gray', fontWeight: 'bold' }}>Loading...</em>;
}


function Table() {

    const [show, setIsShown] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [columnData, setColumnData] = useState("Handle")
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setColumnData(e.target.value)
    }

    const saveEdited = () => {
        setShowInput(false)
    }

    const addColumnStyle = {
        margin: '40px',
        border: '5px solid pink'
    };
    const buttonAdd = {
        position: 'absolute',
        borderRadius: 50,
        opacity: 0.3,
    };


    function checkIndex(e) {
        const table = document.querySelector('table');
        const rows = document.querySelectorAll('tr');
        const rowsArray = Array.from(rows);

        table.addEventListener('click', (event) => {
            const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
            const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
            const columnIndex = columns.findIndex(column => column == event.target);
            console.log(rowIndex, columnIndex)
        })

    }




    let target = null
    function handleMousemove(e) {
        const divWithButton = document.createElement('button')
        divWithButton.innerHTML = '<i class="fas fa-plus"></i>'
        divWithButton.style.position = "absolute"
        divWithButton.style.opacity = 0.5;
        divWithButton.classList.add('btn')
        divWithButton.classList.add('btn-primary')
        divWithButton.classList.add('btn-sm')
        divWithButton.classList.add('addButton')
        divWithButton.style.borderRadius = "50px"
        divWithButton.style.display = "inline"
        divWithButton.style.marginLeft = "2rem"
        divWithButton.addEventListener('click', () => handleAddCol(e))

        target.appendChild(divWithButton)
    }

    function destroyElement(e) {
        if (target.nodeName == "TH") {
            const butt = document.querySelector('button')
            e.target.removeChild(butt);
        }

    }

    function handleAddCol(e) {
        if (target.nodeName == "TH") {
            target = e.target;
            const table = document.querySelector('table');
            const rows = document.querySelectorAll('tr');
            const rowsArray = Array.from(rows);
            const rowIndex = rowsArray.findIndex(row => row.contains(e.target));
            const columns = Array.from(rowsArray[rowIndex].querySelectorAll('th'));
            const columnIndex = columns.findIndex(column => column == e.target);
            console.log(rowIndex, columnIndex)

            const head = document.querySelector('.table').tHead;
            const newEl = document.createElement('th');
            newEl.innerHTML = "NewHead"
            console.log('New El', newEl)
            newEl.addEventListener('click', () => { })
            target.after(newEl)
            const tableBody = document.querySelector('.table').tBodies[0];
            for (let i = 0; i < tableBody.rows.length; i++) {
                let newCell = document.createElement('td')
                newCell.innerHTML = 'NewTD'
                const afterThis = tableBody.rows[i].cells[columnIndex]
                console.log('After this', afterThis)
                afterThis.after(newCell)
            }
        }





    }
    function onMouseOverHandler(e) {
        target = e.target
        highlight({ type: 'element', detail: target })
        console.log("Target", target)
        if (target.nodeName == "TH") {
            handleMousemove(e)
        }
    }

    function handleAdding(e, columnIndex) {
        e.target.addEventListener('click', () => {
            const head = document.querySelector('.table').tHead;
            const newEl = document.createElement('th');
            newEl.innerHTML = "NewHead"
            console.log('New El', newEl)
            target.after(newEl)
            const tableBody = document.querySelector('.table').tBodies[0];
            for (let i = 0; i < tableBody.rows.length; i++) {
                let newCell = document.createElement('td')
                newCell.innerHTML = 'NewTD'
                const afterThis = tableBody.rows[i].cells[columnIndex]
                console.log('After this', afterThis)
                afterThis.after(newCell)
            }
        })
    }
    //{add ? <button className="btn btn-primary btn-sm" style={buttonAdd} onClick={addColumn}><i class="fas fa-plus"></i></button> : null}


    const addColumn = () => {
        const head = document.querySelector('.table').tHead;
        console.log("head", head)
        for (let h = 0; h < head.rows.length; h++) {
            let newTH = document.createElement('th');
            head.rows[h].appendChild(newTH);
            newTH.innerHTML = "New"
        }
        const tableBody = document.querySelector('.table').tBodies[0];
        for (let i = 0; i < tableBody.rows.length; i++) {
            let newCell = tableBody.rows[i].insertCell(-1);
            newCell.innerHTML = "New Cell"
        }

    }
    return (
        <div>
            <div className="container" onMouseOver={(e) => { onMouseOverHandler(e) }} onMouseOut={e => { destroyElement(e) }} onClick={(e) => { handleAddCol(e) }} >
                <h2 className="text-center">UzitocnePage</h2>
                <div>
                    <table class="table" >
                        <thead >
                            <tr>
                                <th >Icon</th>


                                <th >
                                    First
                </th>
                                <th >Last</th>
                                <th  >Handle</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td ><i class="fas fa-plus"></i></td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td >@mdo</td>
                            </tr>
                            <tr>
                                <td ><i class="fas fa-plus"></i></td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td >@fat</td>
                            </tr>
                            <tr>
                                <td ><i class="fas fa-plus"></i></td>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td >@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )


}

const root = document.getElementById('root');

render(<App />, root);