const mockdata = {
  userRole: {
    role: 'requester',
  },
  commentNumberTwo: {
    comment: 'Trip will be interesting and will provide alot to the company in terms of techniques and alot of skilss okay olak'
  },
  comment: {
    comment: 'Trip will interesting'
  },
  userInvalidRole: {
    role: 'req',
  },
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJzdXBlcmFkbWluQHJ1bm5lcnMuY29tIiwiZmlyc3ROYW1lIjoiRGFuIiwibGFzdE5hbWUiOiJzdXBlcmFkbWluIiwicm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE2MTIwOTgzNjV9.FxHckzG_OayBEdByNWbG5Rt0tdR_THWAFR0pFP17aJo',
  reqToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRlbGFydW5uZXJzQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6InJlcXVlc3RlciIsInJvbGUiOiJyZXF1ZXN0ZXIiLCJpYXQiOjE2MTExMzcwOTd9.BT51h5593P3JVGvqFisuwcAhl-n0DrWUlj7eDeYa5m0',
  reqTwoToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqYXlAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSmF5IiwibGFzdE5hbWUiOiJyZXF1ZXN0ZXIiLCJyb2xlIjoicmVxdWVzdGVyIiwiaWF0IjoxNjExNDE3OTc2fQ.bYIb4ylnBj3lCCiTMExHbrgfnyJmNiRwpnYNkVX8a54',
  manToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJlZm9vdG1hbmFnZXJAcnVubmVycy5jb20iLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJtYW5hZ2VyIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2MTExNDc2NzR9.wjXxa_voobYANu62FCM6hENbUaZDlT70Qjd3G10OsbE',
  invalidToken: 'james',
  tripRequest: {
    from: 2,
    to: 4,
    reason: 'school trip',
    travelDate: '2030-06-23',
    returnDate: '2030-06-25'
  },
  tripnewRequest: {
    from: 3,
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
    email: 'nyagatarejames@gmail.com',
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
  validAccommodation: {
    accommodationName: 'Radison blue 1',
    accommodationType: 'hotel',
    description: 'A serene environment for relaxation',
    photo: [
      'http://res.cloudinary.com/mucyo/image/upload/v1612275752/AccommodationPictures/6446009e0a9f1f763205005624d2c84e_gdq67k.jpg',
      'http://res.cloudinary.com/mucyo/image/upload/v1612275764/AccommodationPictures/277bd12f557288c44d69ab078e3e9698_cajhpm.jpg',
      'http://res.cloudinary.com/mucyo/image/upload/v1612275758/AccommodationPictures/33a4b673a4b942e80ac74239655f21f7_aw8qtq.jpg'
    ],
    amenities: 'swiming pool, decurity Guard',
    numberOfRooms: 5,
    latitude: '39.768900',
    longitude: '-189.786635',
    locationId: 2,
    locationID: 10,
    streetAddress: 'KG 24 Ave',
    createdAt: '2021-02-02T08:47:30.690Z',
    updatedAt: '2021-02-02T14:22:44.870Z'
  },
  invalidAccommodation: {
    accommodationName: 'Radison blue',
    accommodationType: 'Hostel',
    description: 'A serene environment for relaxation',
    photo: ['https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'],
    amenities: 'gym, pool, sauna',
    numberOfRooms: 10,
    latitude: '37.421925',
    longitude: '-122.0841293',
    locationId: 1,
    streetAddress: 'KG 24 Ave',
    createdAt: '2021-02-02T08:47:30.690Z',
    updatedAt: '2021-02-02T14:22:44.870Z'
  },
  loginadmin: {
    email: 'barefoottripadmin@runners.com',
    password: 'James@2020'
  },
  loginManager: {
    email: 'jimnyagtr@gmail.com',
    password: 'James@2020'
  }
};

export default mockdata;
