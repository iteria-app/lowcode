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

<<<<<<< HEAD
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


<<<<<<< HEAD


=======
>>>>>>> Table
    let target = null
    function handleMousemove(e) {
        target = e.target;
        if (target.nodeName == "TH") {
            const checkButton = document.querySelector('.btn-to-delete')
            if (!checkButton) {
                const divWithButton = document.createElement('button')

                divWithButton.innerHTML = '<i class="fas fa-plus"></i>'
                divWithButton.style.position = "absolute"
                divWithButton.style.opacity = 0.5;
                divWithButton.style.top = 0;
                divWithButton.style.right = 0;
                divWithButton.classList.add('btn')
                divWithButton.classList.add('btn-primary')
                divWithButton.classList.add('btn-sm')
                divWithButton.classList.add('addButton')
                divWithButton.classList.add('btn-to-delete')
                divWithButton.style.borderRadius = "50px"
                divWithButton.style.display = "inline"
                divWithButton.style.marginLeft = "2rem"
                divWithButton.addEventListener('click', (e) => handleAddCol(e))
                console.log("Created Button")
                target.appendChild(divWithButton)
            }
        }
        //if (target.nodeName !== "TH" || target.nodeName !== "BUTTON") {
        // console.log("Other element")
        //const butt = document.querySelector('.btn-to-delete')
        //if (butt) { butt.parentNode.removeChild(butt); }
        //}
        if (target.nodeName !== "TH" && target.nodeName !== "BUTTON") {
            console.log("Other EL")
            const butt = document.querySelector('.btn-to-delete')
            if (butt) { butt.parentNode.removeChild(butt); }
        }
    }

<<<<<<< HEAD
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

=======
    let target = null
    function handleMousemove(e) {
        target = e.target
        highlightFun({ type: 'element', detail: target })
        console.log("Target", target)
        console.log("Detail", e.detail)
        setAdd(true)
    }

    function handleAddCol(e) {
        target = e.target;
        const table = document.querySelector('table');
        const rows = document.querySelectorAll('tr');
        const rowsArray = Array.from(rows);
        const rowIndex = rowsArray.findIndex(row => row.contains(e.target));
        const columns = Array.from(rowsArray[rowIndex].querySelectorAll('th'));
        const columnIndex = columns.findIndex(column => column == e.target);
        console.log(rowIndex, columnIndex)
        e.target.addEventListener('click', () => {
>>>>>>> WIP Add Column to a specific position
            const head = document.querySelector('.table').tHead;
            const newEl = document.createElement('th');
            newEl.innerHTML = "NewHead"
            console.log('New El', newEl)
<<<<<<< HEAD
            newEl.addEventListener('click', () => { })
=======
>>>>>>> WIP Add Column to a specific position
            target.after(newEl)
            const tableBody = document.querySelector('.table').tBodies[0];
            for (let i = 0; i < tableBody.rows.length; i++) {
                let newCell = document.createElement('td')
                newCell.innerHTML = 'NewTD'
                const afterThis = tableBody.rows[i].cells[columnIndex]
                console.log('After this', afterThis)
                afterThis.after(newCell)
            }
<<<<<<< HEAD
        }
=======
>>>>>>> Table

    function handleAddCol(e) {

        target = e.target.parentNode;
        const table = document.querySelector('table');
        const rows = document.querySelectorAll('tr');
        const rowsArray = Array.from(rows);
        const rowIndex = rowsArray.findIndex(row => row.contains(target));
        const columns = Array.from(rowsArray[rowIndex].querySelectorAll('th'));
        const columnIndex = columns.findIndex(column => column == target);
        console.log(rowIndex, columnIndex)

        const head = document.querySelector('.table').tHead;
        const newEl = document.createElement('th');
        newEl.style.position = "relative"
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
        const butt = document.querySelector('.btn-to-delete')
        if (butt) { butt.parentNode.removeChild(butt); }

    }
    function onMouseOverHandler(e) {
        target = e.target
        if (target.nodeName == "BUTTON") {
            return
        } else if (target.nodeName == "I") {
            return
        } else {
            // highlight({ type: 'element', detail: target })
        }
        console.log("Target", target)
        //if (target.nodeName == "TH") {
        //  handleMousemove(e)
        //}
        handleMousemove(e)
    }

<<<<<<< HEAD
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
=======
        })

    }

    function addSelectedColumn() {
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
>>>>>>> WIP Add Column to a specific position
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
=======
>>>>>>> Table

    return (
        <div>
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="container" onMouseOver={(e) => { onMouseOverHandler(e) }} onMouseOut={e => { destroyElement(e) }} onClick={(e) => { handleAddCol(e) }} >
=======
            <div className="container" onMouseOver={(e) => { onMouseOverHandler(e) }}   >
>>>>>>> Table
                <h2 className="text-center">UzitocnePage</h2>
                <div>
                    <table class="table" >
                        <thead >
                            <tr>
                                <th style={{ position: "relative" }}>Icon</th>


                                <th style={{ position: "relative" }}>
                                    First
                </th>
                                <th style={{ position: "relative" }}>Last</th>
                                <th style={{ position: "relative" }} >Handle</th>

=======
            <div className="container" >
                <h2 className="text-center">UzitocnePage</h2>
                <div>
                    <table class="table" >
                        <thead onClick={(e) => { handleAddCol(e) }} onMouseEnter={(e) => { handleMousemove(e); checkIndex(e) }} onMouseLeave={() => { setAdd(false) }}>
                            <tr>
                                <th scope="col">#</th>


                                <th scope="col" onMouseEnter={() => { setIsShown(true) }} onMouseLeave={() => { setIsShown(false) }}> {edit ? null : columnData}
                                    {show ? <button className="btn btn-primary btn-sm" style={buttonAdd} onClick={() => { setEdit(true); setIsShown(false) }}><i class="fas fa-edit"></i></button> : null}{edit ?
                                        <div><input type="text" name="columnData" value={columnData}
                                            onChange={(e) => { setColumnData(e.target.value) }}
                                        /> <button className="btn btn-primary btn-sm" onClick={() => { console.log("hey"); setEdit(false); setIsShown(false) }}>Save</button> </div> : null}
                                </th>
                                <th scope="col">Last</th>
                                <th scope="col" >Handle</th>

                                {add ? <button className="btn btn-primary btn-sm" style={buttonAdd} onClick={addColumn}><i class="fas fa-plus"></i></button> : null}
>>>>>>> WIP Add Column to a specific position
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
<<<<<<< HEAD
                                <td ><i class="fas fa-plus"></i></td>
=======
                                <td scope="row">1</td>
>>>>>>> WIP Add Column to a specific position
                                <td>Mark</td>
                                <td>Otto</td>
                                <td >@mdo</td>
                            </tr>
                            <tr>
<<<<<<< HEAD
                                <td ><i class="fas fa-plus"></i></td>
=======
                                <td scope="row">2</td>
>>>>>>> WIP Add Column to a specific position
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td >@fat</td>
                            </tr>
                            <tr>
<<<<<<< HEAD
                                <td ><i class="fas fa-plus"></i></td>
=======
                                <td scope="row">3</td>
>>>>>>> WIP Add Column to a specific position
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