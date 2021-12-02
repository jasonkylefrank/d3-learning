import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Layout from '../components/layout';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(0,0,0, 0.06);
  }

  html,
  body {    
    color: rgba(0,0,0,0.8);
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: black;
    box-shadow: inset 0 -2px 0 rgba(0,40,150,0.2);
    padding: 2px 0;
    border-radius: 4px 4px 0 0;
    text-decoration: none;
    transition: .15s ease;

    &:hover {
      background-color: rgba(0,40,150,0.1);
    }
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  p {
    line-height: 1.5;
    margin-bottom: 24px;
  }

  code {
    background: #fafafa;
    border-radius: 5px;
    ${'' /* padding: 0.75rem; */}
    padding: 0.2rem 0.15rem;
    ${'' /* font-size: 1.1rem; */}
    font-size: 0.9rem;
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
