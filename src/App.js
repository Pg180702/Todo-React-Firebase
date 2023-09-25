
import { useEffect, useState } from 'react';
import './App.css';
import { Button,FormControl,Input,InputLabel } from '@mui/material';
import TodoInput from './TodoInput';
//import { TextField } from '@mui/material';
import db from './firebasecode';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
  const [todos,setTodos]=useState([]);
  //we need a short term memory for input as well and so need to create a state for that too
  //when the app loads we need to listen to the database-firebase and fetch the items in there
  //and put them to our state
  const [input,setInput]=useState('');

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      //console.log(snapshot.docs.map(doc=>doc.data().todo));
      setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})));//this function here is returning us an array
      //doc.data() gives us an object and doing .todo simply converts it to an array
    })
  },[])

  const addTodo=(e)=>{
    e.preventDefault(); 
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    //above code adds to firebase but we also gotta add a timestamp to sort them on basis of what we want as first 
    //todo item
    //setTodos([...todos,input])
    setInput('');//this will clear input field after we have submitted the todo item to be added
  }
  return (
    <div className="App">
      <h1>My Own To-Do App</h1>
      <form>
      {/* <input value={input} onChange={event=>setInput(event.target.value)}/> */}
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"
       value={input} onChange={event=>setInput(event.target.value)}/> */}
      {/* <button type='submit' onClick={addTodo}>Add Todo</button> */}

      <FormControl>
        <InputLabel>Write A todo</InputLabel>
        <Input value={input} onChange={event=>setInput(event.target.value)}/>
      </FormControl>
      <Button disabled={!input} variant="contained" type='submit' onClick={addTodo}>Add Todo</Button>
      </form>
    

      <ul>
        {todos.map((todoitem)=>(
         <TodoInput a='1' b='2' todoitem={todoitem}/>
        ))}
      </ul>
    </div>
  );
}
//we could pass as many props we want and then they are accesible in the component they were passed to
export default App;
