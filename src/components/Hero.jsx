// import { Link } from "react-router-dom";

// import hero1 from "../assets/hero1.webp";
// import hero2 from "../assets/hero2.webp";
// import hero3 from "../assets/hero3.webp";
// import hero4 from "../assets/hero4.webp";

// const carouselImages = [hero1, hero2, hero3, hero4];

// const Hero = () => {
//   return (
//     <div className="grid lg:grid-cols-2 gap-24 items-center">
//       <div>
//         <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
//           We are changing the way people shop
//         </h1>
//         <p className="mt-8 max-w-xl text-lg leading-8">
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
//           repellat explicabo enim soluta temporibus asperiores aut obcaecati
//           perferendis porro nobis.
//         </p>
//         <div className="mt-10">
//           <Link to="/products" className="btn btn-primary">
//             Our Products
//           </Link>
//         </div>
//       </div>
//       <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
//         {carouselImages.map((image) => {
//           return (
//             <div key={image} className="carousel-item">
//               <img
//                 src={image}
//                 className="rounded-box h-full w-80 object-cover"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default Hero;

import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState hook

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0); // State to track the current image

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? carouselImages.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
      </div>
      <div className="h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box relative overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={image}
            className={`carousel-item absolute ${
              currentImage === index ? "block" : "hidden"
            }`}
          >
            <img src={image} className="rounded-box h-full w-80 object-cover" />
          </div>
        ))}
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-4 text-xl text-white font-bold"
          onClick={prevImage}
        >
          &#8249;
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 text-xl text-white font-bold"
          onClick={nextImage}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Hero;
