import "../../shared/tailwind.css";
import "./fintech-dashboard.css";
import html from "./fintech-dashboard.html?raw";

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

  let mouseX = 0;
  let mouseY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;

  // Track mouse position
  window.addEventListener("mousemove", (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX = (e.clientX - width / 2) / (width / 2);
    mouseY = (e.clientY - height / 2) / (height / 2);
  });

  // Main Animation Loop
  function animate() {
    // Calculate scroll progress
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    let progress = -rect.top / (sectionHeight - windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Device transitions
    let desktopOp = 1;
    let tabletOp = 0;
    let mobileOp = 0;
    let desktopScale = 1;
    let tabletScale = 0.9;
    let mobileScale = 0.9;

    if (progress < 0.35) {
      // Desktop phase
      desktopOp = 1 - progress * 3.3;
      desktopScale = 1 - progress * 0.2;

      tabletOp = progress * 3.3 - 0.3;
      tabletScale = 0.9 + progress * 0.33;

      labelDesktop.className =
        "text-xs font-medium px-2 py-1 rounded bg-neutral-900 text-white transition-all duration-300";
      labelTablet.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
      labelMobile.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
    } else if (progress >= 0.35 && progress < 0.7) {
      // Tablet phase
      desktopOp = 0;

      tabletOp = 1 - (progress - 0.35) * 3.3;
      tabletScale = 1 - (progress - 0.35) * 0.2;

      mobileOp = (progress - 0.35) * 3.3 - 0.3;
      mobileScale = 0.9 + (progress - 0.35) * 0.33;

      labelDesktop.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
      labelTablet.className =
        "text-xs font-medium px-2 py-1 rounded bg-neutral-900 text-white transition-all duration-300";
      labelMobile.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
    } else {
      // Mobile phase
      desktopOp = 0;
      tabletOp = 0;
      mobileOp = Math.min(1, (progress - 0.6) * 5);
      mobileScale = 1;

      labelDesktop.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
      labelTablet.className =
        "text-xs font-medium px-2 py-1 rounded text-neutral-400 transition-all duration-300";
      labelMobile.className =
        "text-xs font-medium px-2 py-1 rounded bg-neutral-900 text-white transition-all duration-300";
    }

    // Apply opacity and z-index
    desktop.style.opacity = Math.max(0, desktopOp);
    desktop.style.zIndex = desktopOp > 0.5 ? 10 : 1;

    tablet.style.opacity = Math.max(0, tabletOp);

    mobile.style.opacity = Math.max(0, mobileOp);
    mobile.style.zIndex = mobileOp > 0.5 ? 10 : 1;

    // 3D mouse tilt
    targetRotateX = -mouseY * 8;
    targetRotateY = mouseX * 8;

    // Smooth interpolation
    currentRotateX += (targetRotateX - currentRotateX) * 0.1;
    currentRotateY += (targetRotateY - currentRotateY) * 0.1;

    // Apply transforms with hardware acceleration
    if (desktopOp > 0) {
      desktop.style.transform = `translate3d(0, 0, 0) perspective(1000px) scale(${desktopScale}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    }
    if (tabletOp > 0) {
      tablet.style.transform = `translate3d(0, 0, 0) perspective(1000px) scale(${tabletScale}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    }
    if (mobileOp > 0) {
      mobile.style.transform = `translate3d(0, 0, 0) perspective(1000px) scale(${Math.min(
        1,
        mobileScale
      )}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
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
