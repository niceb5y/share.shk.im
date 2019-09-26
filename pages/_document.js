import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdn.shk.im/webcore/v19.css" />
          <script src="https://cdn.shk.im/webcore/v19.js"></script>
        </Head>
        <body>
          <div className="container">
            <Navbar />
            <Main />
            <Footer />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
