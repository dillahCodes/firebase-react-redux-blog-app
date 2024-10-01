function obscureEmail(email) {
  if (!email || !email.includes("@")) return email;

  const [localPart, domain] = email.split("@");

  const start = localPart.substring(0, 2);
  const end = localPart.substring(localPart.length - 2);

  const obscuredMiddle = "*****";

  return `${start}${obscuredMiddle}${end}@${domain}`;
}

export default obscureEmail;
