// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


  
function useLocalStorageState(
  key, 
  defaultValue=' ',
  {serialize = JSON.stringify, deserialize = JSON.parse}
  ) {
  const [state, setState] = React.useState(() => 
  {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) {
      return deserialize(localStorageValue)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    if (prevKeyRef.current != key) {  
      window.localStorage.removeItem(prevKeyRef.current)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  },[key, state, serialize]) 

  return [state, setState]
}

function Greeting({initialName = ''}) {
  console.log("rendering")
  const [name, setName] = useLocalStorageState('name', initialName)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount +1)}>
        {count}
      </button>
      <Greeting />
    </>
  )}

export default App
