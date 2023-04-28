import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Events() {
    return (
        <>
        <Head>
            <title>Dorm-Wiki</title>
            <meta name="description" content="Your go-to place for UW dorm info" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon-dorm-wiki.png" />
        </Head>
        <div className={styles.navbar}>
            <ul>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#Events">Events</a>
            </li>
            <li>
                <a href="#">Wiki</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Search</a>
            </li>
            </ul>
            <button type="button">Login</button>
        </div>
        </>
    );
}