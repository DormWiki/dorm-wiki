import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";

import styles from "@/styles/Home.module.css";
import wiki from "@/styles/Wiki.module.css";

export default function Wiki() {
  return (
    <>
      <div className={styles.navbar_logo_wrapper}>
        <img src="/dw-logo-navbar.png"></img>
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <Link a href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <div className={styles.dropdown}>
              <Link href="/wiki">Wiki</Link>
              <div className={styles.dropdown_text}>
                <Link href="/wiki/residence-halls">Residence halls</Link>
                <Link href="/wiki/academic-apts">Academic-year apartments</Link>
                <Link href="/wiki/year-apts">Full-year apartments</Link>
                <Link href="/wiki/family-apts">Family apartments</Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          <button type="button" onClick={() => router.push("/login")}>Login</button>
        </ul>
      </div>
      <section className={styles.content}>
        <div className={wiki.wiki_grid}>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/alder-hall">Alder Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/elm-hall">Elm Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/hansee-hall">Hansee Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/lander-hall">Lander Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/madrona-hall">Madrona Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/maple-hall">Maple Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/mccarty-hall">McCarty Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/mccahon-hall">McCahon Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/oak-hall">Oak Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/poplar-hall">Poplar Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/terry-hall">Terry Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/willow-hall">Willow Hall</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/mercer-court">Mercer Court</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/stevens-court">Stevens Court</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/cedar-apartments">Cedar Apartments</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/commodore-duchess">Commodore Duchess</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/nordheim-court">Nordheim Court</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/radford-court">Radford Court</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/blakeley-village">Blakeley Village</Link></div>
          <div className={wiki.wiki_square}><Link href="/wiki/dorms/laurel-village">Laural Village</Link></div>
        </div>
      </section>
    </>
  );
}
