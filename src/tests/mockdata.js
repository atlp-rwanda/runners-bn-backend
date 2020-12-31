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
};

export default mockdata;
