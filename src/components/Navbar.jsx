import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["About", "Operations", "Attachment", "Contact"];

const NavBar = () => {
  // States
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [showModal, setShowModal] = useState(true); // Controls modal visibility

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Manage audio playback
  useEffect(() => {
    const audio = audioElementRef.current;

    if (isAudioPlaying) {
      audio.muted = false; // Ensure audio is unmuted
      audio.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Handle modal actions
  const handleAudioChoice = (playAudio) => {
    setIsAudioPlaying(playAudio);
    setIsIndicatorActive(playAudio);
    setShowModal(false); // Hide modal after selection
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">
              Enable Background Audio?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Would you like to enable audio playback while browsing the site?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAudioChoice(true)}
                className="px-4 py-2 bg-customBlue text-white rounded hover:bg-violet-400"
              >
                Yes, Enable
              </button>
              <button
                onClick={() => handleAudioChoice(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-black hover:text-white"
              >
                No, Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4 sm:p-6 md:p-8">
            {/* Logo and Product button */}
            <div className="flex items-center gap-7">
              <img
                src="/img/logo.jpg"
                alt="logo"
                className="w-10 rounded-full"
              />
              <Button
                id="product-button"
                title="Products"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            {/* Navigation Links and Audio Button */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Audio Button */}
              <button
                onClick={() => setIsAudioPlaying((prev) => !prev)}
                className="ml-16 flex items-center space-x-0.5 "
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                  muted
                  autoPlay
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;
