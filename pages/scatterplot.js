import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import * as d3 from 'd3';


const Title = styled.h1`
    margin-top: 12px;
    margin-bottom: 36px;

    & > code {
        font-size: inherit;
    }
`;

const SVG = styled.svg`
    background-color: white;
    margin-top: 24px;
`;


export default function Scatterplot() {
    
    const svgRef = useRef();

    const [data, setData] = useState([
        { name: 'Chester', x:  5, y: 19 },
        { name: 'Linda',   x: 15, y:  8 },
        { name: 'Mike',    x:  2, y:  5 },
        { name: 'Sara',    x: 18, y: 12 }
      ]);  

    const maxX = d3.max(data, item => item.x);
    const minX = d3.min(data, item => item.x);
    const maxY = d3.max(data, item => item.y);
    const minY = d3.min(data, item => item.y);
    
    const circleRadius = 3;
    
    const domainMinX = minX - minX * 0.5;
    const domainMinY = minY - minY * 0.5;

      
    useEffect(() => {
        // --- Setting up the svg
        // const svgWidth = 400;
        const svgWidth = '100%';
        const svgHeight = 300;

        const svg = d3.select(svgRef.current)
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        // --- Set up the scaling
        const xScale = d3.scaleLinear()
            //.domain([0, maxX + maxX * 0.1])
            .domain([domainMinX, maxX + maxX * 0.1])
            .range([0, svgWidth]);

        const yScale = d3.scaleLinear()
            .domain([domainMinY, maxY + maxY *0.1])
            .range([0, svgHeight]);

        // --- Set up the axes

        // --- Set up the data for the svg
        const circles = svg
            .selectAll('circle')
            .data(data);
        
        circles.exit().remove();
        
        circles.enter().append('circle').attr('r', circleRadius)
            .merge(circles)
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y));
                // .append('span')
                // .text(item => item.name);

    }, [data]);

    return (
        <>
            <Head>
                <title>D3 learning • Scatterplot</title>        
            </Head>

            <Title>Scatterplot with <code>.merge()</code></Title>

            <p>
                This demo was inspired by Mike Bostock's&nbsp;
                <a href="https://bost.ocks.org/mike/join/">
                    Thinking in joins
                </a>
                &nbsp;
                article.
            </p>
            <p>
                In particular, it illustrates how to use the <code>selection.merge()</code>&nbsp;
                method to create DRYer D3 code.  That method allows you
                to express what to do with both the <strong>enter</strong> <em>and</em> <strong>update</strong>&nbsp;
                selections.
            </p>


            <SVG ref={svgRef}></SVG>
        </>
    )
}