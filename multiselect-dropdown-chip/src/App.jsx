import { useState } from 'react'
import MultiSelectDropdown from './components/MultiselectDropdown';
import './App.css'

const options = [
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

function App() {

  return (
    <div>
      Multiselect Dropdown Chip
      <div style={{ padding: 40 }}>
        <MultiSelectDropdown options={options} />
      </div>
    </div>
  )
}

export default App
