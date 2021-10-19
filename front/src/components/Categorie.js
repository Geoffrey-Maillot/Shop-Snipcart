import React from "react";
import { Link } from 'gatsby';

const style = {
  categorie: {
    padding: '20px',
    width: '200px',
    backgroundColor: "#F4F1F1",
    border: '1px solid #d7d2d2',
    textAlign: 'center',
  }
}

const Categorie = ({ name, slug }) => {

  return (
    <Link to={`/categorie/${slug}`}>
      <div style={style.categorie}>{name}</div>
    </Link>
  )
}

export default Categorie