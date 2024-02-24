import { useEffect, useRef } from 'react';
import gsap, { Power1, Power3 } from 'gsap';
import styled from 'styled-components';
import styles from './styles/landing.module.css';
import { device } from '../utilities';
import { useNavigate } from 'react-router';
import ReactGA from "react-ga4";

//Component Imports below
import LandingHeading from '../components/landing/heading';
import Navbar from '../components/navbar';
import BottomPane from '../components/landing/bottomPane';
import Atlas from '../components/landing/atlas';
import Button from '../components/button';

//Image Imports Below
import one1971 from '../resources/image_exports/71-left.png'
import two1971 from '../resources/image_exports/71-right.png'
import benazir_wave from '../resources/image_exports/benazir.png';


const Container = styled.div`
    position: relative;
    height: ${window.innerHeight < 1000 ? `100vh`: `${window.innerHeight}px`};
    width: 100vw;
    overflow: hidden;
    background-color: var(--lightgreen);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MapImage = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt, 
}))`
    position: absolute; 
    opacity: 0;
    width: ${props => props.$width.mob};
    top: ${props => props.$position.mob.top};
    bottom: ${props => props.$position.mob.bottom};
    left: ${props => props.$position.mob.left};
    right: ${props => props.$position.mob.right};

    @media ${device.tablet} {
        width: ${props => props.$width.tab};
        top: ${props => props.$position.tab.top};
        bottom: ${props => props.$position.tab.bottom};
        left: ${props => props.$position.tab.left};
        right: ${props => props.$position.tab.right};
    }

    @media ${device.laptopM} {
        width: ${props => props.$width.desk};
        top: ${props => props.$position.desk.top};
        bottom: ${props => props.$position.desk.bottom};
        left: ${props => props.$position.desk.left};
        right: ${props => props.$position.desk.right};
    }

    @media ${device.desktop} {
        width: ${props => props.$width.deskL};
        top: ${props => props.$position.desk.top};
        bottom: ${props => props.$position.desk.bottom};
        left: ${props => props.$position.desk.left};
        right: ${props => props.$position.desk.right};
    }

    @media ${device.desktopL} {
        width: ${props => props.$width.deskLL};
        top: ${props => props.$position.desk.top};
        bottom: ${props => props.$position.desk.bottom};
        left: ${props => props.$position.desk.left};
        right: ${props => props.$position.desk.right};
    }
`;

const HeadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 2;
    margin-top: 3rem;
    box-sizing: border-box;
    padding: var(--navPadding);
`;

const HeadingPadding = styled.div`
    margin: 1.75rem 0px;
`;

