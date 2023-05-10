import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import login from '@/styles/Login.module.css';
import { redirect } from 'next/navigation';
import GoogleButton from '../components/GoogleButton';

export default function Login() {

  const router = useRouter();

  return (
    <>
      <div className={styles.logo}>
        <div className={styles.navbar_logo_wrapper}>
            <img src="/dw-logo-navbar.png"></img>
        </div>
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link a href="/">Home</Link>
                </li>
                <li>
                    <Link href="/events">Events</Link>
                </li>
                <li>
                    <div className={styles.dropdown}>
                        <Link href="/wiki">Wiki</Link>
                        <div className={styles.dropdown_text}>
                            <Link href="/wiki/residence-halls">Residence halls</Link>
                            <Link href="/wiki/academic-apts">
                                Academic-year apartments
                            </Link>
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
                <button type="button" onClick={() => router.push('/login')}>Login</button>
            </ul>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={login.hrtitle}>
             Welcome!
          </h2>
          <div className={login.button_wrapper}>
            <GoogleButton/>
          </div>
        </div>
      </main>
    </>
  );
}
