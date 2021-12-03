import styled from "styled-components";

const FooterContainer = styled.footer`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgba(0,0,0,0.7);
`;

export default function Footer() {
    return (
        <FooterContainer>        
            Powered by&nbsp;
            <span className="poweredByItem">D3.js,</span>
            &nbsp;
            <span className="poweredByItem">Next.js,</span>
            &nbsp;
            <span className="poweredByItem">Styled Components,</span>
            &nbsp;
            <span className="poweredByItem">and more</span>
      </FooterContainer>
    );
}
