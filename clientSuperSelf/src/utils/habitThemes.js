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
