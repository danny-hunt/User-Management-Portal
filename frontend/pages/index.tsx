import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Sidebar />
        <h1 className={styles.title}>
          <Link href='/users'>
            <a>Go to Users page</a>
          </Link>
        </h1>
      </main>
    </div>
  );
};

export default Home;
