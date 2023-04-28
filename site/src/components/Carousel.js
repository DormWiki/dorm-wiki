import React from "react";
import Image from 'next/image'
import { Carousel } from "react-responsive-carousel";
import styles from "@/styles/Carousel.module.css"


const CustomCarousel = () => (
  <div className={styles.wrapper}>
    <Carousel autoPlay>
      <div>
        <img alt="" src="http://localhost:3000/maple-hall/maple-hall1.jpg"  />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img
          alt=""
          src="http://localhost:3000/maple-hall/maple-hall2.jpg"
          width="300px"
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img
          alt=""
          src="http://localhost:3000/maple-hall/maple-hall3.jpg"
          width="300px"
        />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img alt="" src="http://localhost:3000/maple-hall/maple-hall4.jpg" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img alt="" src="http://localhost:3000/maple-hall/maple-hall5.jpg" />
        <p className="legend">Legend 5</p>
      </div>
    </Carousel>
  </div>
);

export default CustomCarousel;
