import { useState } from 'react'
import './App.css'
import Autocomplete from './components/Autocomplete'

function App() {

  const fetchSuggetions = async (query) => {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
    const jsonRes = await res.json();
    return jsonRes?.recipes;
  }

  return (
      <div className='app'>
        <h1>Autocomplete</h1>
        <Autocomplete
          placeholder="Enter Recipe"
          fetchSuggetions={fetchSuggetions}
          dataKey="name"
          customLoading={<>Loading...</>}
          onSelect={(res) => { console.log(res)}}
          onBlur={() => {}}
          onFocus={() => {}}
          onChange={() => {}}
          customStyles={{}}
        />
      </div>
  )
}

export default App
