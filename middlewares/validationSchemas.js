const { Joi } = require('celebrate');

// Object validations
const userSchema = Joi.object({
  email: Joi.string().email().required().label('Email')
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required().label('Password').messages({
    'any.required': 'Password is required',
  }),
  name: Joi.string().min(2).max(30).label('Name')
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must be at most 30 characters long',
      'any.required': 'Name is required',
    }),
});

const movieSchema = Joi.object({
  country: Joi.string().required().label('Country').messages({
    'any.required': 'Country is required',
  }),
  director: Joi.string().required().label('Director').messages({
    'any.required': 'Director is required',
  }),
  duration: Joi.number().required().label('Duration').messages({
    'any.required': 'Duration is required',
  }),
  year: Joi.string().required().label('Year').messages({
    'any.required': 'Year is required',
  }),
  description: Joi.string().required().label('Description').messages({
    'any.required': 'Description is required',
  }),
  image: Joi.string().uri().required().label('Image')
    .messages({
      'string.uri': 'Image must be a valid URI',
      'any.required': 'Image is required',
    }),
  trailerLink: Joi.string().uri().required().label('Trailer Link')
    .messages({
      'string.uri': 'Trailer Link must be a valid URI',
      'any.required': 'Trailer Link is required',
    }),
  thumbnail: Joi.string().uri().required().label('Thumbnail')
    .messages({
      'string.uri': 'Thumbnail must be a valid URI',
      'any.required': 'Thumbnail is required',
    }),
  movieId: Joi.number().required().label('Movie ID')
    .messages({
      'any.required': 'Movie ID is required',
    }),
  nameRU: Joi.string().required().label('Name RU').messages({
    'any.required': 'Name RU is required',
  }),
  nameEN: Joi.string().required().label('Name EN').messages({
    'any.required': 'Name EN is required',
  }),
});

// const movieSchema = Joi.object({
//   country: Joi.string().label('Country').default('United States').messages({
//     'any.required': 'Country is required',
//   }),
//   director: Joi.string().label('Director').default('Andrew Adamson, Vicky Jenson').messages({
//     'any.required': 'Director is required',
//   }),
//   duration: Joi.number().label('Duration').default(90).messages({
//     'any.required': 'Duration is required',
//   }),
//   year: Joi.string().label('Year').default('2001').messages({
//     'any.required': 'Year is required',
//   }),
//   description: Joi.string().label('Description').default('When a green ogre named ').messages({
//     'any.required': 'Description is required',
//   }),
//   image: Joi.string().uri().label('Image').default('http://example.com/shrek.jpg').messages({
//     'string.uri': 'Image must be a valid URI',
//     'any.required': 'Image is required',
//   }),
//   trailerLink: Joi.string().uri().label('Trailer Link').default('http://example.com/shrek-trailer').messages({
//     'string.uri': 'Trailer Link must be a valid URI',
//     'any.required': 'Trailer Link is required',
//   }),
//   thumbnail: Joi.string().uri().label('Thumbnail').default('http://example.com/shrek-thumbnail.jpg').messages({
//     'string.uri': 'Thumbnail must be a valid URI',
//     'any.required': 'Thumbnail is required',
//   }),
//   movieId: Joi.number().label('Movie ID').default(1).messages({
//     'any.required': 'Movie ID is required',
//   }),
//   nameRU: Joi.string().label('Name RU').default('Шрек').messages({
//     'any.required': 'Name RU is required',
//   }),
//   nameEN: Joi.string().label('Name EN').default('Shrek').messages({
//     'any.required': 'Name EN is required',
//   }),
// });

const updateUserSchema = Joi.object({
  email: Joi.string().email().required().label('Email')
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  name: Joi.string().min(2).max(30).label('Name')
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must be at most 30 characters long',
      'any.required': 'Name is required',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email')
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required().label('Password').messages({
    'any.required': 'Password is required',
  }),
});

module.exports = {
  userSchema,
  movieSchema,
  updateUserSchema,
  loginSchema,
};
