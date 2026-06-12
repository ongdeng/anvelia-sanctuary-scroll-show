import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  detoxPrograms,
  heroImages,
  placeSlides,
  ritualMoments
} from "./data/anveliaScenes.js";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "cabins", label: "Cabins", href: "#cabins" },
  { id: "pavilion", label: "Pavilion", href: "#pavilion" },
  { id: "farm", label: "Farm", href: "#farm" },
  { id: "activities", label: "Activities", href: "#activities" },
  { id: "detox", label: "Detox", href: "#detox" },
  { id: "inquiry", label: "Visit", href: "#inquiry" }
];

const ABOUT_RHYTHM_POINTS = [
  {
    title: "Longevity living",
    body: "Daily pace, rest, food, and movement arranged as one quiet village rhythm."
  },
  {
    title: "Natural healing",
    body: "Forest air, bodywork, mindful retreat, and gentle recovery rituals."
  },
  {
    title: "Detox wellness",
    body: "Simple reset programs supported by clean meals and calm guidance."
  },
  {
    title: "Slow travel",
    body: "Stay longer, move softer, and let the mountain landscape settle in."
  },
  {
    title: "Mindful growth",
    body: "Reflection, meditation, and connection without pressure or performance."
  }
];

function useScopedGsap(callback, { scope, dependencies = [] } = {}) {
  useLayoutEffect(() => {
    const scopeNode = scope?.current ?? scope;
    const ctx = gsap.context(callback, scopeNode);
    return () => ctx.revert();
  }, dependencies);
}

function useDeferredImagePreload() {
  useLayoutEffect(() => {
    const imageUrls = [
      ...Object.values(heroImages),
      ...ritualMoments.map((moment) => moment.image)
    ];
    const uniqueUrls = [...new Set(imageUrls)];

    const preload = () => {
      uniqueUrls.forEach((url) => {
        const image = new Image();
        image.decoding = "async";
        image.src = url;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 2400 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timerId);
  }, []);
}

function readReducedMotionSetting() {
  if (typeof window === "undefined") {
    return false;
  }

  const motionPreference = new URLSearchParams(window.location.search).get("motion");

  if (motionPreference === "off" || motionPreference === "reduce") {
    return true;
  }

  if (motionPreference === "on") {
    return false;
  }

  return false;
}

function useReducedMotionSetting() {
  const [reducedMotionActive, setReducedMotionActive] = useState(readReducedMotionSetting);

  useLayoutEffect(() => {
    const motionPreference = new URLSearchParams(window.location.search).get("motion");

    if (motionPreference === "off" || motionPreference === "reduce") {
      setReducedMotionActive(true);
      return undefined;
    }

    if (motionPreference === "on") {
      setReducedMotionActive(false);
      return undefined;
    }

    setReducedMotionActive(false);
    return undefined;
  }, []);

  return reducedMotionActive;
}

function useHashAnchorScroll() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      ScrollTrigger.refresh();
      const preferredTrigger =
        id === "activities"
          ? ScrollTrigger.getById("anvelia-ritual-day-scroll")
          : id === "anvelia-scroll-deck"
            ? ScrollTrigger.getById("anvelia-react-scroll-show")
            : null;
      const pinnedTrigger = preferredTrigger || ScrollTrigger.getAll().find((trigger) => {
        const triggerId = trigger.vars?.id || "";
        return (
          trigger.trigger === target &&
          (trigger.vars?.pin ||
            triggerId === "anvelia-ritual-day-scroll" ||
            triggerId === "anvelia-react-scroll-show")
        );
      });

      window.scrollTo({
        top: pinnedTrigger ? pinnedTrigger.start : target.offsetTop,
        behavior: "auto"
      });
      ScrollTrigger.update();
    };

    let frameId = 0;
    let timerIds = [];

    const scheduleScrollToHash = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
      timerIds = [];

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        scrollToHash();
      });
      timerIds = [120, 420, 900, 1400].map((delay) =>
        window.setTimeout(scrollToHash, delay)
      );
    };

    scheduleScrollToHash();
    window.addEventListener("hashchange", scheduleScrollToHash);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
      window.removeEventListener("hashchange", scheduleScrollToHash);
    };
  }, []);
}

