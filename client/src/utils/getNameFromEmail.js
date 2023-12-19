export function getNameFromEmail(email) {
  const parts = email.split("@");
  if (parts.length === 2) {
    return parts[0];
  } else {
    return "UserName";
  }
}
