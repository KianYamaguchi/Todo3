import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
  return (
    <div>
        <Head>
            <title>最初の投稿</title>
        </Head>
      <h1>最初の投稿</h1>
      <h2><Link href="/">ホームへ戻る</Link></h2>
    </div>
  );
}