class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  handlePromise(res) {
    if (res.ok) {
      let json = res.json();
      return json;
    }
    // si el servidor devuelve un error, rechaza el promise
    return Promise.reject(`Error: ${res.status}`);
  }

  getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  /* obtiene las cartas de la API */
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.getHeaders(),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Obtiene la información del perfil de la API */
  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Modifica la información del perfil de la API */
  editProfile(profile) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: profile.name,
        about: profile.about,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Agrega cartas */
  addCards(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Elimina cartas */
  removeCards(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Cambia el estado de los likes de la tarjeta */
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

  /* Agrega likes */
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.getHeaders(),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Elimina likes */
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Modifica el avatar */
  editProfileAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }
}

const api = new Api({
  baseUrl: "https://api.tripletenfes.nex.sh",
});

export default api;
