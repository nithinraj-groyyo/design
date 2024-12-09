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
                    width={500}
                    height={300}
                    minWidth={400}
                    maxWidth={1000}
                    minHeight={150}
                    maxHeight={300}
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
                    {pageImages?.map((image: any, index: number) => (
                        <div className="page" key={index}>
                            <img
                                src={image?.signedUrl}
                                alt={image?.createdAt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            ) : (
                // Desktop View
                <HTMLFlipBook
                    // key={isPortrait}
                    style={{}}
                    ref={ref}
                    startZIndex={1}
                    width={800}
                    height={450}
                    minWidth={600}
                    maxWidth={1000}
                    minHeight={337.5}
                    maxHeight={562.5}
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
                    {pageImages?.map((image: any, index: number) => (
                        <div className="page" key={index}>
                            <img
                                src={image?.signedUrl}
                                alt={image?.createdAt}
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
