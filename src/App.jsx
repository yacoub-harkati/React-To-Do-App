import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { nanoid } from 'nanoid'

function OneToDo({ toDoName, handleDelete, handleDone, status}) {
  return (<div className="to-do-list"><div className="one-todo"><span className={`label ${status == "done" && "done-label"}`}>{toDoName}</span><ul>
    <li className='done' onClick={handleDone}><FontAwesomeIcon icon={faCheck} /></li>
    <li className='remove' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></li>
  </ul>
  </div>
  </div>
  )
}


function App() {
  let localToDoArr = JSON.parse(localStorage.getItem("toDoArr")) || []
  const [toDoEntry, setToDoEntry] = useState({value:"" , status: "pending"})
  const [toDoArr, setToDoArr] = useState(localToDoArr)

  useEffect(()=> {
    localStorage.setItem("toDoArr", JSON.stringify(toDoArr))
  }, [toDoArr])
  
  function handleChange(e) {
    setToDoEntry({value: e.target.value , status: "pending"})
  }

  function handleClick(e) {
    e.preventDefault()
    if (!toDoEntry.value) return
    setToDoArr([...toDoArr, toDoEntry])
    setToDoEntry({value:"" , status: "pending"})
  }

  function handleDelete(index){
    let newToDoArr = [...toDoArr]
    newToDoArr.splice(index, 1)
    setToDoArr(newToDoArr)
  }

  function handleDone(index){
    setToDoArr(prevArray => {
                prevArray[index].status = "done" 
                return [...prevArray]})
  }

  let ToDos = toDoArr.map((singleToDO, id) => <OneToDo key={nanoid()} handleDelete={() => handleDelete(id)} handleDone={() => handleDone(id)} toDoName={singleToDO.value} status={singleToDO.status} />)

  return (
    <main className="container">
        <form className="to-do-entries">
        <label for="to-do">Add To Do Task</label>
        <input onChange={handleChange} value={toDoEntry.value} type="text" name="to-do" id="to-do" />
        <button type="submit" onClick={handleClick}>Submit</button>
        </form>
      <p>To Do List</p>
      {ToDos}
    </main>
  )
}

export default App
