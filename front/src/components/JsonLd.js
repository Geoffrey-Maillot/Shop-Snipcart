import React from 'react'
import Helmet from 'react-helmet'

function JsonLd({ children }) {
  return (
    <script type="application/ld+json">{JSON.stringify(children)}</script>
  )
}

export default JsonLd