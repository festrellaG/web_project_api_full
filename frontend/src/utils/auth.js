const BASE_URL = "http://localhost:3000";
//const BASE_URL = "https://api.tripletenfes.nex.sh";
//registro de usuarios
export async function signup(email, password) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("User registered successfully:", data);
  } else {
    throw new Error("400 - one of the fields was filled in incorrectly, ");
  }

  return data;
}

//para loggearte
export async function signin(email, password) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("jwt", data.token);
    console.log("User signed in successfully");
  } else {
    throw new Error(
      "401 - User with the specified email or password could not be found,"
    );
  }

  return Promise.resolve(data);
}

//validación de token
export async function checkToken(token) {
  if (!token) {
    console.error("No token found");
    return false;
  }

  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("Token is valid:", data);
    return data;
  } else {
    throw new Error("400 — Token not provided or provided in incorrect format");
  }
}
