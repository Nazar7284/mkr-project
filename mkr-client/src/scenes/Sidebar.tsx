import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NotesIcon from "@mui/icons-material/Notes";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TimelineIcon from "@mui/icons-material/Timeline";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div
      // className={`bg-slate-600 text-white fixed h-screen flex flex-col w-16 items-center`}
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col items-center ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`transition-opacity duration-300 my-6 font-bold flex items-center`}
      >
        Menu
      </div>

      <nav>
        {[
          { icon: HomeIcon, label: "Home" },
          { icon: FlagIcon, label: "Demo", to: "/daily-tasks" },
          {
            icon: CheckCircleIcon,
            label: "Tasks and goals",
            to: "/tasks-and-Goals",
          },
          { icon: FlagIcon, label: "Reflections", to: "/reflections" },
          // { icon: CalendarTodayIcon, label: "Daily Planner" },
          // { icon: EventNoteIcon, label: "Weekly Planner" },
          // { icon: EventNoteIcon, label: "Monthly Planner" },
          // { icon: NotesIcon, label: "Notes" },
          // { icon: AccountTreeIcon, label: "Mind Mapping" },
          // { icon: TimelineIcon, label: "Habits Tracker" },
          // { icon: SelfImprovementIcon, label: "Reflections" },
          // { icon: EmojiEventsIcon, label: "Achievements" },
          // { icon: SettingsIcon, label: "Settings" },
          // { icon: PersonIcon, label: "Profile" },
        ].map(({ icon: Icon, label, to }) => (
          <Tooltip key={label} title={label} placement="right">
            <Link
              key={label}
              className="w-full flex p-2 hover:bg-slate-700 cursor-pointer"
              to={to ? to : "/"}
            >
              <Icon />
              {/* <span className={`whitespace-nowrap`}>{label}</span> */}
            </Link>
          </Tooltip>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
