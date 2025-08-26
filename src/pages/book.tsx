import type { NextPage } from "next";
import Head from "next/head";
import NavbarBook from "../components/navbar-book/navbar-book";
import BookBanner from "./sections/book-banner";

const BookPage: NextPage = () => {
  return (
    <div id="book-page">
      <Head>
        <title>Meghan Rabbitt&apos;s Book - writer, editor, journalist, content strategist</title>
        <meta name="description" content="Writer, Editor, Journalist, Content Strategist - Meghan Rabbitt" />
        <link rel="icon" href="/mr-initials-white.gif" />
      </Head>

      <main className={`pb-0 flex flex-col w-full`}>
        <NavbarBook />
        <BookBanner />
      </main>
    </div>
  );
};

export default BookPage;