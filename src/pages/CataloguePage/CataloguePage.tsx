import HTMLFlipBook from 'react-pageflip';

const CataloguePage = () => {

  return (
    <div>
      <div
        className="flex justify-center items-center p-8 h-screen"
        style={{
          backgroundImage: "url('https://cdn.wallpapersafari.com/59/72/T1XU6L.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Outer wrapper to fix positioning */}
        <div className="relative" style={{ position: 'relative', overflow: 'visible' }}>
          <HTMLFlipBook
          style={{}}
            startZIndex={1}
            width={800}        
            height={1000}      
            minWidth={500}    
            maxWidth={1000}   
            minHeight={500}    
            maxHeight={1400}
            size="stretch"        
            drawShadow={false}
            flippingTime={1000}
            usePortrait={false}   
            startPage={0}
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
            <div className="page flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-8">
              <h1 className="text-5xl font-serif font-bold text-gray-900">FASHION</h1>
              <p className="mt-2 text-center text-gray-700 text-lg font-sans">Click to view in fullscreen</p>
              <img src="/images/products/pic5.png" alt="Fashion cover" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>

            {/* About Us Page */}
            <div className="page bg-gradient-to-tr from-blue-50 to-indigo-100 p-8">
              <h2 className="text-3xl font-serif font-semibold text-gray-800">About Us</h2>
              <p className="text-base mt-4 text-gray-700 font-sans">
                We offer a range of solutions for illustrated book publishers to produce digital website content, online manuals, and more.
              </p>
              <p className="text-sm mt-4 italic text-gray-600">"Empowering digital storytelling"</p>
              <img src="/images/products/pic4.png" alt="About us page" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>

            {/* Product Categories Page */}
            <div className="page bg-gradient-to-br from-green-50 to-teal-100 p-8">
              <h2 className="text-3xl font-serif font-semibold text-gray-800">Product Categories</h2>
              <ul className="list-disc pl-5 mt-4 text-lg text-gray-700 font-sans space-y-2">
                <li>Women's Clothing</li>
                <li>Men's Fashion</li>
                <li>Accessories</li>
              </ul>
              <img src="/images/products/pic3.png" alt="Product categories" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>

            {/* Featured Products Page */}
            <div className="page bg-gradient-to-r from-yellow-50 to-orange-100 p-8">
              <h2 className="text-3xl font-serif font-semibold text-gray-800">Featured Products</h2>
              <p className="text-base mt-4 text-gray-700 font-sans">
                Discover our most popular and trending products.
              </p>
              <img src="/images/products/pic2.png" alt="Featured products" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>

            {/* Best Sellers Page */}
            <div className="page bg-gradient-to-bl from-red-50 to-pink-100 p-8">
              <h2 className="text-3xl font-serif font-semibold text-gray-800">Best Sellers</h2>
              <p className="text-base mt-4 text-gray-700 font-sans">Our top-selling products, loved by customers worldwide.</p>
              <img src="/images/products/pic1.png" alt="Best sellers" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>

            {/* Closing Page */}
            <div className="page flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-8">
              <h2 className="text-4xl font-serif font-bold text-gray-800">Thank You!</h2>
              <p className="text-center mt-4 text-gray-700 text-lg font-sans">We hope you enjoyed our catalogue. Visit our website for more!</p>
              <img src="/images/products/pic3.png" alt="Thank you page" className="mt-4 w-full min-w-full max-h-[300px] object-contain" />
            </div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;
