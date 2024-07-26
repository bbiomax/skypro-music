const apiUrl = "https://webdev-music-003b5b991590.herokuapp.com";

type AuthSignUpProp = {
  username: string;
  password: string;
  email: string;
};

export const authSignUp = (user: AuthSignUpProp) => {
  return fetch(apiUrl + "/user/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("Ошибка регистрации");
    }
    if (!res.ok) {
      throw new Error("Ошибка сервера. Попробуйте позже");
    }
    return res.json();
  });
};

export const authSignIn = (user: Omit<AuthSignUpProp, "username">) => {
  return fetch(apiUrl + "/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    if (!res.ok) {
      throw new Error("Ошибка сервера. Попробуйте позже");
    }
    return res.json();
  });
};
