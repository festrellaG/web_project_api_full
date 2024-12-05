import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { FallingLines } from "react-loader-spinner";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { checkToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function reviewToken() {
      const tokenLs = localStorage.getItem("jwt");
      if (tokenLs) {
        const response = await checkToken(tokenLs);
        if (response.name) {
          setToken(tokenLs);
          setLoggedIn(true);
          navigate("/main");
        } else {
          return;
        }
      }
    }
    reviewToken();
  }, [navigate, isLoggedIn, token]);

  useEffect(() => {
    async function getCards() {
      const response = await api.getInitialCards();
      setCards(response);
    }
    if (isLoggedIn) {
      getCards();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function getUserInfo() {
      const response = await api.getProfileInfo();
      console.log("setCurrentUser", response);
      setCurrentUser(response);
    }
    if (isLoggedIn) {
      getUserInfo();
    }
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  function handleUpdateUser(userData) {
    setLoading(true);

    api
      .editProfile(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setLoading(true);

    api
      .editProfileAvatar(link)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleConfirmPopupClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .removeCards(card.card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card.card._id));
        closeAllPopups();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleAddPlace(data) {
    setLoading(true);

    api
      .addCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLoggin() {
    setLoggedIn(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {loading && (
          <div className="popup__spinner-overlay">
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        )}
        <Header
          onLogout={() => {
            setCurrentUser({});
          }}
        />
        <Routes>
          <Route path="/" element={<Login handleLoggin={handleLoggin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/main"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
          >
            <Route
              path="/main"
              element={
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onConfirmPopupClick={handleConfirmPopupClick}
                  /*onCardDelete={handleCardDelete}*/
                />
              }
            />
          </Route>
        </Routes>

        <Footer />
        <PopupWithConfirmation
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          link={selectedCard.link}
          title={selectedCard.name}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
