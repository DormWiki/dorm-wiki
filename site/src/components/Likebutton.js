import styles from '@/styles/Likebutton.module.css';
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Likebutton = ( {selected, id, onClick} ) => {
  const [isSelected, setSelected] = useState(selected);
  const { status } = useSession();
  let router = useRouter();
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
    } else {
      let response = await fetch(`/api/event?id=${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    }
  };
  return (
    <>
      <button
        onClick={(e)=> {
          if (status === "authenticated") {
            onClick(e);
            toggleSelect(e);
          } else {
            router.push("/login");
          }
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