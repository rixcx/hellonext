import Layout from '../components/Layout'
import Head from "next/head";
import '../styles/global/global.scss'
import '../styles/global/reset.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Blog title</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
