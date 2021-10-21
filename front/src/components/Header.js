import React, { useState, useEffect } from "react";

const styles = {

  headerContainer: {
    backgroundColor: '#fff'
  },

  header: {
    width: '100%',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1124px',
    margin: '0 auto',

  },

  btnUSer: {
    backgroundColor: 'transparent',
    border: 'none',
  },

  btnCard: {
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: '700'
  }

}


const Header = () => {
  const [count, setCount] = useState(0)

  /**
   * Return the quantity of products in cart
   * @param {array} ProductArray Product in cart
   * @return {number}
   */
  const countQuantity = (productArray) => {
    return productArray.map((item) => item.quantity).reduce((pre, cur) => pre + cur)
  }

  useEffect(() => {
    // Le SDK de Snipcart fonctinne avec Redux, j'ai donc accès aux méthode store.subscribe() et store.getState() via Snipcart
    // J'initialise une variable pour stocker mon écouteur au store ce qui me permétra de me déshaboner
    let unsubscribe = null

    if (window !== undefined) {
      // Au montage du composant, je récupère le nombre d'item dans le panier
      setCount(countQuantity(window.Snipcart.store.getState().cart.items.items))
      // Je m'abonne au store pour être au courant des que le nombre d'item du panier change
      unsubscribe = window.Snipcart.store.subscribe(() => {
        setCount(countQuantity(window.Snipcart.store.getState().cart.items.items))
      })
    }
    return unsubscribe
  }, [])

  return (
    <div style={styles.headerContainer}>
      <header style={styles.header}>
        <div>LOGO</div>
        <div>
          <button className="snipcart-customer-signin" style={styles.btnUSer}>
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" alt="" title="" className="snipcart-cart-header__icon snipcart__icon--blue-dark snipcart__icon"><path fillRule="evenodd" clipRule="evenodd" d="M19.609 57c-2.131 0-4.107-.888-5.562-2.499-1.543-1.707-2.268-4.023-1.988-6.342l.856-7.167c.487-4.11 2.666-7.791 5.985-10.095l1.753 2.454c-2.609 1.812-4.329 4.725-4.715 7.989l-.859 7.17a5.074 5.074 0 001.242 3.999c.868.96 2.037 1.491 3.288 1.491H45.39c1.251 0 2.42-.531 3.288-1.491a5.074 5.074 0 001.242-3.999l-.855-7.167c-.39-3.267-2.107-6.177-4.72-7.992l1.754-2.454c3.319 2.307 5.501 5.988 5.989 10.098l.852 7.164c.28 2.319-.445 4.635-1.988 6.342C49.501 56.112 47.523 57 45.391 57H19.61zM18.8 19.5c0-7.443 6.147-13.5 13.7-13.5C40.054 6 46.2 12.057 46.2 19.5S40.053 33 32.5 33c-7.552 0-13.699-6.057-13.699-13.5zm3.045 0c0 5.79 4.78 10.5 10.655 10.5 5.875 0 10.655-4.71 10.655-10.5S38.376 9 32.5 9c-5.876 0-10.655 4.71-10.655 10.5z" fill="#313749">
            </path>
            </svg>
            Mon compte
          </button>
          <button className="snipcart-checkout" style={styles.btnCard}>
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" alt="" title="" className="snipcart-cart-header__icon snipcart__icon--blue-dark snipcart__icon"><path fillRule="evenodd" clipRule="evenodd" d="M51.714 20.47L55 60H9l3.286-39.53h9.857v-6.588C22.143 8.424 26.556 4 32 4c5.444 0 9.857 4.424 9.857 9.882v6.589h9.857zM25.43 13.883v16.47h-3.286v-6.587h-6.834l-2.737 32.94h38.856l-2.737-32.94h-6.834v6.588h-3.286v-16.47c0-3.634-2.947-6.589-6.571-6.589-3.624 0-6.571 2.955-6.571 6.588zm3.285 9.883V20.47h6.572v3.294h-6.572z" fill="#313749"></path></svg>
            {/* Nombre d'article dans le panier */}
            <span>{count}</span>
          </button>
        </div>

      </header>
    </div>

  )
}

export default Header