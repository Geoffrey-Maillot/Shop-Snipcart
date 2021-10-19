import * as React from "react"

// Import component =>
import Layout from "../components/Layout"
import Header from '../components/Header';
import Nav from '../components/Nav';


// styles

// markup
const IndexPage = () => {


  return (
    <div>
      <Header />
      <Nav />
      <Layout>
        <h1>Bienvenur sur mon super site</h1>
      </Layout>
    </div>


  )
}



export default IndexPage
