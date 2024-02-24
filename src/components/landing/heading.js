import styled from 'styled-components';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const StyledHeading = styled.h1`
    position: relative;
    margin: 0px;
    overflow: hidden;

    .word {
        white-space: nowrap;
    }

    .word::after {
        content: ' ';
        white-space: normal;
    }
`

const Span = styled.span`
    display: inline-block;
    opacity: 0;
`

export default function LandingHeading({ 
    heading = 'Heading', 
    level,
    id = '',
    classname = '', 
    charDelay = 0.015, 
    delay = 0,
    from = { opacity: 0, y: '75%'}, 
    to = {opacity: 1, y: 0}, 
    duration = 0.9
}) {
    const [chars, setChars] = useState([]);
    const element = useRef();

    useEffect(() => {
        let words = heading.split(" ");
        const splitchars = [];
        
        words.forEach((word) => {
            splitchars.push(word.split(""));
        });

        setChars(splitchars);

    }, [heading]);

    const createOneTimeAnim = () => {
        let animated = false; 
        let multiplier = 0;

        const triggerAnimation = () => {
            const el = element.current;
            const children = el.children;

            if (children.length > 0 && !animated) {
                for (let i = 0; i < children.length; i++) {
                    const words = children[i];
                    const letters = words.children;
                    for (let j = 0; j < letters.length; j++) {
                        const child = letters[j];
                        multiplier++;
                        gsap.fromTo(child, { ...from }, { ...to, delay: (multiplier)*charDelay + delay, duration: duration});
                    }
                }
                animated = true;
            }
        }
        return triggerAnimation;
    }


    useEffect(() => {
        if (element.current.children && element.current.children.length > 0) {
            const myAnimation = createOneTimeAnim();
            myAnimation();
        }
    }, [element.current]);

    return (
        <StyledHeading ref={element} aria-level={level} id={id} className={classname}>
            {chars.length > 0 && chars.map((char, index) => {
                return (
                    <span key={'word' + index} className='word'>
                        {char.length > 0 && char.map((ch, i) => {
                            return (
                                <Span key={'char' + i}>{ch}</Span>
                            )
                        })}
                    </span>
                )
            })}
        </StyledHeading>
    );
}