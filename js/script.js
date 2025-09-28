const MENU_DATA = {
  dashboard: {
    title: "Dashboard",
    sections: [
      {
        label: "Dashboard Types",
        items: [
          {
            icon: "<i class='fa-solid fa-table-list'></i>",
            text: "Executive Summary",
            children: [
              "Revenue Overview",
              "Key Performance Indicators",
              "Strategic Goals Progress",
              "Department Highlights",
            ],
          },
          {
            icon: "<i class='fa-brands fa-centos'></i>",
            text: "Operations Dashboard",
            children: [
              "Project Timeline",
              "Resource Allocation",
              "Team Performance",
              "Capacity Planning",
            ],
          },
          {
            icon: "<i class='fa-solid fa-coins'></i>",
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
          {
            icon: "<i class='fa-brands fa-weebly'></i>",
            text: "Weekly Reports",
          },
          {
            icon: "<i class='fa-solid fa-calendar-days'></i>",
            text: "Monthly Insights",
          },
          {
            icon: "<i class='fa-solid fa-chart-simple'></i>",
            text: "Quarterly Analysis",
          },
        ],
      },
      {
        label: "Business Intelligence",
        items: [
          {
            icon: "<i class='fa-solid fa-chart-simple'></i>",
            text: "Performance Metrics",
          },
          {
            icon: "<i class='fa-solid fa-diagram-predecessor'></i>",
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
          { icon: "<i class='fa-solid fa-plus'></i>", text: "Create Task" },
          { icon: "<i class='fa-solid fa-flag'></i>", text: "Flag Task" },
          { icon: "<i class='fa-solid fa-clock'></i>", text: "Add Time" },
        ],
      },
      {
        label: "My Tasks",
        items: [
          {
            icon: "<i class='fa-solid fa-note-sticky'></i>",
            text: "Due Today",
          },
          {
            icon: "<i class='fa-solid fa-bars-progress'></i>",
            text: "In Progress",
          },
          {
            icon: "<i class='fa-solid fa-circle-check'></i>",
            text: "Completed",
          },
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
          { icon: "<i class='fa-solid fa-gear'></i>", text: "General" },
          { icon: "<i class='fa-solid fa-bell'></i>", text: "Notifications" },
        ],
      },
      {
        label: "Account",
        items: [
          { icon: "<i class='fa-solid fa-lock'></i>", text: "Security" },
          { icon: "<i class='fa-solid fa-user'></i>", text: "Profile" },
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
          { icon: "<i class='fa-solid fa-user'></i>", text: "View Profile" },
          { icon: "<i class='fa-solid fa-pen-to-square'></i>", text: "Edit" },
        ],
      },
      {
        label: "Session",
        items: [
          {
            icon: "<i class='fa-solid fa-circle-xmark'></i>",
            text: "Sign out",
          },
        ],
      },
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
const subTop = document.querySelector(".sub-top");
const searchBar = document.querySelector(".search-bar");

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
      function toggleNested(e) {
        const isOpen = !nested.classList.contains("collapsed");
        if (isOpen) {
          nested.classList.add("collapsed");
          itemEl.setAttribute("aria-expanded", "false");
          nested.style.maxHeight = "0";
          chev.innerHTML = '<i class="fas fa-chevron-down"></i>';
          chev.classList.remove("expanded");
        } else {
          nested.classList.remove("collapsed");
          itemEl.setAttribute("aria-expanded", "true");
          nested.style.maxHeight = nested.scrollHeight + "px";
          chev.innerHTML = '<i class="fas fa-chevron-up"></i>';
          chev.classList.add("expanded");
        }
      }
      itemEl.addEventListener("click", (ev) => {
        // Only toggle accordion, don't change CSS for active state
        toggleNested(ev);
      });
      itemEl.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
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

/* -------------------------
  Render submenu based on key
---------------------------*/
function renderSubmenu(key) {
  const data = MENU_DATA[key];
  //   console.log("renderSubMenu", key, data);
  subTitle.textContent = data.title || key;
  subContent.innerHTML = "";
  data.sections.forEach((sec) => {
    const secEl = createSection(sec);
    console.log(secEl);
    subContent.appendChild(secEl);
  });
}

/* -------------------------
  Wiring main menu clicks
---------------------------*/
function setActiveMain(key) {
  // update button styles
  const buttons = mainMenu.querySelectorAll(".mm-btn");
  console.log(buttons);
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
    // If submenu is collapsed, re-render icons for the new main menu
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
    // Render only icons for submenu items when collapsed
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
    // Re-render submenu for current main menu when expanding
    renderSubmenu(currentMain);
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
