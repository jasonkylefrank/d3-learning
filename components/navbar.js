import styled from "styled-components";
import Link from 'next/link';

const Nav = styled.nav`
    height: 100%;
    display: flex;
    align-items: center;
`;

const NavList = styled.ul`
    display: flex;
`;

const Item = styled.li`
    margin-right: 24px;
`;

const A = styled.a`
    box-shadow: none;
    padding: 2px;
    color: rgba(0,0,0,0.7);
    cursor: pointer;
`;

export default function Navbar() {
    return (
        <Nav>
            <NavList>
                <Item>
                    <Link href="/">
                        <A>Home</A>
                    </Link>
                </Item>
                <Item>
                    <Link href="/scatterplot">
                        <A>Scatterplot</A>
                    </Link>
                </Item>
            </NavList>      
        </Nav>
    );
}

