import Head from 'next/head';
import Navbar from "./navbar";  
import Footer from './footer';
import styled from "styled-components";

const navBarHeight = 64;
const footerHeight = 64;

const NavbarWrapper = styled.div`
    height: ${navBarHeight}px;
    padding: 0 24px;
    border-bottom: 1px solid rgba(0,0,0,0.1);)
`;

const FooterWrapper = styled.div`
    height: ${footerHeight}px;
`;

const Main = styled.main`
    min-height: calc(100vh - ${navBarHeight}px - ${footerHeight}px);
    padding: 24px;
    max-width: 880px;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>D3 learning</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavbarWrapper>
                <Navbar />
            </NavbarWrapper>
            
            <MainWrapper>
                <Main>{ children }</Main>
            </MainWrapper>
            
            <FooterWrapper>
                <Footer />                
            </FooterWrapper>
        </>
    );
}