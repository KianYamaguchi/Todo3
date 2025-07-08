import Head from "next/head";
import styles from "./layout.module.css";

const midasi = "Todoアプリ for Next.js";
export const siteTitle = "Todoアプリ for Next.js";


function Layout({ children }) {
    return <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />

        </Head>
        <header>
            <h1>{midasi}</h1>
            <p>Welcome to the {midasi}!</p>
        </header>
        <main>{children}</main>
    </div>;
}
export default Layout;