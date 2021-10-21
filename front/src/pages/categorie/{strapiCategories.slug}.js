import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

// Import Components =>
import Layout from "../../components/Layout"
import ProductCard from "../../components/productCard"
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Categorie from "../../components/Categorie";
import SortSelect from "../../components/SortSelect";
import JsonLd from '../../components/JsonLd'

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
    setProductsData(data.strapiCategories.products)
  }, [])

  // J'ai besoin de pouvoir trier le tableau, la méthode sort() manipule la référence du tableau, =>
  // pour éviter cela, je déverse le contenue du state dans un nouveau tableau
  // Une fois le trie effectué, pour repercuté le changement dans le DOM, le remplace le tableau du state avec le nouveau tableau
  const products = [...productsData]
  const sortProduct = (e) => {
    const sortValue = e.target.value
    switch (sortValue) {
      case 'alphabetiqueAZ':
        products.sort((a, b) => a.title.localeCompare(b.title));
        setProductsData(products)
        break;
      case 'alphabetiqueZA':
        products.sort((a, b) => b.title.localeCompare(a.title));
        setProductsData(products)
        break;
      case 'croissant':
        products.sort((a, b) => a.price - b.price);
        setProductsData(products)
        break;
      case 'decroissant':
        products.sort((a, b) => b.price - a.price);
        setProductsData(products)

        break;
      default: break
    }
  }

  if (!products) return null

  // Return =>
  return (
    <div>
      <Helmet>
        <html lang="fr" />
        <meta charSet="utf-8" />
        <title>{data.strapiCategories.name}</title>
        <meta name="description" content={`Liste produit appartenant à la catégorie ${data.strapiCategories.name}`} />
        <JsonLd>
          {{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'http://www.example.com',
            name: 'My website',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-401-555-1212',
              contactType: 'Customer service',
            },
          }}
        </JsonLd>
      </Helmet>
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
            <ProductCard key={product.id} {...product} />
          ))}
        </section>

      </Layout>
    </div>


  )
}

export const query = graphql`
  query($id: String) {
   strapiCategories(id: {eq: $id}){
    products {
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 500, aspectRatio: 1)
          }
        }
      }
      description
      id
      price
      slug
      title
    }
    name
  }
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
