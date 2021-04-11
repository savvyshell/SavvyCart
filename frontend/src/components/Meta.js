import React from 'react'
import Helmet from "react-helmet"

const Meta = ({ title, desc, keywords }) => {
  return (<>
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desc} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  </>)
}

Meta.defaultProps = {
  title: 'Welcome to SavvyCart',
  desc: 'eCommerce platform created with React. Savvyshell.com',
  keywords: 'savvycart, ecommerce, savvyshell'
}

export default Meta
