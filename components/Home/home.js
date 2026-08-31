'use client';
import ProductCard from "@components/productCard/productCard";
import "./home.css"
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux"
import Link from "next/link"
import AllProductPage from "@/app/AllProducts/page";

export default function Home() {
    const products = useSelector((state) => state.products.items);
    const[startIndex, setStartIndex] = useState(0);
    const [fade, setFade] = useState(true);
    useEffect(()=>{
      const interval = setInterval(()=>{
        setFade(false);

        setTimeout(()=>{
          setStartIndex((prev) =>{
            const next = prev + 4;
            return next >= products.length ? 0 : next;
          })
          setFade(true);
        }, 400)
      }, 4000)
      return () => clearInterval(interval);
    } ,[products.length]);
    const visibleProducts = products.slice(startIndex, startIndex + 4);
    



const lowerSectionRef = useRef(null);

  useEffect(() => {
    const elements =
      lowerSectionRef.current?.querySelectorAll(".scroll-reveal");

    if (!elements || elements.length === 0) return;

    const revealImmediately = window.innerWidth <= 768;

    if (revealImmediately) {
      elements.forEach((element) => element.classList.add("reveal-active"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);




    return (<>
        <div className="hero-main-cont">

            <div className="hero-disc-cont">
                <h2 className="hero-title">Discover <br />
                    Comfort and Style for <br />
                    Every Occasion</h2>
                <p className="hero-disc">Discover the perfect balance of comfort, durability, and style for every <br />
                    Occasion with our versatile, high-quality footware collection</p>
                {/* <button>Explore</button> */}
                {/* <!-- From Uiverse.io by rubyreapergaming -->  */}
                <Link href="/AllProducts">
                <button type="button" className="btn">
                    <strong>EXPLORE</strong>
                    <div className="container-stars">
                        <div className="stars"></div>
                    </div>

                    <div className="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </button>
                </Link>
            </div>
            <div className="hero-img-cont">
                <h1 className="running-text">
                    RUNNING <br /> SNEAKERS
                </h1>
                <img
                    src="/assets/shoe.png"
                    alt="Hero Shoe"
                    className="hero-shoe"
                />
            </div>
        </div>

        {/* ---------------------------------- */}


        <section className="about-section">
            <div className="about-content">
                <div className="about-left">
                    <h2>We are Bold.</h2>

                    <p>
                        Bold design, pushing boundaries, shoes that stand out.
                        Each pair combines innovation, comfort, and style,
                        designed to make a bold statement and elevate every
                        occasion effortlessly.
                    </p>
                </div>

                <div className="about-right">
                    <h1 className="sneakers-text">SNEAKERS</h1>

                    <div className="about-bottom">
                        <div className="stats">
                            <div className="stat-box">
                                <h3>120+</h3>
                                <span>Happy Customer</span>
                            </div>

                            <div className="stat-box">
                                <h3>4.9/5</h3>
                                <span>Customer Rating</span>
                            </div>
                        </div>
                        <Link href="/AllProducts">
                        <button type="button" className="btn">
                            <strong>Show more</strong>
                            <div className="container-stars">
                                <div className="stars"></div>
                            </div>
            
                            <div className="glow">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <div id="S-ProductCard">
         {visibleProducts.map((product)=>(
            <ProductCard
               key={product.id}
               product={product}
               showDescription={false}
               cartBtn={false}
            />
         ))} 
        </div>
        {/* <Link href="/AllProducts" className="show-more-link">
       <div id="home">
    <hr className="home-line" />

    <button type="button" className="btn">
        <strong>Explore All</strong>

        <div className="container-stars">
            <div className="stars"></div>
        </div>

        <div className="glow">
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    </button>

    <hr className="home-line" />
</div>
</Link> */}



{/* ------------------------------------ */}

      <section className="lower-home-section" ref={lowerSectionRef}>
        <div className="lower-intro scroll-reveal reveal-up">
          <span className="lower-small-title">
            Discover Our Exquisite Signature Selections
          </span>

          <h2>
            We are Driven. We collaborate with ambitious clients to
            create products that inspire action.
          </h2>

          <p>
            Driven work requires a focused mindset and a passion for
            excellence that goes beyond the ordinary.
          </p>
        </div>

        <div className="lower-image-grid">
          <article className="lower-image-card scroll-reveal reveal-left">
            <Image
              src="/assets/display2.jpg"
              alt="Dropset sports shoes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="lower-card-image"
            />

            <div className="lower-image-overlay"></div>

            <div className="lower-image-content">
              <h3>DROPSHIFT 3</h3>

              <p>
                A perfect blend of performance, durability and style
                for every athlete and adventurer.
              </p>

              <Link href="/AllProducts" className="lower-image-link">
                Explore collection <span>↗</span>
              </Link>
            </div>
          </article>

          <article className="lower-image-card scroll-reveal reveal-right">
            <Image
              src="/assets/display3.webp"
              alt="Adizero sports shoes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="lower-card-image"
            />

            <div className="lower-image-overlay"></div>

            <div className="lower-image-content">
              <h3>ADIZERO EVO SL</h3>

              <p>
                Lightweight performance shoes designed for speed,
                comfort and everyday movement.
              </p>

              <Link href="/all-products" className="lower-image-link">
                Explore footwear <span>↗</span>
              </Link>
            </div>
          </article>
        </div>

        <div className="lower-info-grid">
          <div className="lower-features">
            <article className="lower-feature scroll-reveal reveal-up">
              <div className="lower-feature-icon">✦</div>

              <div>
                <h3>Unmatched Comfort and Durability</h3>

                <p>
                  Premium materials and expert craftsmanship provide
                  long-lasting comfort with every step.
                </p>
              </div>
            </article>

            <article className="lower-feature scroll-reveal reveal-up">
              <div className="lower-feature-icon">▣</div>

              <div>
                <h3>Stylish Design, Superior Performance</h3>

                <p>
                  Modern styling combines with dependable performance
                  for daily wear and active movement.
                </p>
              </div>
            </article>
          </div>

          <div className="lower-copyright scroll-reveal reveal-right">
            <span className="lower-big-symbol">©</span>

            <h2>
              © 2026
              <br />
              ShoeStore Inc.
              <br />
              All rights reserved.
            </h2>

            <Link href="/all-products" className="lower-explore-btn">
              Explore <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>)
}