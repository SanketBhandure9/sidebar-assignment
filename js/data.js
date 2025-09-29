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

export default MENU_DATA;
