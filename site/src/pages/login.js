import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import login from '@/styles/Login.module.css';
import { redirect } from 'next/navigation';
import Navbar from "../components/Navbar";
import GoogleButton from '../components/GoogleButton';

export default function Login() {

  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={login.hrtitle}>Welcome!</h2>
          <div className={login.button_wrapper}>
            <GoogleButton />
          </div>
        </div>
      </main>
    </>
  );
}
