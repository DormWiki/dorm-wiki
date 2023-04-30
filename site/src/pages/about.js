import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";
export default function About() {
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
      <section className={styles.content}>about</section>
    </>
  );
}
