import * as React from "react"
import { Helmet } from 'react-helmet'

// Import component =>
import Layout from "../components/Layout"
import Header from '../components/Header';
import Nav from '../components/Nav';
import Search from "../components/Search";
import JsonLd from '../components/JsonLd'
// import Modal from "../components/Modal";

// styles

// markup
const IndexPage = () => {


  return (
    <div>
      <Helmet>
        <html lang="fr" />
        <meta charSet="utf-8" />
        <title>Boutique Gatsby-Snipcart</title>
        <meta name="description" content="Boutique test Gatsby / Snipcart" />
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
      <Layout>
        <h1>Bienvenur sur mon super site</h1>
      </Layout>
      <Search />

      {/* <Modal> Test modal</Modal> */}

    </div>


  )
}



export default IndexPage
