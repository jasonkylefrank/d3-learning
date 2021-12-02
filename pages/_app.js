import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Layout from '../components/layout';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(0,0,0, 0.06);
  }

  html,
  body {    
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  code {
    background: #fafafa;
    border-radius: 5px;
    ${'' /* padding: 0.75rem; */}
    padding: 0.3rem;
    ${'' /* font-size: 1.1rem; */}
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
      Bitstream Vera Sans Mono, Courier New, monospace;
  }

  ul {
    list-style: none;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3'
  }
};


export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
