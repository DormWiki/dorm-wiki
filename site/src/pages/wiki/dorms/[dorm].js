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
import Footer from "@/components/Footer";
import path from "path";
import ReviewBar from "@/components/ReviewBar";
import { getWiki } from '@/pages/api/wiki';
import { getSession } from "next-auth/react";
import styles from '@/styles/Home.module.css'
import wiki from '@/styles/Wiki.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { redirect } from "next/navigation";

export default function Wiki( {info, images} ) {
  const router = useRouter();
  const dorm = router.query.dorm;
  let data = info[0];
  let reviews = genReviews(data["review"]);
  let avg = getAverage(data["review"]);

  // all of this because I am too lazy to make my own star ratings or just encapsulate it in its own component
  let types = ["enviornment", "food", "walkability", "safety"];
  let ratings = { 'enviornment' : 0, 'food' : 0, 'walkability' : 0, 'safety' : 0};
  const changeRating = (r, i) => {
    ratings[types[i]] = r;
  };

  const changeChars = (event) => {
    let count = event.target.value.length;
    let max = document.getElementById("max_chars");
    max.innerText = `${count}/300`;
  } //

  const handleSubmit = async (event) => {
    event.preventDefault();
    const session = await getSession();
    if (session === null) {
      router.push("/login?required=true", "/login");
      return;
    }
    const data = {
      title: event.target.title.value,
      user: event.target.user.value,
      date: event.target.name.value,
      rating: ratings,
      text: event.target.text.value,
      ID: event.target.ID.value,
    };

    const response = await fetch("/api/review", {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-Type": "application/json",
     },
     next: { revalidate: 1 },
    });
    const res = await response.status;
    if (res === 200) {
      router.reload(window.location.pathname);
    } else {
     router.push("/500");
    }
  };

  return (
    <>
      <Head>
        <title>{cleanName(dorm)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.svg" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Sidebar selected={dorm} />
        <section className={wiki.content}>
          <div className={wiki.top_wrapper}>
            <div className={wiki.carousel_wrapper}>
              <CustomCarousel paths={images} />
            </div>
            <div className={wiki.summary}>
              <div className={wiki.description}>
                <h3>Information</h3>
                <p>{data["info"]["description"]}</p>
                <hr/>
                <div className={wiki.average}>
                  <h3>Summary</h3>
                  {avg}
                </div>
              </div>
            </div>
          </div>
          <span className={wiki.review_box}>
            <h2>Submit a Review</h2>
            <div className={`${wiki.review} ${wiki.review_form}`}>
              <div className={wiki.review_input}>
                <form onSubmit={handleSubmit} method="post">
                  <input
                    placeholder="Title"
                    type="text"
                    name="title"
                    autoComplete="off"
                    required
                  />
                  <br />
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    required
                  />
                  <br />
                  <textarea
                    placeholder="Review"
                    type="text"
                    name="text"
                    maxLength="300"
                    onChange={changeChars}
                    required
                  />
                  <br />
                  <p id="max_chars" className={wiki.char_count}>
                    0/300
                  </p>
                  <input
                    type="hidden"
                    name="date"
                    value={new Date().toISOString()}
                  />
                  <input type="hidden" name="ID" value={dorm} />
                  <br />
                  <input type="submit" id="submit" value="Submit" />
                </form>
              </div>
              <div className={wiki.review_rating}>
                <label>Environment: </label>
                <ReactStars
                  edit={true}
                  starCount={5}
                  size={36}
                  color2={"#ffd700"}
                  onChange={(r) => {
                    changeRating(r, 0);
                  }}
                />
                <label>Food: </label>
                <ReactStars
                  edit={true}
                  starCount={5}
                  size={36}
                  color2={"#ffd700"}
                  onChange={(r) => {
                    changeRating(r, 1);
                  }}
                />
                <label>Walkability: </label>
                <ReactStars
                  edit={true}
                  starCount={5}
                  size={36}
                  color2={"#ffd700"}
                  onChange={(r) => {
                    changeRating(r, 2);
                  }}
                />
                <label>Safety: </label>
                <ReactStars
                  edit={true}
                  starCount={5}
                  size={36}
                  color2={"#ffd700"}
                  onChange={(r) => {
                    changeRating(r, 3);
                  }}
                />
              </div>
            </div>
            <hr className={wiki.hr} />
            {reviews}
          </span>
        </section>
      </main>
      <Footer/>
    </>
  );
}


function getAverage(reviews) {
  let avg = {
    Overall: 0,
    Environment: 0,
    Food: 0,
    Walkability: 0,
    Safety: 0
  }
  reviews.forEach((r) => {
    avg.Overall += averageReview(r["rating"]);
    avg.Environment += r["rating"].enviornment;
    avg.Food += r["rating"].food;
    avg.Walkability += r["rating"].walkability;
    avg.Safety += r["rating"].safety;
  })
  if (reviews.length !== 0) {
    avg.Overall = avg.Overall / reviews.length;
    avg.Environment = avg.Environment / reviews.length;
    avg.Food = avg.Food / reviews.length;
    avg.Walkability = avg.Walkability / reviews.length;
    avg.Safety = avg.Safety / reviews.length;
  }
  return <ReviewBar data={avg}/>
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
          <h3>{r["title"]}</h3>
          <div className={wiki.review_p}>
            {r["text"]}
          </div>
        </div>
        <div className={wiki.review_rating}>
          <ReactStars
            edit={false}
            starCount={5}
            value={averageReview((r["rating"]))}
            size={36}
            color2={"#ffd700"}
          />
          <div>
            <ReviewBar data={r["rating"]}/>
          </div>
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

function averageReview(data) {
  let avg = 0;
  for (const k in data) {
    avg += data[k];
  }
  return avg / Object.entries(data).length;
}

export async function getStaticProps(context) {
  const pid = context.params.dorm;
  let info = await getWiki(pid);
  if (Object.keys(info).length === 0) {
    return { notFound: true };
  }
  const fs = require("fs");
  let dormName = cleanName(pid).split(" ").join("-");

  const dir = path.resolve(path.join(process.cwd(), "public", dormName));

  const filenames = fs.readdirSync(dir);


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
      "/wiki/dorms/mcmahon-hall",
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





