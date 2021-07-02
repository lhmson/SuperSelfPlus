export const limitNameLength = (text, limit) => {
  if (!text || text.length === 0) {
    return "";
  }
  if (text?.length > limit) {
    return text.substring(0, limit) + "...";
  } else return text;
};
