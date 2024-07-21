import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags for SEO */}
          <meta name="description" content="Capex item reservation system" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Link to global stylesheets */}
          <link rel="stylesheet" href="/styles/global.css" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          {/* Additional head elements can be added here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
