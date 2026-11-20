import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="page-bg" style={{ backgroundColor: "#000" }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/a2454b1bd96c4ed2ba5b7414d61bd10e.webp" alt="" />
      </div>
      <main id="main" className="page not-found">
        <div className="nf-box">
          <h1>404</h1>
          <p>This page doesn&apos;t exist. · Questa pagina non esiste. · Esta página no existe.</p>
          <Link href="/">HOME</Link>
        </div>
      </main>
    </>
  );
}
