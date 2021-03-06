import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang={"en"} dir={"ltr"}>
        <Head>
          <style jsx={"true"} global={"true"}>{`
            html,
            body,
            .app-container {
              font-family: proxima-nova, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
              padding: 0;
              margin: 0;
              border: none;
              height: 100%;
              width: 100%;
            }
            *:focus {
                outline: 0;
            }
            // @media (prefers-color-scheme: dark) {
            //   body {
            //     background-color: #1B1B1B;
            //     color: white;
            //   }
            // }
          `}</style>
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
