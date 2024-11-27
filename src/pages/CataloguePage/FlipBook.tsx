import React, { forwardRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const FlipBook = forwardRef((props: any, ref) => {
    const { pageImages, isPortrait, onFlip, isMobile } = props;
    const [isMobileView, setIsMobileView] = useState(isMobile);

    useEffect(() => {
        setIsMobileView(isMobile);
    }, [isMobile]);

    return (
        <>
            {isMobileView ? (
                // Mobile View
                <HTMLFlipBook
                    key={isPortrait}
                    style={{}}
                    ref={ref}
                    startZIndex={1}
                    width={400}
                    height={400}
                    minWidth={300}
                    maxWidth={800}
                    minHeight={200}
                    maxHeight={400}
                    size="stretch"
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={isPortrait}
                    startPage={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    mobileScrollSupport={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    className="flipbook"
                    onFlip={onFlip}
                >
                    {pageImages.map((image: any, index: number) => (
                        <div className="page" key={index}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            ) : (
                // Desktop View
                <HTMLFlipBook
                    key={isPortrait}
                    style={{}}
                    ref={ref}
                    startZIndex={1}
                    width={960}
                    height={540}
                    minWidth={700}
                    maxWidth={1200}
                    minHeight={400}
                    maxHeight={675}
                    size="stretch"
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={isPortrait}
                    startPage={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    mobileScrollSupport={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    className="flipbook"
                    onFlip={onFlip}
                >
                    {pageImages.map((image: any, index: number) => (
                        <div className="page" key={index}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            )}
        </>
    );
});

export default FlipBook;
