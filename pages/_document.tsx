import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from 'components/navbar'
import Footer from 'components/footer'

const Document = () => (
  <Html>
    <Head>
      <link rel='stylesheet' href='https://cdn.shk.im/webcore/v20.css' />
      <script src='https://cdn.shk.im/webcore/v20.js'></script>
    </Head>
    <body>
    <div className='container'>
      <Navbar />
      <Main />
      <Footer />
      <NextScript />
    </div>
    </body>
  </Html>
)

export default Document
