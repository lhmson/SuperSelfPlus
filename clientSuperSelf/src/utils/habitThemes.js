import COLOR from "../constants/colors";

export const renderColor = (theme) => {
  switch (theme) {
    case themes.health:
      return COLOR.red;
    case themes.spirit:
      return COLOR.lightBlue;
    case themes.finance:
      return COLOR.yellow;
    case themes.skills:
      return COLOR.purple;
    case themes.connection:
      return COLOR.lightGreen;
    default:
      return COLOR.white;
  }
};

export const renderImageEventByTheme = (theme) => {
  switch (theme) {
    case themes.health:
      return "https://i.ibb.co/8cnqJg5/health.jpg";
    case themes.spirit:
      return "https://i.ibb.co/m01rWRR/spirit.jpg";
    case themes.finance:
      return "https://i.ibb.co/tPyXPjz/finance.jpg";
    case themes.skills:
      return "https://i.ibb.co/7GyN4CW/skills.jpg";
    case themes.connection:
      return "https://i.ibb.co/xKkJJD9/connect.jpg";
    default:
      return "https://i.ibb.co/BZvRKw6/event.jpg";
  }
};

export const themes = {
  health: "health",
  spirit: "spirit",
  finance: "finance",
  skills: "skills",
  connection: "connection",
  general: "general",
};

export const habitThemes = [
  themes.health,
  themes.spirit,
  themes.finance,
  themes.skills,
  themes.connection,
  themes.general,
];

export const eventImageByThemes = [];
