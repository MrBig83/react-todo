import React, {useState, useEffect} from "react";
import {AiOutlinePlus} from "react-icons/ai"

import ToDo from "./todo";
import {db} from "./firebase"
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#181A36] to-[#040723]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-grey-800 p-2`,
  form: `flex justify-between`, 
  input: `border p-2 w-full text-xl`, 
  button: `border p-2 ml-2 bg-[#3E53A6] text-slate-100`,
  count: `text-center p-4`
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  
//   //Auth
//   // Initialize the FirebaseUI Widget using Firebase. 

//   var ui = new firebaseui.auth.AuthUI(firebase.auth());

//   ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });


  //End of Auth


  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === "") {
      alert("Please enter a valid todo")
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input, 
      completed: false, 
    })
    setInput("")
  }

  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  //Uppdate todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }


  //Delete todo in firebase
const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id))
}

  //Render TodoList
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Att-Göra lista</h3>
        <form onSubmit ={createTodo}className={style.form}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className={style.input} 
            type="text" 
            placeholder="Lägg till syssla" 
          />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
          <ToDo 
            key={index} 
            todo={todo} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo}
          />
          ))}
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>{`Du har ${todos.length} sysslor kvar`}</p>}
        
      </div>
    </div>
  );
}

export default App;
