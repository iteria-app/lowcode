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
        position: "absolute",
        borderRadius: 50,
        opacity: 0.3,
        zIndex: 1000
    };




    const tableStyle = {
        borderRight: "solid rgb(124, 144, 236, 0.5)"
    }

    const addStylesToColumn = () => {
        const body = document.querySelector('.table').tBodies[0];
        document.querySelector('tr').lastElementChild.style.borderRight = "solid blue"
        for (let rows = 0; rows < body.rows.lenght; rows++) {
            body.rows[rows].style.borderRight = "solid blue"
        }
    }

    const deleteStyle = () => {
        document.querySelector('tr').lastElementChild.style.color = "#000"
    }

    const createDiv = () => {
        const createdDiv = document.createElement('div')
        createdDiv.style.zIndex = 1000;
        createdDiv.style.borderRight = "solid blue"
        createdDiv.style.color = "blue"
        createdDiv.style.position = ""
        createdDiv.innerText = "CREATED DIV"
        document.querySelector('th').lastElementChild.append(createdDiv)
    }

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
        <div className="container">
            <h2 className="text-center">UzitocnePage</h2>
            <div>
                <table class="table" >
                    <thead onMouseEnter={() => { setAdd(true); }} onMouseLeave={() => { setAdd(false) }}>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td >@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td >@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td >@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )


}

const root = document.getElementById('root');

render(<App />, root);