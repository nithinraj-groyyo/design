import { useEffect, useState } from 'react';
import { useScroll, useSpring, animated } from '@react-spring/web';
import BasicLayout from '../../layouts/BasicLayout';

const Home = () => {
    const { scrollY } = useScroll();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const scrollToTop = () => window.scrollTo(0, 0);

        const timer = setTimeout(scrollToTop, 100); 

        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };
        window.addEventListener("resize", checkScreenSize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const layerSpring = useSpring({
        transform: isSmallScreen ? "translateX(0)" : scrollY.to(
            [window.innerHeight, window.innerHeight * 2],
            ["translateX(50%)", "translateX(100%)"]
        ),
        opacity: isSmallScreen ? 1 : scrollY.to(
            [window.innerHeight * 2, window.innerHeight * 2.5],
            [1, 0]
        ),
        config: { duration: 500 },
    });

    return (
        <BasicLayout showFooter={false}>
            <div className="overflow-x-hidden">
                <section className="relative flex xxs:flex-col lg:flex-row items-center justify-center h-screen">
                    <div className="xxs:hidden lg:flex w-full sm:w-1/2 h-1/2 sm:h-1/2 justify-center">
                        <img
                            src="/images/landingPages/landingPage_1_1.png"
                            alt="Landing_1"
                            className="xxs:w-full w-4/5 sm:w-2/5 h-full"
                        />
                    </div>
                    <img
                        src="/images/landingPages/landingPage_1_2.png"
                        alt="Landing_1"
                        className="xxs:w-full w-full lg:w-1/2 h-full"
                    />
                </section>
                <section className="relative flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex xxs:flex-col lg:flex-row relative w-full h-full">
                        <img
                            src="/images/landingPages/landingPage_2_1.png"
                            alt="Landing_2"
                            className="xxs:w-full lg:w-2/5 h-screen object-cover"
                        />
                        <img
                            src="/images/landingPages/landingPage_2_2.png"
                            alt="Landing_2"
                            className="xxs:w-full lg:w-3/5 h-screen object-cover z-10"
                        />
                        {!isSmallScreen && (
                            <animated.div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "50%",
                                    height: "100%",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transform: layerSpring.transform,
                                    opacity: layerSpring.opacity,
                                }}
                            />
                        )}
                    </div>
                </section>
                <section className="relative flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex xxs:flex-col lg:flex-row relative w-full h-full">
                        <img
                            src="/images/landingPages/landingPage_3_1.png"
                            alt="Landing_3"
                            className="w-full lg:w-3/5 h-screen object-cover"
                        />
                        <img
                            src="/images/landingPages/landingPage_3_2.png"
                            alt="Landing_3"
                            className="w-full lg:w-2/5 h-screen object-cover"
                        />
                        {!isSmallScreen && (
                            <animated.div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "50%",
                                    height: "100%",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transform: layerSpring.transform,
                                    opacity: layerSpring.opacity,
                                }}
                            />
                        )}
                    </div>
                </section>
            </div>
        </BasicLayout>
    );
}

export default Home;