import { useState, useEffect } from "react";
import '../../styles/Slider.css';

const slides = [
  { image: "/img/Aren.jpg" },
  { image: "/img/Davit.jpg" },
  { image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        <img
          src={slides[index].image}
          alt="slide"
        />
        <div className="slid-cont" />
        <div className="slid-content">
          <h1 >
            Welcome to Our College
          </h1>
          <p >
            Modern education. Real skills. Strong future.
          </p>
          <button >
            Explore Programs
          </button>
        </div>
        <div className="slid-buttons">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`dot ${i === index ? "dot-active" : "dot-inactive"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}