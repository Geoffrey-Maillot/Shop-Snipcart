import React from "react";

const styles = {
  select: {
    padding: '10px',
    marginBottom: '20px'
  }
}

const SortSelect = ({ sortProduct }) => {

  return (
    <select style={styles.select} onChange={sortProduct} >
      <option value="" defaultValue>Trier les produits</option>
      <option value="alphabetiqueAZ">Ordre alphabétique[A-Z]</option>
      <option value="alphabetiqueZA">Ordre alphabétique[Z-A]</option>
      <option value="croissant">Prix croissant</option>
      <option value="decroissant">Prix decrroissant</option>
    </select>
  )
}

export default SortSelect