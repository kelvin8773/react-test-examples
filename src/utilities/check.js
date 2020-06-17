export const checkName = (name) => {
  return (name.length >= 3) && (name.length <= 30);
}


export const checkEmail = (email) => {
  const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegx.test(email);
};

export const checkPassword = (password) => {
  const passwordRegx = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  // reference link 
  // https://www.itworld.com/article/2833081/how-to-validate-password-strength-using-a-regular-expression.html
  // The password length must be greater than or equal to 8
  // The password must contain one or more uppercase characters
  // The password must contain one or more lowercase characters
  // The password must contain one or more numeric values
  // The password must contain one or more special characters
  return passwordRegx.test(password);
};