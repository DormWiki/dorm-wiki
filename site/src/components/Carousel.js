import React from "react";
import Image from 'next/image'
import { Carousel } from "react-responsive-carousel";
import styles from "@/styles/Carousel.module.css"


const CustomCarousel = (props) => (
  <div className={styles.wrapper}>
    <Carousel autoPlay>
      <div>
        <img
          alt=""
          src={`http://localhost:3000/maple-hall/${props.dorm}1.jpg`}
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img
          alt=""
          src={`http://localhost:3000/maple-hall/${props.dorm}2.jpg`}
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img
          alt=""
          src={`http://localhost:3000/maple-hall/${props.dorm}3.jpg`}
        />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img
          alt=""
          src={`http://localhost:3000/maple-hall/${props.dorm}4.jpg`}
        />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img alt="" src={`http://localhost:3000/maple-hall/${props.dorm}5.jpg`}/>
        <p className="legend">Legend 5</p>
      </div>
    </Carousel>
  </div>
);

export default CustomCarousel;
