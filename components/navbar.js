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

export default function Navbar() {
    return (
        <Nav>
            <NavList>
                <Item>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </Item>
                <Item>
                    <Link href="/scatterplot">
                        <a>Scatterplot</a>
                    </Link>
                </Item>
            </NavList>      
        </Nav>
    );
}

