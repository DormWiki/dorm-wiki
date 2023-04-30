import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";

export default function Wiki() {
  return (
    <>
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
            <Link href="/wiki">Wiki</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
        </ul>
        <button type="button">Login</button>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.logoside}>
          <img src="/dw-logo-side.png" style={{ width: 125 }}></img>
        </div>
        <ul>
          <li>
            <Link href="#">Link</Link>
          </li>
          <li>
            <Link href="#">Link</Link>
          </li>
        </ul>
      </div>
      <section className={styles.content}>
        <ul>
          <li>
            <Link href="/wiki/dorms/alder-hall">Alder Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/elm-hall">Elm Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/hansee-hall">Hansee Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/lander-hall">Lander Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/madrona-hall">Madrona Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/maple-hall">
              &#8594;Maple Hall &#8592; ONLY ONE THAT WORKS
            </Link>
          </li>
          <li>
            <Link href="/wiki/dorms/mccarty-hall">McCarty Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/mccahon-hall">McCahon Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/oak-hall">Oak Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/poplar-hall">Poplar Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/terry-hall">Terry Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/willow-hall">Willow Hall</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/mercer-court">Mercer Court</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/stevens-court">Stevens Court</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/cedar-apartments">Cedar Apartments</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/commodore-duchess">Commodore Duchess</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/nordheim-court">Nordheim Court</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/radford-court">Radford Court</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/blakeley-village">Blakeley Village</Link>
          </li>
          <li>
            <Link href="/wiki/dorms/laurel-village">Laural Village</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
