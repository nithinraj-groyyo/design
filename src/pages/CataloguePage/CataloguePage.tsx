import React from 'react';
// import BasicLayout from '../../layouts/BasicLayout';
import HTMLFlipBook from 'react-pageflip';

const CataloguePage = () => {
  return (
    <div>
      <div className="flex justify-center bg-black p-8 h-screen">
        <HTMLFlipBook
        style={{}}
          width={400}
          height={600}
          size="fixed"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1200}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startPage={0}
          startZIndex={1}
          autoSize={true}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          className="flipbook"
        >
          {/* Cover Page */}
          <div className="page flex flex-col items-center justify-center bg-[#f9fafb] p-8">
            <h1 className="text-4xl font-bold text-gray-800">FASHION</h1>
            <p className="mt-2 text-center text-gray-600">Click to view in fullscreen</p>
            <img src="/images/products/pic5.png" alt="Fashion cover" className="mt-4 w-full h-fit object-contain" />
          </div>

          {/* About Us Page */}
          <div className="page bg-[#eaeff1] p-8">
            <h2 className="text-2xl font-semibold text-gray-800">About Us</h2>
            <p className="text-sm mt-2 text-gray-700">
              We offer a broad range of solutions for illustrated book publishers to produce digital website content, online user manuals, digital annual reports, flipping e-magazines, flip PowerPoint presentations, and more.
            </p>
            <img src="/images/products/pic4.png" alt="About us page" className="mt-4 w-full h-fit object-contain" />
          </div>

          {/* Product Categories Page */}
          <div className="page bg-[#f5f7fa] p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Product Categories</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Women's Clothing</li>
              <li>Men's Fashion</li>
              <li>Accessories</li>
              <li>Shoes</li>
              <li>Bags</li>
            </ul>
            <img src="/images/products/pic3.png" alt="Product categories" className="mt-4 w-full h-fit object-contain" />
          </div>

          {/* Featured Products Page */}
          <div className="page bg-[#edf2f7] p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Products</h2>
            <p className="text-sm mt-2 text-gray-700">Discover our most popular and trending products.</p>
            <img src="/images/products/pic2.png" alt="Featured products" className="mt-4 w-full h-fit object-contain" />
          </div>

          {/* Best Sellers Page */}
          <div className="page bg-[#f1f5f9] p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Best Sellers</h2>
            <p className="text-sm mt-2 text-gray-700">Check out our best-selling products loved by our customers.</p>
            <img src="/images/products/pic1.png" alt="Best sellers" className="mt-4 w-full h-fit object-contain" />
          </div>

          {/* Closing Page */}
          <div className="page flex flex-col items-center justify-center bg-[#e2e8f0] p-8">
            <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
            <p className="text-center mt-2 text-gray-700">We hope you enjoyed our catalogue. Visit our website for more!</p>
            <img src="/images/products/pic3.png" alt="Thank you page" className="mt-4 w-full h-fit object-contain" />
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default CataloguePage;
