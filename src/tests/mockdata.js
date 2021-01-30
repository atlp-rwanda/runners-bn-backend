const mockdata = {
  userRole: {
    role: 'requester',
  },
  userInvalidRole: {
    role: 'req',
  },
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTYxMDY0NDI4N30.bJS8K2Cym6AEFCnfSFeTSurhiMAApvBxRMHMPOutmWQ',
  invalidToken: 'james',
  resetEmail: {
    email: 'andelarunners@gmail.com',
  },
  resetInvalidEmail: {
    email: 'andela'
  },
  resetPassword: {
    password: 'Andela@2020',
    confirmPassword: 'Andela@2020'
  },
  signup: {
    firstName: 'Mucyo',
    lastName: 'Aime christian',
    email: 'christian@gmail.com',
    password: 'christian123',
    confirmPassword: 'christian123'
  },
  signupInvalid: {
    firstName: 'Mucyo',
    lastName: 'Aime christian',
    email: 'christiangmal.com',
    password: 'christian123',
    confirmPassword: 'christian123'
  },
  signin: {
    email: 'christian@gmail.com',
    password: 'christian123',
  },
  signinInvalidPassword: {
    email: 'christian@gmail.com',
    password: 'christian',
  },
  signinInvalidEmail: {
    email: 'christian@gmail.com',
    password: 'christian',
  },
};

export default mockdata;
