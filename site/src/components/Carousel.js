import React from "react";
import Image from 'next/image'
import { Carousel } from "react-responsive-carousel";
import styles from "@/styles/Carousel.module.css"

function genImages(paths) {
  let imageElement = []
  paths.forEach((path, i) => {
    imageElement.push(
      <div key={i}>
        <img
          alt=""
          src={path}
        />
      </div>
    );
  });
  return imageElement;
}

const CustomCarousel = (props) => (

  <div className={styles.wrapper}>
    <Carousel autoPlay>
      {genImages(props.paths)}
    </Carousel>
  </div>
);

export default CustomCarousel;
