import React from 'react'

const Search = () => {

  return (
    <form>
      <input type="text" list='product' />
      <datalist id="product">
        <option>Volvo</option>
        <option>Saab</option>
        <option>Mercedes</option>
        <option>Audi</option>
      </datalist>
    </form>
  )
}

export default Search