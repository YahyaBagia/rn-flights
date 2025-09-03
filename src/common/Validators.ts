export const emailValidator = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!emailRegex.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";
  else if (password.length < 6)
    return "Password must have at least 6 characters.";
  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";
  else if (name.length < 3) return "Name must have at least 3 characters.";
  //allow only A-Z, a-z and space
  else if (!/^[A-Za-z ]+$/.test(name))
    return "Name must contain only letters and spaces.";
  return "";
};