function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`site-nav${activeSection === "opening" ? " is-scroll-deck" : ""}${menuOpen ? " is-menu-open" : ""}`}
      aria-label="Anvelia navigation"
    >
      <a className="brand-mark" href="#anvelia-scroll-deck" onClick={closeMenu}>
        <img src={heroImages.logo} alt="" aria-hidden="true" />
        <span>Anvelia</span>
      </a>
      <button
        aria-controls="mobile-navigation-menu"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span className="menu-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <div className="nav-links" id="mobile-navigation-menu">
        {NAV_ITEMS.map((item) => (
          <a
            aria-current={activeSection === item.id ? "page" : undefined}
            className={activeSection === item.id ? "is-active" : undefined}
            href={item.href}
            key={item.id}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </div>
      <span className="nav-progress" aria-hidden="true" />
    </nav>
  );
}

function SanctuaryTitle() {
  return (
    <div className="hero-title" aria-label="Welcome to Anvelia">
      <p className="hero-kicker">Welcome to</p>
      <h1>Anvelia</h1>
      <p className="hero-copy">
        A warm retreat shaped by forest, mist, and stillness.
      </p>
    </div>
  );
}

function ScrollDeck({ reducedMotionActive }) {
  const deckRef = useRef(null);
  const pinRef = useRef(null);

  useScopedGsap(() => {
    const deck = deckRef.current;
    const pin = pinRef.current;

    if (!deck || !pin) {
      return;
    }

    const opening = ".opening-layer";
    const mist = ".mist-layer";
    const hero = ".hero-layer";
    const ambient = ".ambient-wash";
    const heroTitle = ".hero-title";
    const titleParts = ".hero-title .hero-kicker, .hero-title h1, .hero-title .hero-copy";

    if (reducedMotionActive) {
      gsap.set(deck, { minHeight: "auto" });
      gsap.set(pin, { clearProps: "all" });
      gsap.set([opening, mist], { autoAlpha: 0 });
      gsap.set(hero, { autoAlpha: 1, scale: 1, filter: "blur(0px) brightness(1.01) saturate(0.98)" });
      gsap.set(ambient, { autoAlpha: 1 });
      gsap.set(heroTitle, { autoAlpha: 1, y: 0 });
      gsap.set(titleParts, { autoAlpha: 1, y: 0 });
      window.anveliaOpeningTimeline = null;
      window.anveliaMotionStatus = { mode: "reduced" };
      return;
    }

      gsap.set(deck, { minHeight: "440vh" });
    gsap.set(opening, { autoAlpha: 1, scale: 1, filter: "blur(0px) brightness(1.01) saturate(0.94)" });
    gsap.set(mist, { autoAlpha: 0, scale: 1.04, filter: "blur(14px) saturate(0.9)" });
    gsap.set(hero, { autoAlpha: 0, scale: 1.045, filter: "blur(9px) brightness(1.08) saturate(0.9)" });
    gsap.set(ambient, { autoAlpha: 0 });
    gsap.set(heroTitle, { autoAlpha: 0, y: 34 });
    gsap.set(titleParts, { autoAlpha: 0, y: 26 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "anvelia-react-scroll-show",
        trigger: deck,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    window.anveliaOpeningTimeline = tl;
    window.anveliaMotionStatus = { mode: "scroll" };

    tl
      .addLabel("logo", 0)
      .to(opening, { scale: 1.01, duration: 0.95 }, "logo")
      .addLabel("mist-bridge", 0.95)
      .to(mist, { autoAlpha: 0.5, scale: 1.016, filter: "blur(5px) saturate(0.94)", duration: 0.42 }, "mist-bridge")
      .to(opening, { autoAlpha: 0, scale: 1.034, filter: "blur(11px) brightness(1.08) saturate(0.88)", duration: 0.48 }, "mist-bridge+=0.06")
      .addLabel("hero-reveal", 1.36)
      .to(hero, { autoAlpha: 1, scale: 1.014, filter: "blur(2px) brightness(1.04) saturate(0.96)", duration: 0.5 }, "hero-reveal")
      .to(ambient, { autoAlpha: 1, duration: 0.46 }, "hero-reveal+=0.08")
      .to(mist, { autoAlpha: 0.08, duration: 0.4 }, "hero-reveal+=0.12")
      .addLabel("title-in", 1.82)
      .to(hero, { scale: 1, filter: "blur(0px) brightness(1.01) saturate(0.98)", duration: 0.48 }, "title-in")
      .to(mist, { autoAlpha: 0, filter: "blur(16px) saturate(0.86)", duration: 0.34 }, "title-in")
      .to(heroTitle, { autoAlpha: 1, y: 0, duration: 0.34 }, "title-in+=0.05")
      .to(titleParts, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.42, ease: "power2.out" }, "title-in+=0.08")
      .addLabel("settled-hero", 2.34)
      .to(hero, { scale: 0.992, duration: 2.3 }, "settled-hero");
  }, { scope: deckRef, dependencies: [reducedMotionActive] });

  return (
    <section
      id="anvelia-scroll-deck"
      className={`snap-chapter${reducedMotionActive ? " reduced-motion-active" : ""}`}
      aria-label="Anvelia opening scroll show"
      ref={deckRef}
    >
      <div className="deck-pin" ref={pinRef}>
        <div className="slide-layer opening-layer">
          <img
            src={heroImages.opening}
            alt="Anvelia opening logo hero"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="slide-layer mist-layer" aria-hidden="true">
          <img src={heroImages.mist} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>
        <div className="slide-layer hero-layer">
          <img
            src={heroImages.sanctuary}
            alt="Anvelia mountain sanctuary cabins at dawn"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="ambient-wash" aria-hidden="true" />
        <SanctuaryTitle />
      </div>
    </section>
  );
}

function usePageReveal(reducedMotionActive) {
  const appRef = useRef(null);

  useScopedGsap(() => {
    const app = appRef.current;

    if (!app) {
      return;
    }

    const sections = gsap.utils.toArray(".reveal-section", app);

    if (reducedMotionActive) {
      gsap.set(
        ".about-heading > *, .about-rhythm-map, .place-copy > *, .place-meta, .detox-intro > *, .detox-feature, .visit-hero > *, .visit-panel",
        { clearProps: "all" }
      );
      return;
    }

    sections.forEach((section, index) => {
      const media = section.querySelector(".place-image, .detox-full-bleed, .visit-background");
      const title = section.querySelector(".about-heading h2, .place-copy h2, .detox-intro h2, .visit-hero h2");
      const kicker = section.querySelector(".about-heading p, .place-copy p, .detox-intro > p, .visit-hero > p");
      const lead = section.querySelector(".place-copy span, .detox-intro > span, .visit-hero > span");
      const details = gsap.utils.toArray(
        ".about-rhythm-map, .place-meta, .detox-feature, .visit-panel",
        section
      );

      if (!title && !media) {
        return;
      }

      if (media) {
        gsap.set(media, {
          clipPath: "inset(10% 0% 10% 0%)",
          scale: 1.055,
          transformOrigin: "center center"
        });
      }
      if (kicker) {
        gsap.set(kicker, { autoAlpha: 0, y: 24, filter: "blur(8px)" });
      }
      if (title) {
        gsap.set(title, {
          autoAlpha: 0,
          yPercent: 54,
          scaleY: 0.8,
          filter: "blur(10px)",
          clipPath: "inset(0% 0% 100% 0%)",
          transformOrigin: "left bottom"
        });
      }
      if (lead) {
        gsap.set(lead, { autoAlpha: 0, y: 30, filter: "blur(8px)" });
      }
      if (details.length) {
        gsap.set(details, { autoAlpha: 0, y: 42, filter: "blur(10px)" });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          id: `anvelia-section-reveal-${index}`,
          trigger: section,
          start: "top 78%",
          end: "top 50%",
          scrub: 0.72,
          invalidateOnRefresh: true
        }
      });

      if (media) {
        tl.to(media, { clipPath: "inset(0% 0% 0% 0%)", scale: 1.015, duration: 0.36 }, 0);
      }
      if (kicker) {
        tl.to(kicker, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.2 }, 0.04);
      }
      if (title) {
        tl.to(
          title,
          {
            autoAlpha: 1,
            yPercent: 0,
            scaleY: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.36
          },
          0.1
        );
      }
      if (lead) {
        tl.to(lead, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.26 }, 0.36);
      }
      if (details.length) {
        tl.to(details, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.3, stagger: 0.06 }, 0.48);
      }

      if (media) {
        gsap.to(media, {
          yPercent: section.matches(".place-slide, .inquiry-section") ? -5 : -3,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            id: `anvelia-section-parallax-${index}`,
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
            invalidateOnRefresh: true
          }
        });
      }
    });

    gsap.delayedCall(0.3, () => ScrollTrigger.refresh());
  }, { scope: appRef, dependencies: [reducedMotionActive] });

  return appRef;
}

