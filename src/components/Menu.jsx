"use client";

import React, {useRef, useState} from 'react';
import {sliderLists} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function Menu() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCocktailsLength = sliderLists.length;
    const contentRef = useRef();
    const getCocktailAt = (indexOffset) => {
        return sliderLists[((indexOffset + currentIndex + totalCocktailsLength) % totalCocktailsLength)];
    }
    const currentCocktail = getCocktailAt(0);
    const prevCoctail = getCocktailAt(-1);
    const nextCoctail = getCocktailAt(1);
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktailsLength) % totalCocktailsLength;
        setCurrentIndex(newIndex);
    }

    useGSAP(() => {
        gsap.fromTo("#title", {opacity: 0}, {opacity: 1, duration: 1});
        gsap.fromTo(".cocktail img", {
            opacity: 0,
            xPercent: -100
        }, {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        });

        gsap.fromTo(".details h2", {
            opacity: 0,
            yPercent: 100
        }, {
            yPercent: 0,
            opacity: 100,
            ease: "power1.inOut"
        });
        gsap.fromTo(".details p", {
            opacity: 0,
            yPercent: 100
        }, {
            yPercent: 0,
            opacity: 100,
            ease: "power1.inOut"
        });
    }, [currentIndex]);
    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf"/>
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf"/>

            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.id} className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`} onClick={() => goToSlide(index)}>
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevCoctail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true"/>
                    </button>

                    <button className="flex flex-col items-end justify-center gap-2 text-right" onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCoctail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true"/>
                    </button>
                </div>

                <div className="cocktail">
                    <img src={currentCocktail.image} alt="current-cocktail" className="object-contain" />
                </div>
                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>
                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Menu;