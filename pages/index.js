import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styled from 'styled-components';


const Title = styled.h1`
  font-size: 36px;
  ${'' /* color: ${ ({theme}) => theme.colors.primary }; */}
`;


export default function Home() {
  return (
    // <div className={styles.container}>
    <div>
      <Head>
        {/* TODO:  Figure out how to pass-in the appended part of the title so the first part will be consistent for all pages */}
        <title>D3 learning • Home</title>        
      </Head>

      <main>
        <Title>
          D3.js learning
        </Title>


      </main>      
    </div>
  )
}
