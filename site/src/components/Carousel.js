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
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}1.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}2.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}3.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}4.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}5.jpg`}
        />
      </div>
    </Carousel>
  </div>
);

export default CustomCarousel;
