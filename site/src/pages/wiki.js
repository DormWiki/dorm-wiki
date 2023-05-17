import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import wiki from "@/styles/Wiki.module.css";
import Navbar from "../components/Navbar";
const SORTS = {
  "residence": [
    "alder-hall",
    "elm-hall",
    "hansee-hall",
    "lander-hall",
    "madrona-hall",
    "maple-hall",
    "mccarty-hall",
    "mcmahon-hall",
    "oak-hall",
    "poplar-hall",
    "terry-hall",
    "willow-hall",
  ],
  "academic": [
    "mercer-court", "stevens-court"
  ],
  "year": [
    "cedar-apartments",
    "commodore-duchess",
    "nordheim-court",
    "radford-court",
  ],
  "family": [
    "blakeley-village",
    "commodore-duchess",
    "laurel-village",
    "radford-court",
    "stevens-court",
  ]
}
export default function Wiki({ info }) {
  const router = useRouter();
  const sort = router.query.dorm;
  let dormCards = genDorms(info, sort);
  return (
    <>
      <div className={styles.navbar_logo_wrapper}>
        <img src="/dw-logo-navbar.png"></img>
      </div>
      <Navbar />
      <section className={styles.content}>
        <div className={wiki.wiki_grid}>
          {dormCards}
        </div>
      </section>
    </>
  );
}

function genDorms(info, sort) {
  let arr = [];
    info.forEach( (dorm, i) => {
      if(sort === undefined || SORTS[sort].indexOf(dorm["_id"]) != -1) {
        arr.push(
          <>
            <div
              key={i}
              className={wiki.wiki_square}
            >
              <Link href={`/wiki/dorms/${dorm["_id"]}`}>
                <img src={`http://localhost:3000/${dorm["_id"]}/${dorm["_id"]}-1.jpg`}/>
                {cleanName(dorm["_id"])}
              </Link>
            </div>
          </>
        );
      }
    });
  return arr;
}

function sortCards(sort) {
  let items = document.querySelectorAll("section div div");
  items.forEach((item) => {
    let name = item.firstChild.innerText.split("-").join(" ").toLowerCase();
    console.log(name);
    if(SORTS[sort].indexOf(name) === -1) {
      item.classList.add(wiki.hidden);
    }
  })
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/wiki");
  if (!res.ok) {
    throw new Error(res.text());
  }
  const info = await res.json();
  return {
    props: {
      info,
    }, 
  };
}

function cleanName(string) {
  let str = string.split("-");
  str.forEach((string, i) => {
    str[i] = string.charAt(0).toUpperCase() + string.slice(1);
  });
  return str.join(" ");
}