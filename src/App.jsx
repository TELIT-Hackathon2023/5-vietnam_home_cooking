import { useState } from 'react'
import {Button} from "@chakra-ui/react";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button colorScheme='blue' onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
    </>
  )
}

export default App
