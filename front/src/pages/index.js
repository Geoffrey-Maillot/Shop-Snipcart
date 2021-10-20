import * as React from "react"

// Import component =>
import Layout from "../components/Layout"
import Header from '../components/Header';
import Nav from '../components/Nav';
import Search from "../components/Search";
// import Modal from "../components/Modal";

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
      <Search />

      {/* <Modal> Test modal</Modal> */}

    </div>


  )
}



export default IndexPage
