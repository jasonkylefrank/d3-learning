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


export default function Scatterplot() {
    
    const svg1Ref = useRef();
    const svg2Ref = useRef();
    
    // TODO: Use this to set id's
    //const [nextId, setNextId] = useState(0);

    const [data, setData] = useState([
        { id: 1, name: 'Chester', x:  5, y: 19, circleRadius: 3 },
        { id: 2, name: 'Linda',   x: 15, y:  8, circleRadius: 2 },
        { id: 3, name: 'Mike',    x:  2, y:  5, circleRadius: 7 },
        { id: 4, name: 'Sara',    x: 18, y: 12, circleRadius: 5 }
      ]);  


    useEffect(() => {
        return drawCirclesOnly();
    }, [data]);

    useEffect(() => {
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


    const drawCirclesOnly = () => {
        // --- Setting up the svg
        const svgWidth = 400;
        // const svgWidth = '100%'; // TODO: Use this percentage-based approach once I figure out how to handle the translate issue
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

        // --- Set up the data for the svg
        const circles = svg
            .selectAll('circle')
            .data(data);
        
        circles.exit().remove();
        
        circles.enter().append('circle').attr('r', item => item.circleRadius)
            .merge(circles)
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y));
    };

    const drawCirclesAndText = () => {
        // --- Setting up the outter svg
        const svgWidth = 400;
        // TODO: Use this percentage-based approach once I figure out how to handle the translate issue
        //   For another possible workaround, see: https://stackoverflow.com/a/17103928/718325
        // const svgWidth = '100%';
        const svgHeight = 300;

        const svg = d3.select(svg2Ref.current)
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
        
        const t = svg.transition().duration(1200);

        const circleGroups = svg
            .selectAll('g')
            .data(data, d => d.id)
            //.join('g')
            // .attr('transform', 
            //         item => `translate( ${xScale(item.x)}, ${yScale(item.y)} )`
            // );
            .join(
                enter => enter
                    .append('g')
                    .call(
                        enter =>
                            enter.transition(t)
                            .attr('transform',
                                    item => `translate( ${xScale(item.x)}, ${yScale(item.y)} )`
                            ),
                    ),
                    
                update => update
                    .call(
                        update =>
                            update.transition(t)
                            .attr('transform',
                                item => `translate( ${xScale(item.x)}, ${yScale(item.y)} )`
                            )
                    ),

                exit => exit
                    .call(
                        exit =>
                            exit.transition(t)
                            .attr('transform', 'scale(0)')
                            .remove()
                    )
            );

        circleGroups.exit().remove();  // TODO: Determine if this is necessary with the ".join()" approach

        circleGroups
            .append('circle').attr('r', item => item.circleRadius).attr('fill', 'red');
        
        circleGroups.append('text')            
            .attr('x', item => item.circleRadius + 8) // These x and y values are relative to their group element, which is being positioned via a transform (or possibly via a nested <svg> element with x and y values)
            .attr('y', '0.3rem')
            .text(item => item.name);

        // Transitions
        // ******* This approach seems to apply the transition to ALL items after a single item has been changed
        // circleGroups
        //     .transition()
        //     .duration(1500)
        //     .attr('transform', 
        //             item => `translate( ${xScale(item.x)}, ${yScale(item.y)} )`
        //     );

        // This cleanup function seems to be needed to prevent duplicate circle and text elements from
        //  being injected upon a code change when using hot reloading
        return () => {
            circleGroups.remove();
        }
    };





    return (
        <>
            <Head>
                <title>D3 learning • Scatterplot</title>        
            </Head>

            <Title>Scatterplot with <code>.merge()</code></Title>

            <p>
                This demo was inspired by Mike Bostock&apos;s&nbsp;
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


            <SVG ref={svg1Ref}></SVG>

            <SVG ref={svg2Ref}></SVG>
        </>
    )
}