const mockdata = {
  userRole: {
    role: 'requester',
  },
  userInvalidRole: {
    role: 'req',
  },
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTYxMDY0NDI4N30.bJS8K2Cym6AEFCnfSFeTSurhiMAApvBxRMHMPOutmWQ',
  reqToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRlbGFydW5uZXJzQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6InJlcXVlc3RlciIsInJvbGUiOiJyZXF1ZXN0ZXIiLCJpYXQiOjE2MTExMzcwOTd9.BT51h5593P3JVGvqFisuwcAhl-n0DrWUlj7eDeYa5m0',
  manToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJlZm9vdG1hbmFnZXJAcnVubmVycy5jb20iLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJtYW5hZ2VyIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2MTExNDc2NzR9.wjXxa_voobYANu62FCM6hENbUaZDlT70Qjd3G10OsbE',
  invalidToken: 'james',
  tripRequest: {
    from: 1,
    to: 4,
    reason: 'school trip',
    travelDate: '2030-06-23',
    returnDate: '2030-06-25'
  },
  tripnewRequest: {
    from: 2,
    to: 4,
    reason: 'school trip',
    travelDate: '2030-06-23',
    returnDate: '2030-06-25'
  },
  tripUpdatedReq: {
    from: 2,
    to: 3,
    reason: 'work trip',
    travelDate: '2030-06-25',
    returnDate: '2030-07-27'
  },
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
