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
    & + & {
        ${'' /* TEMP: Using this right now to separate 2 svg containers... I won't want this once I set the svg width back to 100% in javascript */}
        margin-left: 24px;
    }
`;


export default function Scatterplot2() {
    
    const svg1Ref = useRef();
    
    // TODO: Use this to set id's
    //const [nextId, setNextId] = useState(0);

    const [data, setData] = useState([
        { id: 1, name: 'Chester', x:  5, y: 19, circleRadius: 3 },
        { id: 2, name: 'Linda',   x: 15, y:  8, circleRadius: 2 },
        { id: 3, name: 'Mike',    x:  2, y:  5, circleRadius: 7 },
        { id: 4, name: 'Sara',    x: 18, y: 12, circleRadius: 5 }
      ]);  


    useEffect(() => {
        console.log('In useEffect callback, data is: ', data);
        return drawCirclesAndText();
    }, [data]);


    // Timer to change data
    useEffect(() => {
        const timer = setTimeout(() => {
            //console.log('setTimeout callback running');
            const updatedData = [...data];
            //updatedData[1] = { id: 5, name: 'Larry', x: 10, y: 10, circleRadius: 8 };

            updatedData[1] = { ...updatedData[1],  x: 10, y: 10, circleRadius: 8 };

            //  This one proves that the scaling functions properly recalculate min and max (since these values are larger than the other data's x and y)
            //updatedData[1] = { name: 'Larry', x: 40, y: 40, circleRadius: 8 };

            setData(updatedData);            
        }, 1800);
        return () => {
            clearTimeout(timer);
        }
    }, []);



    const drawCirclesAndText = () => {
        // --- Setting up the outter svg
        const svgWidth = 640;
        // TODO: Use this percentage-based approach once I figure out how to handle the translate issue
        //   For another possible workaround, see: https://stackoverflow.com/a/17103928/718325
        // const svgWidth = '100%';
        const svgHeight = 300;

        const svg = d3.select(svg1Ref.current)
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        // --- Set up the scaling
        const maxX = d3.max(data, item => item.x);
        const minX = d3.min(data, item => item.x);
        const maxY = d3.max(data, item => item.y);
        const minY = d3.min(data, item => item.y);

        const xScale = d3.scaleLinear()
            //.domain([0, maxX + maxX * 0.1])
            .domain([minX - minX * 0.5, maxX + maxX * 0.07])
            .range([0, svgWidth]);

        const yScale = d3.scaleLinear()
            .domain([minY - minY * 0.5, maxY + maxY *0.07])
            .range([0, svgHeight]);

        // --- Set up the axes
        // TODO...

        // --- Set up the svg elements     



        console.log('In drawCirclesAndText , data is: ', data);
        console.log('In drawCirclesAndText , svg is: ', svg);
        console.log('In drawCirclesAndText , svg.selectAll("g") is: ', svg.selectAll("g"));



        const circleGroups = svg
            .selectAll('g')
            // .data(data, d => d.id)
            // .data(data, item => {
            //     console.log(item);
            //     return d.id;
            // })
            .data(data) // TEMP (it should have the second argument supplying a key, but that bombs... maybe that only works when you're appending elements in this method chain)

            .transition()
            .duration(1200)
            .attr('transform', 
                    item => `translate( ${xScale(item.x)}, ${yScale(item.y)} )`
            );

        // circleGroups
        //     .append('circle').attr('r', item => item.circleRadius).attr('fill', 'red');
        
        // circleGroups.append('text')            
        //     .attr('x', item => item.circleRadius + 8) // These x and y values are relative to their group element, which is being positioned via a transform (or possibly via a nested <svg> element with x and y values)
        //     .attr('y', '0.3rem')
        //     .text(item => item.name);


        
        // const circles = circleGroups
        //     .selectAll('circle')
        //     .data(data)
        //     .transition()
        //     .duration(1200)
        //     .attr('r', item => item.circleRadius);

        // return () => {
        //     circleGroups.remove();
        // }
    };



    const circleGroupElements = data.map( item => (
        // <g key={item.id} />
        <g key={item.id}>
            <circle r={item.circleRadius} fill="green" />
            <text x={item.circleRadius + 8} y="0.3rem">
                {item.name}
            </text>
        </g>
    ));


    return (
        <>
            <Head>
                <title>D3 learning • Scatterplot</title>        
            </Head>

            <Title>Scatterplot with <code>.join()</code> & React as "master chef"</Title>

            <p>
                (description will be here)
            </p>


            <SVG ref={svg1Ref}>
                {circleGroupElements}
            </SVG>
        </>
    )
}