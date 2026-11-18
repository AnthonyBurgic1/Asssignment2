import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <h1>About My Recipe Box</h1>
      <p className="lead">I built a small Next.js app for collecting meals 
        that you love and that you can enjoy with your friends and family.</p>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>What does my Recipe Box Do? </h2>
        <ul>
          <li>My Recipe box let's you save your own recipes and edit or delete them at any time !</li>
          <li>We also let you mark your favorites recipes and allow to display them on the homepage, so that you always know were they are !</li>
          <li>
            Discover new meals recipes for free here <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer"><u>TheMealDB API</u></a> and save them with one click.
          </li>
          <li>Pick a light or dark theme and set your name in <Link href="/settings"><u>Settings</u></Link>.</li>
        </ul>

        <h2>Built with</h2>
        <p className="muted">
          Next.js (App Router) · React hooks (useState, useEffect, useContext) · TypeScript · localStorage
        </p>
      </div>
    </>
  );
}
