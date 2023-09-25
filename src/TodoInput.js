import { ListItem, ListItemText,List, ListItemAvatar, Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import './TodoInput.css';
import db from './firebasecode';
function TodoInput(props) {
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState('');
  const updateTodo=()=>{
    db.collection('todos').doc(props.todoitem.id).set({
      todo:input,
    },{merge: true})
    //merge true prevents you to overwrite what was in there-basically we gonna append




    setOpen(false);

  }
  return (
    //could use postgres database
<>
  <Modal
  open={open}
  onClose={e=>setOpen(false)}
>
  <div>
    <h1>I am a modal</h1>
    <input value={input} placeholder={props.todoitem.todo} onChange={e=>setInput(e.target.value)}/>
    <Button onClick={updateTodo}>Update todo</Button>
  </div>
</Modal>
    <List className='todo_list'>
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary={props.todoitem.todo} secondary="this is a todo item"/>
       {/* <li>{props.todoitem}</li> */}
       </ListItem>
       <Button onClick={e=>setOpen(true)}>Edit Me</Button>
       <Button onClick={event=>db.collection('todos').doc(props.todoitem.id).delete()}>DELETE ME</Button>
    </List>
    </>
  )

    
  
}
//now we gonna add material ui in here
export default TodoInput
