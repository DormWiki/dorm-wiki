import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getWiki } from "./api/wiki";
import { cleanName } from "@/misc";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import wiki from "@/styles/Wiki.module.css";
import Navbar from "../components/Navbar";


const SORTS = {
  residence: [
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
  academic: ["mercer-court", "stevens-court"],
  year: [
    "cedar-apartments",
    "commodore-duchess",
    "nordheim-court",
    "radford-court",
  ],
  family: [
    "blakeley-village",
    "commodore-duchess",
    "laurel-village",
    "radford-court",
    "stevens-court",
  ],
};
export default function Wiki({ info }) {
  const router = useRouter();
  const sort = router.query.dorm;
  let dormCards = genDorms(info, sort);
  return (
    <>
      <Head>
        <title>Dorm Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.svg"/>
      </Head>
      <Layout>
        <div className={wiki.wiki_grid}>{dormCards}</div>
      </Layout>
    </>
  );
}

function genDorms(info, sort) {
  let arr = [];
    info.forEach( (dorm, i) => {
      if(sort === undefined || SORTS[sort].indexOf(dorm["_id"]) != -1) {
        let name = cleanName(dorm["_id"]).split(" ").join("-");
        arr.push(
          <>
            <div
              key={i}
              className={wiki.wiki_square}
            >
              <Link href={`/wiki/dorms/${dorm["_id"]}`}>
                <img fill={true} alt={`front picture of ${cleanName(dorm["_id"])}`} src={`/${name}/${name}-1.jpg`}/>
                {cleanName(dorm["_id"])}
              </Link>
            </div>
          </>
        );
      }
    });
  return arr;
}

export async function getServerSideProps() {
  const info = await getWiki();
  return {
    props: {
      info,
    },
  };
}
