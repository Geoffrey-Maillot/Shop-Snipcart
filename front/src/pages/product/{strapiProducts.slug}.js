import React, { useState } from "react"
import { Helmet } from 'react-helmet'


import { graphql } from "gatsby";
import { getImage, GatsbyImage, getSrc } from 'gatsby-plugin-image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Layout from "../../components/Layout"
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import JsonLd from '../../components/JsonLd'


// styles
const styles = {
  product: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '40px',
  },
  img: {
    width: 'calc(50% - 20px)'
  },
  content: {
    width: 'calc(50% - 20px)',
    //  flex: 'none',
  },
  title: {
    fontSize: '2em',
    fontWeight: 700,
  },
  description: {
    margin: '30px 0',
  },
  price: {
    width: '200px',
    marfinLeft: 'auto',
    fontSize: '2em',
    fontWeight: '400',
    margin: '30px 0 30px auto',
    textAlign: 'right',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  select: {
    width: '100%',
    padding: '20px',
    marginBottom: '30px',
    fontSize: '1.2em',
  },
  button: {
    width: '100%',
    padding: '20px',
    border: 'none',
    backgroundColor: '#875a83',
    color: '#fff',

    fontSize: '20px'
  },

}

// markup
const Product = ({ data }) => {
  const product = data.strapiProducts

  // Product Quantity
  const [quantity, setQuantity] = useState(1)
  const changeQuantity = (e) => setQuantity(e.target.value)

  // Product Option
  const [contenanceValue, setValue] = useState('50ml')
  const changeOption = (e) => setValue(e.target.value)

  // Gift Option
  const [isGift, setIsGift] = useState(false)
  const toggleGift = () => setIsGift(() => !isGift)

  // Gift Option
  const [isShippable, setIsShippable] = useState(true)
  const toggleShippable = () => setIsShippable(() => !isShippable)

  // Calcul Price to Display
  const priceContenant100ml = 8
  let totalPrice = product.price
  if (contenanceValue === '100ml') totalPrice = totalPrice + priceContenant100ml

  // All images
  const imagesGet = product.image.map((image) => getImage(image.localFile))
  // First image Source
  const srcImg = getSrc(product.image[0].localFile)

  return (
    <div>
      <Helmet>
        <html lang="fr" />
        <meta charSet="utf-8" />
        <title>{`${product.title}`}</title>
        <meta name="description" content={`Page du produit ${product.id}`} />
        <JsonLd>
          {{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'http://www.example.com',
            name: 'Boutique Gatsby-Snipcart',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+33650828740',
              contactType: 'Patron',
            },
          }}
        </JsonLd>
      </Helmet>
      <Header />
      <Nav />
      <Layout>
        <section style={styles.product}>
          <div style={styles.img}>
            <Carousel showThumbs={false} showArrows={false} showStatus={false} autoPlay interval="3000">
              {imagesGet.map((image, i) => (
                <div key={i}>
                  <GatsbyImage
                    image={image}
                    alt={product.title}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div style={styles.content}>
            <h1 style={styles.title}>{product.title}</h1>
            <p style={styles.description}>{product.description}</p>
            <div style={styles.price}>{totalPrice * quantity} €</div>
            <form onSubmit={changeQuantity}>
              {/* Quantity options*/}
              <label style={styles.label} htmlFor="quantity">Quantité</label>
              <select style={styles.select} id="quantity" onChange={changeQuantity}>
                <option value="1" defaultValue>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {/* Contenance Options*/}
              <label style={styles.label} htmlFor="contenance">
                Contenance
              </label>
              <select style={styles.select} id="Contenance" onChange={changeOption}>
                <option value="50ml">50ml</option>
                <option value="100ml">{`100ml (+ ${priceContenant100ml}€)`}</option>
              </select>

              <label >Cadeau <input onClick={toggleGift} type="checkbox" /></label>
              <label >Click and Collect <input onClick={toggleShippable} type="checkbox" /></label>


              <button
                onClick={(e) => console.dir(e.target.dataset)}
                type='button'
                style={styles.button}
                className="snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-url={`/products.json`}
                data-item-name={product.title}
                data-item-image={srcImg}
                data-item-quantity={quantity}
                //data-item-max-quantity='10'
                data-item-custom1-name="Contenance"
                data-item-custom1-options={`50ml|100ml[+${priceContenant100ml}]`}
                data-item-custom1-value={contenanceValue}
                data-item-custom2-name="Cadeau"
                data-item-custom2-type="checkbox"
                data-item-custom2-value={isGift}
                data-item-custom3-name="Click and collect"
                data-item-custom3-type="checkbox"
                data-item-custom3-value={!isShippable}
                data-item-stackable="auto"
                data-item-shippable={isShippable}
                data-item-has-taxes-included={true}
              >
                Ajouter au panier
              </button>
            </form>
          </div>
        </section>
      </Layout>
    </div>

  )
}


export default Product


export const query = graphql`
query($id: String) {
  strapiProducts(id: { eq: $id }) {
    id
    price
    slug
    title
    description
        image {
          localFile {
            childImageSharp {
          gatsbyImageData(width: 500, aspectRatio: 1)
        }
      }
    }
  }
}
`



