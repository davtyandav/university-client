import { useEffect, useState } from "react";
import '../../styles/Slider.css';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
        title: "Welcome to Our University",
        description: "Modern education. Real skills. Strong future."
    },
    {
        // Студенты в современных аудиториях / работа за ноутбуками
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
        title: "Innovations & Academic Excellence",
        description: "Discover new opportunities in world-class laboratories."
    },
    {
        // Студенческий кампус / общение на территории вуза
        image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1600&auto=format&fit=crop",
        title: "Your Pathway to Success",
        description: "Join a community of professional leaders and experts."
    },
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
                <div className="slid-cont"/>
                <div className="slid-content">
                    <h1>
                        {slides[index].title}
                    </h1>
                    <p>
                        {slides[index].description}
                    </p>
                    <button>
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