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
        <p className="legend">Outside view</p>
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}2.jpg`}
        />
        <p className="legend">Courtyard</p>
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}3.jpg`}
        />
        <p className="legend">Kitchen</p>
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}4.jpg`}
        />
        <p className="legend">Room example</p>
      </div>
      <div>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/DormWiki/dorm-wiki/main/site/public/${props.dorm}/${props.dorm}5.jpg`}
        />
        <p className="legend">Shared space</p>
      </div>
    </Carousel>
  </div>
);

export default CustomCarousel;
