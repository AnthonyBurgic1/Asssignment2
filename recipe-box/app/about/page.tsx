import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <h1>About My Recipe Box</h1>
      <p className="lead">
        I built a small Next.js app for collecting the meals you love and
        enjoying them with your friends and family.
      </p>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>What does my Recipe Box do?</h2>
        <ul>
          <li>Save your own recipes and edit or delete them at any time!</li>
          <li>
            Mark your favorite recipes and see them on the homepage so you
            always know where they are!
          </li>
          <li>
            Discover new recipes for free with the{" "}
            <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">
              <u>TheMealDB API</u>
            </a>{" "}
            and save them with one click.
          </li>
          <li>
            Pick a light or dark theme and set your name in{" "}
            <Link href="/settings"><u>Settings</u></Link>.
          </li>
        </ul>

        <h2>Built with</h2>
        <p className="muted">
          Next.js (App Router) · React hooks (useState, useEffect, useContext) · TypeScript · localStorage
        </p>
      </div>
    </>
  );
}