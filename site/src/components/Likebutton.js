import styles from '@/styles/Likebutton.module.css';
import React, { useState } from "react";
import confetti from "canvas-confetti";

const Likebutton = ( {id, onClick} ) => {
  const [isSelected, setSelected] = useState(false);

  const toggleSelect = async (event) => {
    setSelected(!isSelected);
    if (!isSelected) {
      let canvas = event.target.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 30,
        ticks: 50,
        origin: {
          x: canvas.left / window.innerWidth,
          y: canvas.top / window.innerHeight,
        },
      });
    let response = await fetch(`/api/event?id=${id}`, {method: 'POST'})
    .then(res => res.json());
    console.log(id + ": " +response);
    } else {
      let response = await fetch(`/api/event?id=${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      console.log(id + ": " + response);
    }
  };

  return (
    <>
      <button
        onClick={(e)=> {
          onClick(e);
          toggleSelect(e);
        }}
        className={
          isSelected
            ? `${styles.event_button} ${styles.like} ${styles.clicked}`
            : `${styles.event_button} ${styles.like}`
        }
      ></button>
    </>
  );
  
}

export default Likebutton;