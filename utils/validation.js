export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return cleanPhone.length === 10;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateCity = (city) => {
  return city.trim().length >= 2;
};

export const validateDateOfBirth = (month, day, year) => {
  if (!month || !day || !year) {
    return false;
  }

  const date = new Date(year, months.indexOf(month), day);
  const currentDate = new Date();

  return (
    date.getDate() === parseInt(day) &&
    date.getMonth() === months.indexOf(month) &&
    date.getFullYear() === parseInt(year) &&
    date <= currentDate
  );
};

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength < 2) return "weak";
  if (strength < 4) return "medium";
  return "strong";
};

export const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case "weak":
      return "#FF6B6B";
    case "medium":
      return "#FFA500";
    case "strong":
      return "#4CAF50";
    default:
      return "#E0E0E0";
  }
};

export const formatPhoneNumber = (phoneNumber) => {
  const clean = phoneNumber.replace(/\D/g, "");
  const match = clean.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};
