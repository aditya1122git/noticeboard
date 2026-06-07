import Head from "next/head";
import Header from "@/components/Header";
import NoticeForm from "@/components/NoticeForm";

export default function CreateNotice() {
  return (
    <>
      <Head>
        <title>Create Notice — NoticeBoard</title>
        <meta
          name="description"
          content="Create a new notice on the NoticeBoard. Add announcements for exams, events, and general updates."
        />
      </Head>

      <Header />

      <main
        className="container-main"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        <NoticeForm />
      </main>
    </>
  );
}
