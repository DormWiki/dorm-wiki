import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

import styles from "@/styles/Home.module.css";
import events from '@/styles/Events.module.css';
import about from '@/styles/About.module.css'

export default function About() {

  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className={events.main}>
        <div className={about.content}>
          <div className={about.full_span}>
            <h2 className={about.title}>Our Mission</h2>
            <p className={about.p}>
              DormWiki is dedicated to empowering University of Washington students by 
              providing a user-friendly platform to discover and understand the diverse
              range of dormitories on campus. Our mission is to assist prospective, incoming,
              and current students in finding their ideal living space, tailored to their 
              unique preferences and requirements. We also strive to foster a strong sense of
              community by keeping students informed about dorm-specific events, facilitating
              their integration into the vibrant dorm environment. Through simplicity, transparency,
              and inclusivity, DormWiki aims to enhance the overall student experience
              and contribute to a thriving campus community at the University of Washington.
            </p>
          </div>
          <div className={about.full_span}>
            <h2 className={about.title}>Meet The Team</h2>
            <div className={about.list_wrapper}>
              <ul> Jaylyn Zhang </ul>
              <ul> Lydia Li </ul> 
              <ul> Yijia Zhao </ul>
              <ul> Niko Permilovsky </ul>
              <ul> Mia Yamada-Heidner </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
