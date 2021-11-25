import '../styles/globals.css'
import '../public/styles.css'

const myApp = ({ Component, pageProps }) => {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Rubik:wght@500&display=swap" rel="stylesheet"></link>
      </head>
    <Component {...pageProps} />
    </>
  )
}

export default myApp