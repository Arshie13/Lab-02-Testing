export const validate = (data: any): string | boolean => {
  if (validateName(data.name) === true && validateEmail(data.email) === true && validatePassword(data.password) === true) {
    return validateName(data.name);
  } else {
    return validateName(data.name) || validateEmail(data.email) || validatePassword(data.password);
  }
}

export const validateName = (name: string): string | boolean => {
  if (
    !name || name === ''
  ) {
    return 'Name is required';
  } else if (
    name.split(' ').join('').length < 3 ||
    name.split(' ').join('').length > 20) {
    return 'Name must be between 3 and 20 characters';
  } else if (/[^a-zA-Z\s'-]/.test(name)) {
    return 'Name must only contain letters, spaces, apostrophes, or hyphens';
  } else return true;
}

export const validateEmail = (email: string): string | boolean => {
  if (
    !email || email === ''
  ) {
    return 'Email is required';
  } else if (
    !email.includes('@') ||
    !email.includes('.')) {
    return 'Email must be in a valid email format';
  } else return true;
}

export const validatePassword = (password: string): string | boolean => {
  if (
    !password || password === ''
  ) {
    return 'Password is required';
  } else if (password.length < 8) {
    return 'Password must be at least 8 characters';
  } else return true;
}

// console.log(validate('Arshie', '', ''))
// console.log('\n')
// console.log(validate('Arshie123', 'email@email.com', 'Heehee123'))
// console.log('\n')
// console.log(validate('Arshie', 'emailemailcom', 'heehee123'))
// console.log('\n')
// console.log(validate('Arshie', 'email@email.com', 'heehee'))
// console.log('\n')
// console.log(validate('Arshie', 'email@email.com', 'heehee123'))

// console.log(validateName('Arshie'))
// console.log('\n')
// console.log(validateName('Arshie123'))
// console.log('\n')
// console.log(validatePassword('Heehee123'))
// console.log('\n')
// console.log(validatePassword('heehee'))
// console.log('\n')
// console.log(validateEmail('email@email.com'))
// console.log('\n')
// console.log(validateEmail('emailemailcom'))

// let users: {
//   id: number;
//   email: string;
//   username: string;
//   password: string;
//   role: string;
//   createdAt: Date;
//   updatedAt: Date;
// }[]