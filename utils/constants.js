const URL_CHECK = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const SERVER_WILL_CRASH = 'Сервер сейчас упадёт';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';

const CONFLICT_ERROR = 'Пользователь с таким email уже зарегистрирован';
const BAD_REQUEST_ERROR = 'Переданы некорректные данные';
const UNAUTHORIZED_ERROR = 'Неправильные почта или пароль';
const USER_NOT_FOUND_ERROR = 'Пользователь не найден';

const BAD_REQUEST_MOVIES_ERROR = 'Переданы некорректные данные при создании фильма';
const BAD_REQUEST_MOVIES_DELETE_ERROR = 'Переданы некорректные данные фильма';
const NOT_FOUND_MOVIE_ERROR = 'Фильм с указанным id не найден';
const FORBIDDEN_MOVIE_ERROR = 'Чужой фильм не может быть удален';
const MOVIE_DELETED = 'Фильм удален';

module.exports = {
  URL_CHECK,
  SERVER_WILL_CRASH,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  USER_NOT_FOUND_ERROR,
  BAD_REQUEST_MOVIES_ERROR,
  BAD_REQUEST_MOVIES_DELETE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  MOVIE_DELETED,
};
