import React from "react";
import { Link } from 'gatsby'

import { BsSearch } from 'react-icons/bs';

const Header = () => {

  const styles = {

    nav: {
      width: '100%',
      padding: "20px",
      backgroundColor: "#F4F1F1",
      borderTop: '1px solid #E6D3E5',
      borderBottom: '1px solid #E6D3E5',

    },

    navContainer: {
      maxWidth: '1124px',
      margin: '0 auto',
      padding: '0 20px',
      position: 'relative',
    },

    link: {
      display: 'inline-block',
      padding: '5px 20px',
      borderLeft: '1px solid #E6D3E5'
    },

    search: {
      backgroundColor: 'transparent',
      border: 'none',
      position: 'absolute',
      right: '20px'
    },

  }

  return (
    <div style={styles.nav}>
      <nav style={styles.navContainer}>
        <Link style={styles.link} to="/">Acceuil</Link>
        <Link style={styles.link} to="/store">Boutique</Link>
        <Link style={styles.link} to="#">Information et contact</Link>
        <button style={styles.search}><BsSearch size="1.5em" /></button>
      </nav>

    </div>
  )
}

export default Header