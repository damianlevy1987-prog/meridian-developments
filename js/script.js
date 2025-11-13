// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
}

// Search tabs (Buy / Rent) + simple front-end filter on featured cards
const tabs = document.querySelectorAll(".md-search__tab");
const propertyCards = document.querySelectorAll(".md-property");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.type;

    tabs.forEach((t) => t.classList.remove("md-search__tab--active"));
    tab.classList.add("md-search__tab--active");

    propertyCards.forEach((card) => {
      if (!type || card.dataset.type === type) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Prevent real submission on demo search form
const searchForm = document.getElementById("propertySearch");

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Search is in demo mode. Filters would be applied here.");
  });
}

// Simple global mock authentication
const ADMIN_EMAIL = "info@meridian-developments.co.uk";
const ADMIN_PASS = "AwaisKhan2846@";

function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    localStorage.setItem("md_role", "admin");
    localStorage.setItem("md_user", email);
    return "admin";
  } else {
    localStorage.setItem("md_role", "user");
    localStorage.setItem("md_user", email || "guest@demo.local");
    return "user";
  }
}

function getRole() {
  return localStorage.getItem("md_role");
}

function getUserEmail() {
  return localStorage.getItem("md_user") || "";
}

// Login form handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const role = login(email, password);

    if (role === "admin") {
      window.location.href = "admin-panel.html";
    } else {
      window.location.href = "user-panel.html";
    }
  });
}

// Show logged-in email on dashboards
const userEmailEl = document.querySelector("[data-user-email]");
if (userEmailEl) {
  userEmailEl.textContent = getUserEmail();
}

// Valuation form mock handler
const valuationForm = document.getElementById("valuationForm");
if (valuationForm) {
  valuationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you. Your valuation request has been received. A member of the team will contact you shortly.");
    valuationForm.reset();
  });
}

// Contact form mock handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your enquiry. We will be in touch as soon as possible.");
    contactForm.reset();
  });
}

// Saved properties using localStorage (very simple demo)
const SAVED_KEY = "md_saved_properties";

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch {
    return [];
  }
}

function saveList(list) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}

function toggleSaved(card) {
  const title = card.querySelector("h3")?.textContent ?? "";
  let saved = getSaved();
  if (saved.includes(title)) {
    saved = saved.filter((t) => t !== title);
  } else {
    saved.push(title);
  }
  saveList(saved);
}

document.querySelectorAll(".js-save-property").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".md-property");
    toggleSaved(card);
    e.currentTarget.classList.toggle("is-active");
  });
});

// Populate saved properties in user panel if present
const savedListEl = document.getElementById("savedPropertiesList");
if (savedListEl) {
  const saved = getSaved();
  if (!saved.length) {
    savedListEl.innerHTML = "<p class=\"md-text-muted\">You haven’t saved any properties yet.</p>";
  } else {
    savedListEl.innerHTML = saved
      .map(
        (title) =>
          `<li>${title} <span class="md-text-muted">· saved</span></li>`
      )
      .join("");
  }
}