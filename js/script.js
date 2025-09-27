const MENU_DATA = {
  dashboard: {
    title: "Dashboard",
    sections: [
      {
        label: "Dashboard Types",
        items: [
          { icon: "👁️", text: "Overview" },
          {
            icon: "📊",
            text: "Executive Summary",
            children: [
              "Revenue Overview",
              "Key Performance Indicators",
              "Strategic Goals Progress",
              "Department Highlights",
            ],
          },
          {
            icon: "🛠️",
            text: "Operations Dashboard",
            children: [
              "Project Timeline",
              "Resource Allocation",
              "Team Performance",
              "Capacity Planning",
            ],
          },
          {
            icon: "💹",
            text: "Financial Dashboard",
            children: [
              "Budget vs Actual",
              "Cash Flow Analysis",
              "Expense Breakdown",
              "Profit & Loss Summary",
            ],
          },
        ],
      },
      {
        label: "Report Summaries",
        items: [
          { icon: "📁", text: "Weekly Reports" },
          { icon: "⭐", text: "Monthly Insights" },
          { icon: "👁", text: "Quarterly Analysis" },
        ],
      },
      {
        label: "Business Intelligence",
        items: [
          { icon: "📈", text: "Performance Metrics" },
          {
            icon: "🔮",
            text: "Predictive Analytics",
            children: [
              "Q4 Revenue Forecast: $2.4M",
              "Resource Demand: High",
              "Market Trends: Positive",
              "Risk Assessment: Low",
            ],
          },
        ],
      },
    ],
  },

  tasks: {
    title: "Tasks",
    sections: [
      {
        label: "Quick actions",
        items: [
          { icon: "➕", text: "Create Task" },
          { icon: "⚑", text: "Flag Task" },
          { icon: "⏱️", text: "Add Time" },
        ],
      },
      {
        label: "My Tasks",
        items: [
          { icon: "☀️", text: "Due Today" },
          { icon: "🔄", text: "In Progress" },
          { icon: "✅", text: "Completed" },
        ],
      },
    ],
  },

  settings: {
    title: "Settings",
    sections: [
      {
        label: "Preferences",
        items: [
          { icon: "⚙️", text: "General" },
          { icon: "🔔", text: "Notifications" },
        ],
      },
      {
        label: "Account",
        items: [
          { icon: "🔐", text: "Security" },
          { icon: "👤", text: "Profile" },
        ],
      },
    ],
  },

  profile: {
    title: "Profile",
    sections: [
      {
        label: "User",
        items: [
          { icon: "👤", text: "View Profile" },
          { icon: "✍️", text: "Edit" },
        ],
      },
      { label: "Session", items: [{ icon: "🚪", text: "Sign out" }] },
    ],
  },
};

/* -------------------------
  Elements and initial state
---------------------------*/
const mainMenu = document.getElementById("mainMenu");
const subMenu = document.getElementById("subMenu");
const subTitle = document.getElementById("subTitle");
const subContent = document.getElementById("subContent");
const subToggle = document.getElementById("subToggle");
const subSearch = document.getElementById("subSearch");

let currentMain = "dashboard"; // default selection
let subCollapsed = false;

/* -------------------------
  Helpers: create DOM for sections
---------------------------*/
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
    ic.textContent = item.icon || "•";
    itemEl.appendChild(ic);

    const txt = document.createElement("div");
    txt.className = "text";
    txt.textContent = item.text;
    itemEl.appendChild(txt);

    if (item.children && item.children.length) {
      const chev = document.createElement("div");
      chev.className = "chev";
      chev.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      itemEl.appendChild(chev);

      // create nested container
      const nested = document.createElement("div");
      nested.className = "submenu-list collapsed";
      nested.style.marginLeft = "8px";
      item.children.forEach((child) => {
        const link = document.createElement("div");
        link.className = "sub-link";
        link.tabIndex = 0;
        link.textContent = child;
        nested.appendChild(link);
      });

      // toggle nested on click
      function toggleNested(e) {
        const isOpen = !nested.classList.contains("collapsed");
        if (isOpen) {
          nested.classList.add("collapsed");
          itemEl.setAttribute("aria-expanded", "false");
        } else {
          nested.classList.remove("collapsed");
          itemEl.setAttribute("aria-expanded", "true");
        }
      }
      itemEl.addEventListener("click", toggleNested);
      itemEl.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          toggleNested();
        }
      });

      wrap.appendChild(itemEl);
      wrap.appendChild(nested);
    } else {
      // plain link
      itemEl.addEventListener("click", () => {
        // mark clicked visually
        const prev = wrap.querySelector(".nav-item.active");
        if (prev) prev.classList.remove("active");
        itemEl.classList.add("active");
      });
      list.appendChild(itemEl);
    }
  });

  wrap.appendChild(list);
  return wrap;
}

/* -------------------------
  Render submenu based on key
---------------------------*/
function renderSubmenu(key) {
  const data = MENU_DATA[key] || { title: key, sections: [] };
  subTitle.textContent = data.title || key;
  subContent.innerHTML = "";
  data.sections.forEach((sec) => {
    const secEl = createSection(sec);
    subContent.appendChild(secEl);
  });
}

/* -------------------------
  Wiring main menu clicks
---------------------------*/
function setActiveMain(key) {
  // update button styles
  const buttons = mainMenu.querySelectorAll(".mm-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    const k = btn.dataset.key;
    if (k === key) btn.classList.add("active");
  });

  currentMain = key;
  renderSubmenu(key);
}
mainMenu.addEventListener("click", (e) => {
  const btn = e.target.closest(".mm-btn");
  if (!btn) return;
  if (btn.classList.contains("disabled")) return;
  const key = btn.dataset.key;
  if (key) setActiveMain(key);
});

/* keyboard support for main menu */
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

/* -------------------------
  Submenu collapse/expand
---------------------------*/
subToggle.addEventListener("click", () => {
  subCollapsed = !subCollapsed;
  if (subCollapsed) {
    subMenu.classList.add("collapsed");
    subToggle.setAttribute("aria-label", "Expand sub menu");
  } else {
    subMenu.classList.remove("collapsed");
    subToggle.setAttribute("aria-label", "Collapse sub menu");
  }
});

/* -------------------------
  Simple search (client-side)
---------------------------*/
subSearch.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const links = subContent.querySelectorAll(".nav-item, .sub-link");
  links.forEach((node) => {
    const txt = node.textContent.trim().toLowerCase();
    if (!q) node.style.display = "";
    else node.style.display = txt.includes(q) ? "" : "none";
  });
});

/* -------------------------
  Init
---------------------------*/
setActiveMain(currentMain);