export default function Landing() {
    const right_70 = useRef();
    const left_70 = useRef();
    const benazir = useRef();

    const buttonArea = useRef();

    const navigate = useNavigate();

    useEffect(() => {
     /*   let anim1 = gsap.timeline({repeat: -1, repeatDelay: 0.2});
            anim1.fromTo(left_70.current, {opacity: 0, filter: 'blur(3px)', left: -15} , {opacity: 1, filter: 'blur(0px)', left: 0, duration: 1.05, ease: Power1.easeOut});
            anim1.fromTo(right_70.current, {opacity: 0, filter: 'blur(3px)', bottom: -25} , {opacity: 1, filter: 'blur(0px)', bottom: 0, duration: 0.9, delay: 0.25, ease: Power1.easeInOut}, "<");
            anim1.to(left_70.current, {opacity: 0, filter: 'blur(3px)', left: -15, duration: 0.85, ease: Power1.easeOut}, "<4");
            anim1.to(right_70.current, {opacity: 0, filter: 'blur(3px)', bottom: -25, duration: 0.85, ease: Power1.easeOut}, "<0.25");
            anim1.fromTo(benazir.current, {opacity: 0, scale: 1.025}, {opacity: 1, scale: 1, duration: 1.15, ease: Power1.easeOut}, "<0.5");
            anim1.to(benazir.current, {opacity: 0, scale: 1.03, duration: 0.8, ease: Power1.easeIn}, "<4.25"); */

        let anim1 = gsap.timeline({repeat: -1});
            anim1.fromTo(left_70.current, {opacity: 0, filter: 'blur(3px)', transform: 'translateX(-15px)'} , {opacity: 1, filter: 'blur(0px)', transform: 'translateX(0px)', duration: 1.05, ease: Power1.easeOut});
            anim1.fromTo(right_70.current, {opacity: 0, filter: 'blur(3px)', transform: 'translateY(25px)'} , {opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)', duration: 0.9, delay: 0.25, ease: Power1.easeInOut}, "<0.3");
            anim1.fromTo(benazir.current, {opacity: 0, scale: 1.025}, {opacity: 1, scale: 1, duration: 1.5, ease: Power1.easeOut}, "<4");
            anim1.to(right_70.current, {opacity: 0, filter: 'blur(3px)', transform: 'translateY(25px)', duration: 0.9, ease: Power1.easeOut}, "<0.25");
            anim1.to(left_70.current, {filter: 'blur(10px)', opacity: 0.475, left: -15, duration: 1.1, ease: Power1.easeOut}, "<0.25");
            anim1.to(left_70.current, {opacity: 0, filter: 'blur(3px)', left: -15, duration: 1, ease: Power1.easeOut}, "<4");
            anim1.to(benazir.current, {filter: 'blur(15px)', opacity: 0.55, transform: 'translateX(-30%)', duration: 2.25, ease: Power1.easeInOut}, "<-0.2");
            anim1.to(right_70.current, {opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)', duration: 1, ease: Power1.easeOut}, "<0.3");
            anim1.to(benazir.current, {opacity: 0, scale: 1.03, filter: 'blur(0px)', duration: 0.8, ease: Power1.easeIn}, "<4.5");
            anim1.to(right_70.current, {opacity: 0, filter: 'blur(3px)', transform: 'translateY(25px)', duration: 0.85, ease: Power1.easeOut}, "<0.25");

        gsap.fromTo(buttonArea.current, {opacity: 0, transform: 'translateY(-25px)', filter: 'blur(1.5px)'}, {opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)', duration: 0.8, delay: 0.3});        

        ReactGA.send({ hitType: "pageview", page: "/", title: "Landing Page" });

        return () => {
            anim1.kill();
        } 
 
    }, []);

    return (
        <Container>
            <Navbar/>

            <MapImage 
                id={styles.landing71L}
                ref={left_70}
                src={one1971}
                $width={{
                    desk: '22%',
                    deskL: '24%',
                    deskLL: '26%',
                    mob: '55%',
                    tab: '40%'
                }}
                $alt="Presenters presenting the results of 1970 elections in Pakistan"
                $position={{
                    desk: {top: '0%', left: '0%', right: 'unset'},
                    mob: {top: '0%', left: '0%', right: 'unset'},
                    tab: {top: '0%', left: '-5vw', right: 'unset'}
                }}
            />
            <MapImage 
                id={styles.landing71R}
                src={two1971}
                ref={right_70}
                $width={{
                    desk: '35%',
                    deskL: '38%',
                    deskLL: '40%',
                    mob: '65%',
                    tab: '55%',
                }}
                $alt="Presenters presenting the results of 1970 elections in Pakistan"
                $position={{
                    desk: {top: 'unset', bottom: '0px', left: 'unset', right: '2.5rem'},
                    mob: {top: 'unset', bottom: '5vh', left: 'unset', right: '0px'},
                    tab: {top: 'unset', bottom: '0px', left: 'unset', right: '2.5rem'},
                }}
            />
            <MapImage 
                id={styles.benazir}
                src={benazir_wave}
                ref={benazir}
                $width={{
                    desk: '60%',
                    deskL: '62%',
                    deskLL: '64%',
                    mob: '150%',
                    tab: '90%'
                }}
                $alt="Presenters presenting the results of 1970 elections in Pakistan"
                $position={{
                    desk: {top: 'unset', bottom: 'unset', left: '30vw', right: 'unset'},
                    mob: {top: 'unset', bottom: 'unset', left: '-5vw', right: 'unset'},
                    tab: {top: 'unset', bottom: 'unset', left: '0px', right: 'unset'},
                }}
            /> 

            <HeadingContainer>
                <HeadingPadding>
                    <LandingHeading classname={`${styles.heading}`} heading='Pakistan General Elections' charDelay={0.015}/>
                </HeadingPadding>
                <div ref={buttonArea} style={{opacity: 0}}>
                    <Atlas></Atlas>
                    <Button callback={() => navigate('/data')}/>     
                </div>
            </HeadingContainer>

            <BottomPane/>
        </Container>
    );
}


