import {
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaPortrait,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/nikoloz-tsutskiridze-990790299/",
    icon: <FaLinkedin />,
  },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://myportfolio-geo.vercel.app/", icon: <FaPortrait /> },
  { href: "https://github.com/Nikoloz-tsutskiridze", icon: <FaGithub /> },
];

function Footer() {
  return (
    <footer className="w-screen bg-customBlue py-11 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Copyright
          <br /> Nov/11/2024
        </p>

        <div className="flex justify-center gap-8 md:justify-start ">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}

export default Footer;
