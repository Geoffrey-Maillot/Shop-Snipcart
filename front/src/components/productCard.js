import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby'

// Import Package =>
import { useMediaQuery } from 'react-responsive'
const styles = {
  article: {
    border: '1px solid #d7d7d7',
    padding: '10px',
    maxWidth: '368px',
    backgroundColor: '#fff'
  },

  content: {
    width: '100%',
    marginTop: '10px'
  },

  title: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '40px'
  },

  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',

  },
  price: {
    fontSize: '20px',
    fontWeight: 700,
  },

  button: {
    width: '75%',
    padding: '20px',
    border: 'none',
    backgroundColor: '#875a83',
    color: '#fff',
    marginLeft: '10px'
  }
}

const ProductCard = ({ title, price, image, slug, description, }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 980px)' });

  const size = isMobile ? '100%' : isTablet ? 'calc((100% / 2) - 20px)' : 'calc((100% / 3) - (80px / 3))'
  const styleNav = { ...styles.article, width: size }

  // Reduce Description
  const shortDescription = description.split(' ')
  shortDescription.splice(20, description.length - 20, '...')
  const newDescription = shortDescription.join(' ')

  const responsiveImage = getImage(image[0].localFile)

  return (
    <article style={styleNav}>
      <Link to={`/product/${slug}`} >
        <GatsbyImage
          image={responsiveImage}
          alt={title}
        />
      </Link>
      <div style={styles.content}>
        <h1 style={styles.title}>{title}</h1>
        <p>{newDescription}</p>

        <div style={styles.priceContainer}>
          <div style={styles.price}>{price}€</div>
          <button style={styles.button}>Ajouter au panier</button>
        </div>
      </div>

    </article>
  )
}

export default ProductCard