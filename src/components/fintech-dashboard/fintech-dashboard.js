import "../../shared/tailwind.css";
import "./fintech-dashboard.css";
import html from "./fintech-dashboard.html?raw";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

// Auto-inject CSS stylesheet
function injectCSS() {
  const scripts = document.getElementsByTagName("script");
  const currentScript = scripts[scripts.length - 1];
  const scriptSrc = currentScript.src;

  if (scriptSrc) {
    const cssUrl = scriptSrc.replace(
      "/fintech-dashboard.js",
      "/fintech-dashboard.css"
    );
    const existingLink = document.querySelector(`link[href="${cssUrl}"]`);
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      document.head.appendChild(link);
    }
  }
}

// Initialize the fintech dashboard component
function initFintechDashboard() {
  const container = document.getElementById("fintech-dashboard");
  if (!container) return;

  container.innerHTML = html;

  // Get all the elements we need
  const section = container.querySelector("section");
  const desktop = document.getElementById("device-desktop");
  const tablet = document.getElementById("device-tablet");
  const mobile = document.getElementById("device-mobile");

  const labelDesktop = document.getElementById("label-desktop");
  const labelTablet = document.getElementById("label-tablet");
  const labelMobile = document.getElementById("label-mobile");

  if (!section || !desktop || !tablet || !mobile) return;

  // Mouse tracking for 3D tilt
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX = (e.clientX - width / 2) / (width / 2);
    mouseY = (e.clientY - height / 2) / (height / 2);
  });

  // Apply mouse tilt with GSAP
  gsap.ticker.add(() => {
    const rotateX = -mouseY * 8;
    const rotateY = mouseX * 8;

    [desktop, tablet, mobile].forEach((device) => {
      const opacity = parseFloat(getComputedStyle(device).opacity);
      if (opacity > 0) {
        gsap.to(device, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    });
  });

  let currentSection = 0;

  // Configure ScrollTrigger for instant response
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  // Set up ScrollTrigger with precise snap points
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    pin: section.querySelector(".sticky"),
    pinSpacing: false,
    snap: {
      snapTo: [0, 0.5, 1], // Snap to exact positions where each device is fully visible
      duration: 0.25,
      ease: "power1.out",
    },
    onUpdate: (self) => {
      const progress = self.progress;

      // Desktop fully visible (0 to 0.25)
      if (progress <= 0.25) {
        gsap.to(desktop, {
          opacity: 1,
          scale: 1,
          zIndex: 10,
          duration: 0.3,
        });
        gsap.to(tablet, { opacity: 0, scale: 0.9, zIndex: 5, duration: 0.3 });
        gsap.to(mobile, { opacity: 0, scale: 0.9, zIndex: 1, duration: 0.3 });
        updateLabels(0);
      }
      // Transition from desktop to tablet (0.25 to 0.5)
      else if (progress < 0.5) {
        const t = (progress - 0.25) / 0.25; // 0 to 1 transition
        gsap.to(desktop, {
          opacity: 1 - t,
          scale: 1 - t * 0.1,
          zIndex: t > 0.5 ? 5 : 10,
          duration: 0.3,
        });
        gsap.to(tablet, {
          opacity: t,
          scale: 0.9 + t * 0.1,
          zIndex: t > 0.5 ? 10 : 5,
          duration: 0.3,
        });
        gsap.to(mobile, { opacity: 0, scale: 0.9, zIndex: 1, duration: 0.3 });
        updateLabels(t > 0.5 ? 1 : 0);
      }
      // Tablet fully visible (0.5 to 0.75)
      else if (progress <= 0.75) {
        gsap.to(desktop, { opacity: 0, scale: 0.9, zIndex: 1, duration: 0.3 });
        gsap.to(tablet, {
          opacity: 1,
          scale: 1,
          zIndex: 10,
          duration: 0.3,
        });
        gsap.to(mobile, { opacity: 0, scale: 0.9, zIndex: 5, duration: 0.3 });
        updateLabels(1);
      }
      // Transition from tablet to mobile (0.75 to 1)
      else {
        const t = (progress - 0.75) / 0.25; // 0 to 1 transition
        gsap.to(desktop, { opacity: 0, scale: 0.9, zIndex: 1, duration: 0.3 });
        gsap.to(tablet, {
          opacity: 1 - t,
          scale: 1 - t * 0.1,
          zIndex: t > 0.5 ? 5 : 10,
          duration: 0.3,
        });
        gsap.to(mobile, {
          opacity: t,
          scale: 0.9 + t * 0.1,
          zIndex: t > 0.5 ? 10 : 5,
          duration: 0.3,
        });
        updateLabels(t > 0.5 ? 2 : 1);
      }
    },
  });

  // Update label styles
  function updateLabels(activeIndex) {
    if (currentSection === activeIndex) return;
    currentSection = activeIndex;

    const activeClass =
      "text-xs font-medium px-2 py-1 rounded bg-white text-neutral-900 transition-all duration-300";
    const inactiveClass =
      "text-xs font-medium px-2 py-1 rounded text-neutral-500 transition-all duration-300";

    labelDesktop.className = activeIndex === 0 ? activeClass : inactiveClass;
    labelTablet.className = activeIndex === 1 ? activeClass : inactiveClass;
    labelMobile.className = activeIndex === 2 ? activeClass : inactiveClass;
  }

  // Initial state
  gsap.set(desktop, { opacity: 1, scale: 1, zIndex: 10 });
  gsap.set(tablet, { opacity: 0, scale: 0.9, zIndex: 5 });
  gsap.set(mobile, { opacity: 0, scale: 0.9, zIndex: 1 });
}

// Inject CSS first
injectCSS();

// Auto-init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFintechDashboard);
} else {
  initFintechDashboard();
}

// Export for manual initialization if needed
export { initFintechDashboard };
