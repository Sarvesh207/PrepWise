const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (typeof email !== "string" || !validator.isEmail(email.trim())) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "userName",
    "lastName",
    "photoUrl",
    "phoneNumber",
    "countryCode",
    "gender",
    "about",
    "skills",
    "email",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );


  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
