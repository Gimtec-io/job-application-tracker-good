// Returns the format of the date of the browser
// Ex: dd/mm/yyyy for Europe
// Might not cover all the edge cases, but is good enough
// And having it in an util allows us to easily test it and improve it
// Reference: https://stackoverflow.com/questions/16860257/how-to-detect-date-format-defined-by-browser
export const localDateFormat = () => {
  // Month starts at 0: January, 0; February, 1; ...
  const lastDayCentury = new Date(1999, 11, 31);
  let localStringDate = lastDayCentury.toLocaleDateString();
  localStringDate = localStringDate.replace("31","dd");
  localStringDate = localStringDate.replace("12","mm");
  localStringDate = localStringDate.replace("1999","yyyy");
  return localStringDate;
}