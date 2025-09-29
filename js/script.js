import MENU_DATA from "./data.js";

// Elements and initial state
const mainMenu = document.getElementById("mainMenu");
const subMenu = document.getElementById("subMenu");
const subTitle = document.getElementById("subTitle");
const subContent = document.getElementById("subContent");
const subToggle = document.getElementById("subToggle");
const subSearch = document.getElementById("subSearch");
const subTop = document.querySelector(".sub-top");
const searchBar = document.querySelector(".search-bar");

let currentMain = "dashboard";
let subCollapsed = true;

// Create DOM for sections
function createSection(section) {
  const wrap = document.createElement("div");
  wrap.className = "section";

  if (section.label) {
    const lab = document.createElement("div");
    lab.className = "label";
    lab.textContent = section.label;
    wrap.appendChild(lab);
  }

  const list = document.createElement("div");
  list.className = "submenu-list";

  section.items.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "nav-item";
    itemEl.tabIndex = 0;
    itemEl.role = "button";
    itemEl.setAttribute("aria-pressed", "false");

    const ic = document.createElement("div");
    ic.className = "icon";
    ic.innerHTML = item.icon;
    itemEl.appendChild(ic);

    const txt = document.createElement("div");
    txt.className = "text";
    txt.textContent = item.text;
    itemEl.appendChild(txt);

    if (item.children && item.children.length) {
      const chev = document.createElement("div");
      chev.className = "chev";
      chev.innerHTML = '<i class="fas fa-chevron-down"></i>';
      itemEl.appendChild(chev);
      const chevIcon = chev.querySelector("i");

      // create nested container
      const nested = document.createElement("div");
      nested.className = "submenu-list collapsed";
      nested.style.marginLeft = "8px";
      nested.style.overflow = "hidden";
      nested.style.transition = "max-height 0.3s cubic-bezier(0.4,0,0.2,1)";
      nested.style.maxHeight = "0";
      item.children.forEach((child) => {
        const link = document.createElement("div");
        link.className = "sub-link";
        link.tabIndex = 0;
        link.textContent = child;
        nested.appendChild(link);
      });

      // toggle nested on click
      function toggleNested() {
        const isOpen = !nested.classList.contains("collapsed");
        if (isOpen) {
          nested.classList.add("collapsed");
          itemEl.setAttribute("aria-expanded", "false");
          nested.style.maxHeight = "0";
          if (chevIcon) chevIcon.classList.remove("rotate");
        } else {
          nested.classList.remove("collapsed");
          itemEl.setAttribute("aria-expanded", "true");
          nested.style.maxHeight = nested.scrollHeight + "px";
          if (chevIcon) chevIcon.classList.add("rotate");
        }
      }
      itemEl.addEventListener("click", (event) => {
        toggleNested(event);
      });
      itemEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleNested();
        }
      });

      wrap.appendChild(itemEl);
      wrap.appendChild(nested);
    } else {
      list.appendChild(itemEl);
    }
  });

  wrap.appendChild(list);
  return wrap;
}

// Render submenu
function renderSubmenu(key) {
  const data = MENU_DATA[key];
  subTitle.textContent = data.title || key;
  subContent.innerHTML = "";
  data.sections.forEach((sec) => {
    const secEl = createSection(sec);
    subContent.appendChild(secEl);
  });
}

// Wiring main menu clicks
function setActiveMain(key) {
  const buttons = mainMenu.querySelectorAll(".mm-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.key === key) btn.classList.add("active");
  });

  currentMain = key;
  renderSubmenu(key);
}
mainMenu.addEventListener("click", (e) => {
  const btn = e.target.closest(".mm-btn");
  if (!btn) return;
  if (btn.classList.contains("disabled")) return;
  const key = btn.dataset.key;
  if (key) {
    setActiveMain(key);
    if (subCollapsed) {
      subMenu.classList.add("collapsed");
      subToggle.setAttribute("aria-label", "Expand sub menu");
      const data = MENU_DATA[key];
      subContent.innerHTML = "";
      data.sections.forEach((sec) => {
        const iconBar = document.createElement("div");
        iconBar.className = "collapsed-icon-bar";
        sec.items.forEach((item) => {
          const ic = document.createElement("div");
          ic.className = "collapsed-icon";
          ic.innerHTML = item.icon || "•";
          iconBar.appendChild(ic);
        });
        subContent.appendChild(iconBar);
      });
    }
  }
});

mainMenu.querySelectorAll(".mm-btn").forEach((btn) => {
  if (btn.classList.contains("disabled")) return;
  btn.tabIndex = 0;
  btn.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      const k = btn.dataset.key;
      if (k) setActiveMain(k);
    }
  });
});

// Submenu collapse/expand
subToggle.addEventListener("click", () => {
  subCollapsed = !subCollapsed;
  const subToggleIcon = document.getElementById("subToggleIcon");
  if (subCollapsed) {
    subMenu.classList.add("collapsed");
    subToggle.classList.add("collapsed");
    if (subToggleIcon) {
      subToggleIcon.classList.remove("fa-angle-left");
      subToggleIcon.classList.add("fa-angle-right");
    }
    if (searchBar) searchBar.classList.add("collapsed");
    subTop.classList.add("collapsed");
    subToggle.setAttribute("aria-label", "Expand sub menu");

    const data = MENU_DATA[currentMain];
    subContent.innerHTML = "";
    data.sections.forEach((sec) => {
      const iconBar = document.createElement("div");
      iconBar.className = "collapsed-icon-bar";
      sec.items.forEach((item) => {
        const ic = document.createElement("div");
        ic.className = "collapsed-icon";
        ic.innerHTML = item.icon || "•";
        iconBar.appendChild(ic);
      });
      subContent.appendChild(iconBar);
    });
  } else {
    subMenu.classList.remove("collapsed");
    subToggle.classList.remove("collapsed");
    if (subToggleIcon) {
      subToggleIcon.classList.remove("fa-angle-right");
      subToggleIcon.classList.add("fa-angle-left");
    }
    if (searchBar) searchBar.classList.remove("collapsed");
    subTop.classList.remove("collapsed");
    subToggle.setAttribute("aria-label", "Collapse sub menu");
    renderSubmenu(currentMain);
  }
});

// Simple search
subSearch.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const links = subContent.querySelectorAll(".nav-item, .sub-link");
  links.forEach((node) => {
    const txt = node.textContent.trim().toLowerCase();
    if (!q) node.style.display = "";
    else node.style.display = txt.includes(q) ? "" : "none";
  });
});

// Theme toggle logic
function setTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}

setTheme("dark");

const themeToggleBtn = document.querySelector(".theme-toggle");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });
}

if (subCollapsed) {
  subMenu.classList.add("collapsed");
  subToggle.classList.add("collapsed");
  if (searchBar) searchBar.classList.add("collapsed");
  subTop.classList.add("collapsed");
  subToggle.setAttribute("aria-label", "Expand sub menu");

  const data = MENU_DATA[currentMain];
  subContent.innerHTML = "";
  data.sections.forEach((sec) => {
    const iconBar = document.createElement("div");
    iconBar.className = "collapsed-icon-bar";
    sec.items.forEach((item) => {
      const ic = document.createElement("div");
      ic.className = "collapsed-icon";
      ic.innerHTML = item.icon || "•";
      iconBar.appendChild(ic);
    });
    subContent.appendChild(iconBar);
  });
}

setActiveMain(currentMain);