function usePresentationNavigation() {
  const [activeSection, setActiveSection] = useState("opening");

  useLayoutEffect(() => {
    const progress = document.querySelector(".nav-progress");
    const sections = [
      { id: "opening", selector: "#anvelia-scroll-deck" },
      ...NAV_ITEMS.map((item) => ({ id: item.id, selector: item.href }))
    ];
    const trackedSections = sections
      .map((section) => ({
        id: section.id,
        element: document.querySelector(section.selector)
      }))
      .filter((section) => section.element);
    let frameId = 0;

    const updateNavigation = () => {
      if (!progress) {
        return;
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scale = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const viewportMarker = window.innerHeight * 0.42;
      const current = trackedSections
        .map((section) => {
          const rect = section.element.getBoundingClientRect();
          const containsMarker = rect.top <= viewportMarker && rect.bottom >= viewportMarker;
          const distance = Math.abs(rect.top - viewportMarker);
          return { ...section, containsMarker, distance };
        })
        .filter((section) => section.containsMarker)
        .sort((a, b) => a.distance - b.distance)[0];

      gsap.set(progress, {
        scaleX: gsap.utils.clamp(0, 1, scale),
        transformOrigin: "left center"
      });

      if (current?.id) {
        setActiveSection(current.id);
      }
    };

    const requestNavigationUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateNavigation();
      });
    };

    updateNavigation();
    window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
    window.addEventListener("resize", requestNavigationUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestNavigationUpdate);
      window.removeEventListener("resize", requestNavigationUpdate);
    };
  }, []);

  return activeSection;
}

