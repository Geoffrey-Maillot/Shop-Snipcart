import React from "react";

const styles = {

  layout: {
    widht: '100%',
    maxWidth: '1124px',
    margin: '0 auto',

  },
  content: {
    marginTop: '40px',
    padding: '0 20px'

  }

}

const Layout = ({ children = "Contenu du site" }) => {

  return (
    <div style={styles.layout}>

      <div style={styles.content}>{children}</div>
    </div>

  )
}

export default Layout