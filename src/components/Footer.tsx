import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="copyright">© {year} created by White Coal Productions</p>
        <SocialIcons />
      </div>
    </footer>
  );
}