function AboutRhythm() {
  const sectionRef = useRef(null);

  useScopedGsap(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const background = ".about-bg";
    const points = ".rhythm-point";

    gsap.set(points, { autoAlpha: 0, y: 24 });

    gsap.to(background, {
      yPercent: -4,
      scale: 1.105,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(points, {
      autoAlpha: 1,
      y: 0,
      duration: 0.84,
      ease: "power2.out",
      stagger: 0.13,
      scrollTrigger: {
        trigger: section,
        start: "top 56%",
        once: true
      }
    });

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className="about-section reveal-section snap-chapter" id="about" aria-label="About Anvelia" ref={sectionRef}>
      <img className="about-bg" src={heroImages.sanctuary} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="about-mist" aria-hidden="true" />
      <div className="about-content">
        <div className="about-heading">
          <p>About Anvelia</p>
          <h2>A quieter rhythm on the ridge.</h2>
        </div>
        <div className="about-copy">
          <div className="about-rhythm-map" aria-label="Anvelia rhythm">
            <ol className="about-rhythm-list">
              {ABOUT_RHYTHM_POINTS.map((point, index) => (
                <li className="rhythm-point" key={point.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{point.title}</strong>
                    <small>{point.body}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaceSlide({ slide }) {
  return (
    <section className="place-slide reveal-section snap-chapter" id={slide.id} aria-label={slide.title}>
      <img className="place-image" src={slide.image} alt="" loading="lazy" decoding="async" />
      <div className="place-shade" aria-hidden="true" />
      <div className="place-copy">
        <p>{slide.label}</p>
        <h2>{slide.title}</h2>
        <span>{slide.body}</span>
      </div>
      <div className="place-meta" aria-label={`${slide.title} note`}>
        <span>{slide.note}</span>
      </div>
    </section>
  );
}

function ActivitiesSection({ reducedMotionActive }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useScopedGsap(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) {
      return;
    }

    const backgrounds = gsap.utils.toArray(".ritual-bg");
    const moments = gsap.utils.toArray(".ritual-moment");
    const dots = gsap.utils.toArray(".ritual-dot");
    const label = ".ritual-label";

    const setActiveDot = (activeIndex) => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeIndex);
      });
    };

    gsap.set(backgrounds, { autoAlpha: 0, scale: 1.045 });
    gsap.set(backgrounds[0], { autoAlpha: 1, scale: 1.015 });
    gsap.set(moments, { autoAlpha: 0, y: 28 });
    gsap.set(label, { autoAlpha: 0, y: 22, filter: "blur(8px)" });
    moments.forEach((moment) => {
      gsap.set(moment.querySelector("span"), { autoAlpha: 0, y: 18, filter: "blur(8px)" });
      gsap.set(moment.querySelector("h2"), {
        autoAlpha: 0,
        yPercent: 46,
        scaleY: 0.82,
        filter: "blur(10px)",
        clipPath: "inset(0% 0% 100% 0%)",
        transformOrigin: "left bottom"
      });
      gsap.set(moment.querySelector("p"), { autoAlpha: 0, y: 24, filter: "blur(8px)" });
    });
    gsap.set(moments[0], { autoAlpha: 1, y: 0 });
    gsap.set(moments[0]?.querySelector("span"), { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    gsap.set(moments[0]?.querySelector("h2"), {
      autoAlpha: 1,
      yPercent: 0,
      scaleY: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)"
    });
    gsap.set(moments[0]?.querySelector("p"), { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    setActiveDot(0);

    if (reducedMotionActive) {
      gsap.set(section, { minHeight: "auto" });
      gsap.set(pin, { clearProps: "all" });
      gsap.set(backgrounds, { autoAlpha: 1, scale: 1 });
      gsap.set(moments, { autoAlpha: 1, y: 0 });
      gsap.set(`${label}, .ritual-moment > *`, { clearProps: "all" });
      return;
    }

    const stepDuration = 1.35;

    gsap.set(section, { minHeight: "100dvh" });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "anvelia-ritual-day-scroll",
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * ritualMoments.length * 0.95)}`,
        scrub: 1.1,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const lastIndex = Math.max(0, ritualMoments.length - 1);
          const activeIndex = Math.min(
            lastIndex,
            Math.round(self.progress * lastIndex)
          );
          setActiveDot(activeIndex);
        }
      }
    });

    tl.set(backgrounds[0], { autoAlpha: 1, scale: 1.015 }, 0);
    tl.set(label, { autoAlpha: 1, y: 0, filter: "blur(0px)" }, 0);
    tl.set(moments[0], { autoAlpha: 1, y: 0 }, 0);
    tl.set(moments[0]?.querySelector("span"), { autoAlpha: 1, y: 0, filter: "blur(0px)" }, 0);
    tl.set(moments[0]?.querySelector("h2"), {
      autoAlpha: 1,
      yPercent: 0,
      scaleY: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)"
    }, 0);
    tl.set(moments[0]?.querySelector("p"), { autoAlpha: 1, y: 0, filter: "blur(0px)" }, 0);

    const showMoment = (moment, position, index) => {
      tl
        .set(moment, { autoAlpha: 1, y: 0, zIndex: index + 1 }, position)
        .to(moment.querySelector("span"), { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.12, ease: "power3.out" }, position)
        .to(
          moment.querySelector("h2"),
          {
            autoAlpha: 1,
            yPercent: 0,
            scaleY: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.18,
            ease: "power3.out"
          },
          position + 0.03
        )
        .to(moment.querySelector("p"), { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.16, ease: "power3.out" }, position + 0.14);
    };

    const hideMoment = (moment, position) => {
      const title = moment.querySelector("h2");

      tl
        .to(moment.querySelector("p"), { autoAlpha: 0, y: -10, filter: "blur(5px)", duration: 0.1, ease: "power2.in" }, position)
        .to(title, {
          autoAlpha: 0,
          yPercent: -18,
          scaleY: 0.9,
          filter: "blur(8px)",
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.14,
          ease: "power2.in"
        }, position + 0.02)
        .to(moment.querySelector("span"), { autoAlpha: 0, y: -10, filter: "blur(5px)", duration: 0.1, ease: "power2.in" }, position + 0.05)
        .set(moment, { autoAlpha: 0, y: -14, zIndex: 0 }, position + 0.2);
    };

    showMoment(moments[0], 0.08, 0);

    backgrounds.forEach((background, index) => {
      const stepPosition = index * stepDuration;

      tl.to(background, { scale: 1, duration: stepDuration }, stepPosition);

      if (index === 0) {
        return;
      }

      tl
        .to(backgrounds[index - 1], { autoAlpha: 0, scale: 1.025, duration: 0.3 }, stepPosition + 0.02)
        .to(background, { autoAlpha: 1, duration: 0.34 }, stepPosition - 0.08);
      hideMoment(moments[index - 1], stepPosition - 0.18);
      showMoment(moments[index], stepPosition + 0.08, index);
    });
  }, { scope: sectionRef, dependencies: [reducedMotionActive] });

  return (
    <section
      className={reducedMotionActive ? "activity-section snap-chapter is-reduced" : "activity-section snap-chapter"}
      id="activities"
      aria-label="Anvelia activities"
      ref={sectionRef}
    >
      <div className="activity-pin" ref={pinRef}>
        <div className="ritual-backgrounds" aria-hidden="true">
          {ritualMoments.map((moment) => (
            <img
              className="ritual-bg"
              src={moment.image}
              alt=""
              loading="lazy"
              decoding="async"
              key={moment.title}
            />
          ))}
        </div>

        <div className="ritual-shade" aria-hidden="true" />
        <div className="ritual-label">
          <span>Activities</span>
          <strong>Day rhythm</strong>
        </div>

        <div className="ritual-copy" aria-live="polite">
          {ritualMoments.map((moment) => (
            <article className="ritual-moment" key={`${moment.time}-${moment.title}`}>
              <span>{moment.time}</span>
              <h2>{moment.title}</h2>
              <p>{moment.body}</p>
            </article>
          ))}
        </div>

        <div className="ritual-progress" aria-label="Activity rhythm steps">
          {ritualMoments.map((moment) => (
            <span className="ritual-dot" key={moment.title}>
              <small>{moment.time}</small>
            </span>
          ))}
        </div>
      </div>

      <div className="ritual-reduced-list" aria-label="Activities overview">
        {ritualMoments.map((moment) => (
          <article className="ritual-reduced-card" key={moment.title}>
            <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
            <div>
              <span>{moment.time}</span>
              <h3>{moment.title}</h3>
              <p>{moment.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DetoxSection() {
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(2);
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const selectedProgram = detoxPrograms[selectedProgramIndex];
  const hotSpringImage = ritualMoments.find((moment) => moment.title === "Hot Spring Therapy")?.image;
  const liverProgramImage = ritualMoments.find((moment) => moment.title === "Liver Program")?.image;
  const detoxProgramImages = [
    { image: heroImages.cabin, alt: "Forest cabin for a short wellness stay" },
    { image: heroImages.cultivation, alt: "Organic farm terraces for clean nourishment" },
    { image: heroImages.gathering, alt: "Open healing pavilion for retreat recovery" },
    { image: hotSpringImage || heroImages.sanctuary, alt: "Hot spring therapy in a quiet forest setting" },
    { image: liverProgramImage || heroImages.sanctuary, alt: "A deeper detox table with forest views" }
  ];
  const previousProgramIndex = (selectedProgramIndex + detoxPrograms.length - 1) % detoxPrograms.length;
  const nextProgramIndex = (selectedProgramIndex + 1) % detoxPrograms.length;

  useScopedGsap(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;

    if (!section || !copy) {
      return;
    }

    gsap.fromTo(
      copy.querySelectorAll(".detox-feature-copy > *, .detox-path-label, .detox-program-switcher"),
      { autoAlpha: 0, y: 16, filter: "blur(6px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.46,
        ease: "power2.out",
        stagger: 0.045
      }
    );
  }, { scope: sectionRef, dependencies: [selectedProgramIndex] });

  return (
    <section
      className="detox-section reveal-section snap-chapter"
      id="detox"
      aria-label="Detox and wellness program"
      ref={sectionRef}
    >
      <figure className="detox-full-bleed" aria-hidden="true">
        {detoxProgramImages.map((programImage, index) => (
          <img
            className={selectedProgramIndex === index ? "is-active" : undefined}
            src={programImage.image}
            alt=""
            loading="lazy"
            decoding="async"
            key={`${detoxPrograms[index].days}-${programImage.alt}`}
          />
        ))}
      </figure>
      <div className="detox-vignette" aria-hidden="true" />

        <div className="detox-content">
          <div className="detox-intro">
          <p>2-14 day stays</p>
          <h2>Detox & Wellness Program</h2>
          <span>
            Choose a first cleanse or settle into a deeper stay. Rest, clean nourishment,
            movement, and quiet guidance shape each path.
          </span>
        </div>
        <article className="detox-feature" aria-live="polite" ref={copyRef}>
          <div className="detox-feature-copy">
            <p>Selected Stay</p>
            <h3>
              <span>{selectedProgram.days}</span> days
              <br />
              {selectedProgram.label}
            </h3>
            <small>{selectedProgram.tone}</small>
            <dl>
              <div>
                <dt>Best for</dt>
                <dd>{selectedProgram.bestFor}</dd>
              </div>
              <div>
                <dt>Pace</dt>
                <dd>{selectedProgram.pace}</dd>
              </div>
            </dl>
          </div>
          <div className="detox-path-label" aria-hidden="true">
            <span>{String(selectedProgramIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(detoxPrograms.length).padStart(2, "0")}</span>
          </div>
          <div className="detox-program-switcher" aria-label="Choose a detox program duration">
            <button
              type="button"
              className="detox-arrow"
              aria-label={`Show ${detoxPrograms[previousProgramIndex].days}-day program`}
              onClick={() => setSelectedProgramIndex(previousProgramIndex)}
            >
              <span aria-hidden="true">-</span>
            </button>
            <div className="detox-day-tabs" style={{ "--selected-day-index": selectedProgramIndex }}>
              {detoxPrograms.map((program, index) => (
                <button
                  aria-pressed={selectedProgramIndex === index}
                  className={selectedProgramIndex === index ? "is-selected" : undefined}
                  key={program.days}
                  type="button"
                  onClick={() => setSelectedProgramIndex(index)}
                >
                  <strong>{program.days}</strong>
                  <span>days</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="detox-arrow"
              aria-label={`Show ${detoxPrograms[nextProgramIndex].days}-day program`}
              onClick={() => setSelectedProgramIndex(nextProgramIndex)}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

function InquirySection() {
  return (
    <section className="inquiry-section reveal-section snap-chapter" id="inquiry" aria-label="Visit Anvelia">
      <img className="visit-background" src={heroImages.mist} alt="" aria-hidden="true" decoding="async" />
      <div className="visit-shade" aria-hidden="true" />
      <div className="visit-content">
        <div className="visit-hero">
          <p>Visit Anvelia</p>
          <h2>Welcome home.</h2>
          <span>A quiet ridge sanctuary for rest, renewal, and slower living.</span>
        </div>
        <aside className="visit-panel" aria-label="Anvelia visit details">
          <p>Plan your visit</p>
          <address>Lot 8421 Kampung Bukit Tinggi, Town, 28750 Bentong, Pahang</address>
          <a className="visit-phone" href="tel:+60136683113">+60 13-668 3113</a>
          <div className="visit-actions" aria-label="Contact Anvelia">
            <a href="tel:+60136683113">Call</a>
            <a href="https://wa.me/60136683113" target="_blank" rel="noreferrer">WhatsApp</a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lot%208421%20Kampung%20Bukit%20Tinggi%2C%20Town%2C%2028750%20Bentong%2C%20Pahang"
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const reducedMotionActive = useReducedMotionSetting();
  const appRef = usePageReveal(reducedMotionActive);
  const activeSection = usePresentationNavigation();
  useDeferredImagePreload();
  useHashAnchorScroll();

  const appClass = useMemo(
    () => `app-shell${reducedMotionActive ? " is-reduced" : ""}`,
    [reducedMotionActive]
  );

  return (
    <main className={appClass} ref={appRef}>
      <Navigation activeSection={activeSection} />
      <ScrollDeck reducedMotionActive={reducedMotionActive} />
      <AboutRhythm />
      {placeSlides.map((slide) => (
        <PlaceSlide slide={slide} key={slide.id} />
      ))}
      <ActivitiesSection reducedMotionActive={reducedMotionActive} />
      <DetoxSection />
      <InquirySection />
    </main>
  );
}
