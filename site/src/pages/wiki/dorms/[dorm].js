import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Error from "next/error";
import ReactStars from "react-stars";
import CustomCarousel from "../../../components/Carousel";
import Navbar from  "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar"
import styles from '@/styles/Home.module.css'

import wiki from '@/styles/Wiki.module.css';
import path from "path";

import { getWiki } from '@/pages/api/wiki';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Wiki( {info, images} ) {
  const router = useRouter();
  const API = "http://localhost:5050/postReview";
  const dorm = router.query.dorm;
  let data = info[0];
  let reviews = genReviews(data["review"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: event.target.title.value,
      user: event.target.user.value,
      date: event.target.date.value,
      rating: event.target.rating.value,
      text: event.target.text.value,
      ID: event.target.ID.value,
    };
    const response = await fetch(API, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 1 },
    });
    const res = await response.status;
    if (res === 200) {
      event.target.parentNode.parentNode.className =
        wiki.review_submitted + " " + wiki.success;
    } else {
      router.push("/500");
    }
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 750);
  };

  return (
    <>
      <Head>
        <title>{dorm}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Sidebar />
        <section className={wiki.content}>
          <CustomCarousel paths={images} />
          <div className={wiki.description}>
            <h3> Information </h3>
            <p>{info[0]["info"]["description"]}</p>
          </div>
          <span className={wiki.review_box}>
            <div className={`${wiki.review} ${wiki.review_form}`}>
              <div className={wiki.review_input}>
                <form onSubmit={handleSubmit} method="post">
                  <input
                    placeholder="Name"
                    type="text"
                    name="user"
                    autoComplete="off"
                    required
                  />
                  <br />
                  <input
                    placeholder="Title"
                    type="text"
                    name="title"
                    autoComplete="off"
                    required
                  />
                  <br />
                  <textarea
                    placeholder="Review"
                    type="text"
                    name="text"
                    required
                  />
                  <input
                    type="hidden"
                    name="date"
                    value={new Date().toISOString()}
                  />
                  <input
                    id="rating"
                    type="hidden"
                    name="rating"
                    min="0"
                    max="5"
                    required
                  />
                  <input type="hidden" name="ID" value={dorm} />
                  <br />
                  <input type="submit" id="submit" value="Submit" />
                </form>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={true}
                  starCount={5}
                  size={36}
                  color2={"#ffd700"}
                  onChange={changeRating}
                />
              </div>
            </div>
            <hr className={wiki.hr} />
            {reviews}
          </span>
        </section>
      </main>
    </>
  );
}

function changeRating(r) {
  let rating = document.getElementById("rating");
  rating.value = r;
}

function genReviews(reviews) {
  let rev_html = [];
  reviews.forEach((r, i) => {
    rev_html.push(
      <div key={i} className={wiki.review}>
        <div className={wiki.review_text}>
          <h2>{r["user"]}</h2>
          <h3 className={wiki.subtitle}>
            {new Date(r["date"]).toLocaleDateString()}
          </h3>
          <h3>short title missing</h3>
          <p>{r["text"]}</p>
        </div>
        <div className={wiki.review_rating}>
          <ReactStars
            edit={false}
            starCount={5}
            value={parseFloat(r["rating"])}
            size={36}
            color2={"#ffd700"}
          />
        </div>
      </div>
    );
  });
  return rev_html;
}

function cleanName(string) {
  let str = string.split("-");
  str.forEach((string, i) => {
    str[i] = string.charAt(0).toUpperCase() + string.slice(1);
    if (string === "mcmahon" || string == "mccarty") {
      str[i] = str[i].slice(0, 2) + str[i].charAt(2).toUpperCase() + str[i].slice(3);
    }
  });
  return str.join(" ");
}

export async function getStaticProps(context) {
  const pid = context.params.dorm;
  let info = await getWiki(pid);
    
  if (Object.keys(info).length === 0) {
    return { notFound: true };
  }

  const fs = require("fs");

  const dir = path.resolve("./public", pid);

  const filenames = fs.readdirSync(dir);

  let dormName = cleanName(pid).split(" ").join("-");
  const images = filenames.map((name) =>
    path.join("/", dormName, name)
  );
  
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      info,
      images,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      "/wiki/dorms/alder-hall",
      "/wiki/dorms/elm-hall",
      "/wiki/dorms/hansee-hall",
      "/wiki/dorms/lander-hall",
      "/wiki/dorms/madrona-hall",
      "/wiki/dorms/maple-hall",
      "/wiki/dorms/mccarty-hall",
      "/wiki/dorms/mccahon-hall",
      "/wiki/dorms/oak-hall",
      "/wiki/dorms/poplar-hall",
      "/wiki/dorms/terry-hall",
      "/wiki/dorms/willow-hall",
      "/wiki/dorms/mercer-court",
      "/wiki/dorms/stevens-court",
      "/wiki/dorms/cedar-apartments",
      "/wiki/dorms/commodore-duchess",
      "/wiki/dorms/nordheim-court",
      "/wiki/dorms/radford-court",
      "/wiki/dorms/blakeley-village",
      "/wiki/dorms/laurel-village",
    ],
    fallback: false,
  };
}





