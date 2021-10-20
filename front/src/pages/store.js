import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'


// Import Components =>
import Layout from "../components/Layout"
import ProductCard from "../components/productCard"
import Header from '../components/Header';
import Nav from '../components/Nav';
import Categorie from "../components/Categorie";
import SortSelect from "../components/SortSelect";


const styles = {
  store: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 40
  },
  categories: {
    widht: '100%',
    maxWidth: '1124px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
}


const Product = ({ data }) => {
  const categories = data.allStrapiCategories.edges
  // J'initialise un state pour manipuler les product datas
  const [productsData, setProductsData] = useState([])

  // Après le chargement du composant, j'initialise mon state avec mon tableau de produits
  useEffect(() => {
    setProductsData(data.allStrapiProducts.edges)
  }, [])

  // J'ai besoin de pouvoir trier le tableau, la méthode sort() manipule la référence du tableau, =>
  // pour éviter cela, je déverse le contenue du state dans un nouveau tableau
  // Une fois le trie effectué, pour repercuté le changement dans le DOM, le remplace le tableau du state avec le nouveau tableau
  const products = [...productsData]

  const sortProduct = (e) => {
    const sortValue = e.target.value
    switch (sortValue) {
      case 'alphabetiqueAZ':
        products.sort((a, b) => a.node.title.localeCompare(b.node.title));
        setProductsData(products)
        break;
      case 'alphabetiqueZA':
        products.sort((a, b) => b.node.title.localeCompare(a.node.title));
        setProductsData(products)
        break;
      case 'croissant':
        products.sort((a, b) => a.node.price - b.node.price);
        setProductsData(products)
        break;
      case 'decroissant':
        products.sort((a, b) => b.node.price - a.node.price);
        setProductsData(products)

        break;
      default: break
    }
  }

  if (!products) return null

  // Return =>
  return (
    <div>
      <Header />
      <Nav />
      {/* Categorie*/}
      <nav style={styles.categories}>
        {categories.map((categorie) => (
          <Categorie key={categorie.node.id} {...categorie.node} />
        ))}
      </nav>

      <Layout>
        <SortSelect sortProduct={sortProduct} />
        <section style={styles.store}>
          {products.map((product) => (
            <ProductCard key={product.node.id} {...product.node} data-item-id={product.node.id}
              data-item-price={product.node.price}
              data-item-name={product.node.title} />
          ))}
        </section>

      </Layout>
    </div>


  )
}

export const query = graphql`
  query {
  allStrapiProducts {
    edges {
      node {
        price
        slug
        title
        description
        id
        image {
          id
          localFile {
            childImageSharp {
              gatsbyImageData(width: 500, aspectRatio: 1.5)
            }
          }
        }
      }
    }
  },
   allStrapiCategories {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
`



export default Product
