/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';
// apis
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
// contexts
import CurrentUserContext from '../../contexts/CurrentUserContext';
// constants
import LoginState from '../../constants/enums/LoginState';
import { ENGLISH_MONTHS, CARDS_PAR_PAGE } from '../../constants/constants';
// utils
import ProtectedRoutes from '../../utils/ProtectedRoutes.jsx';
// images
import imageNotAvailable from '../../images/Image_not_available.png';
// components
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
///  popups components
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
///  pages
import Main from '../Main/Main.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem('jwt');

  const [loggedIn, setLoggedIn] = useState(LoginState.PENDING);
  const [currentUser, setCurrentUser] = useState(null);
  const [appStyles, setAppStyles] = useState('');
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [bookmarkCards, setBookmarkCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isSearchPreloaderVisible, setSearchPreloaderVisible] = useState(false);
  const [isSearchNotFoundVisible, setIsSearchNotFoundVisible] = useState(false);
  const [hideMobileMenuButton, setHideMobileMenuButton] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState({
    message: '',
    visible: false,
  });
  const [popupWithMessage, setPopupWithMessage] = useState({
    isOpen: false,
    title: '',
  });
  // Functions
  /// error handling
  const handleMainError = ({ message, type }) => {
    if (type === 'auth') {
      setAuthErrorMessage({ message, visible: true });
      return;
    }

    console.log(message); //  todo: custom error message
  };

  /// cards
  const handleShowMoreCards = () => {
    if (cards.length > 0) {
      const newCards = cards.splice(0, CARDS_PAR_PAGE);
      setCardsToShow((prvCards) => [...prvCards, ...newCards]);
    }
  };
  const handleCardRemove = ({ _id }) => {
    if (_id) {
      mainApi
        .deleteArticle(_id)
        .then((res) => {
          setSavedCards((state) =>
            state.filter((currentCard) => currentCard._id !== res._id)
          );
        })
        .catch(handleMainError);
    }
  };

  const handleSaveCard = (card) => {
    mainApi
      .saveArticle(card)
      .then((res) => {
        setBookmarkCards((book) => [...book, res.link]);
        setSavedCards([...savedCards, res]);
      })
      .catch(handleMainError);
  };

  const handleCardBookmarkClick = (targetCard, isBookmark) => {
    if (!loggedIn) {
      setSignUpPopupOpen(true);
      return;
    }
    if (!isBookmark) {
      handleSaveCard(targetCard);
    } else {
      const card = savedCards.find(
        (cardData) => cardData.link === targetCard.link
      );
      handleCardRemove(card);
    }
  };

  /// popups
  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
    setAuthErrorMessage({ message: '', visible: false });
    setPopupWithMessage({ isOpen: false, title: '' });
    setHideMobileMenuButton(false);
  };
  const handleSignInClick = () => {
    closeAllPopups();
    setSignInPopupOpen(true);
  };
  const handleSignUpClick = () => {
    closeAllPopups();
    setSignUpPopupOpen(true);
  };

  /// auth
  const handleSignInSubmit = (data) => {
    mainApi
      .signin(data)
      .then((res) => {
        if (res.token) {
          closeAllPopups();
          localStorage.setItem('jwt', res.token);
          setLoggedIn(LoginState.LOGGED_IN);
        }
      })
      .catch(({ message }) => {
        handleMainError({ message, type: 'auth' });
      });
  };
  const handleSignUpSubmit = (data) => {
    mainApi
      .signup(data)
      .then((res) => {
        if (res._id) {
          closeAllPopups();
          setPopupWithMessage({ isOpen: true, title: 'Register Success!' });
        }
      })
      .catch(({ message }) => {
        handleMainError({ message, type: 'auth' });
      });
  };
  const handleSignOutClick = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setLoggedIn(LoginState.LOGGED_OUT);
  };

  /// search
  const handleSearchSubmit = (searchInput) => {
    setSearchPreloaderVisible(true);
    setIsSearchNotFoundVisible(false);
    setCards([]);
    setCardsToShow([]);
    localStorage.removeItem('cards');
    newsApi
      .everything(searchInput)
      .then(({ articles, status }) => {
        if (status !== 'ok') {
          throw new Error('NewsApi Error');
        }
        if (articles.length === 0) {
          setSearchPreloaderVisible(false);
          setIsSearchNotFoundVisible(true);
          return;
        }
        const cardListData = [];
        articles.forEach((element) => {
          cardListData.push({
            keyword: searchInput,
            title: element.title,
            text: element.description,
            date: setCardDateFormat(element.publishedAt),
            source: element.source?.name,
            link: element.url,
            image: element.urlToImage || imageNotAvailable,
          });
        });
        setCards(cardListData);
        localStorage.setItem('cards', JSON.stringify(cardListData));
        setSearchPreloaderVisible(false);
      })
      .catch(handleMainError);
  };

  const setCardDateFormat = (dateStr) => {
    if (!dateStr) {
      return '';
    }
    const date = new Date(dateStr);
    const result = `${
      ENGLISH_MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    return result;
  };

  // useEffects
  React.useEffect(() => {
    const { shouldOpenSignInPopup, shouldOpenSignUpPopup } =
      location.state || false;
    if (shouldOpenSignInPopup) {
      setSignInPopupOpen(true);
    }
    if (shouldOpenSignUpPopup) {
      setSignUpPopupOpen(true);
    }
    window.history.replaceState({}, document.title);
  }, [location]);

  useEffect(() => {
    const cardsStorage = JSON.parse(localStorage.getItem('cards'));
    if (cards && cardsStorage) {
      setCards(cardsStorage);
    }
  }, []);
  useEffect(() => {
    if (loggedIn === LoginState.LOGGED_IN) {
      mainApi
        .getAllArticles()
        .then((res) => {
          setSavedCards(res);
        })
        .catch(handleMainError);
    }
  }, [loggedIn]);

  useEffect(() => {
    handleShowMoreCards();
  }, [cards]);

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
            setLoggedIn(LoginState.LOGGED_IN);
          }
        })
        .catch(handleMainError);
    } else {
      setLoggedIn(LoginState.LOGGED_OUT);
    }
  }, [token]);

  useEffect(() => {
    if (loggedIn === LoginState.LOGGED_IN) {
      mainApi
        .getAllArticles(token)
        .then((res) => {
          if (res) {
            setSavedCards(res);
          }
        })
        .catch(handleMainError);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen || popupWithMessage.isOpen) {
      setHideMobileMenuButton(true);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen, popupWithMessage]);
  useEffect(() => {
    let bookmark = [];
    savedCards.forEach((card) => {
      bookmark.push(card.link);
    });
    setBookmarkCards(bookmark);
  }, [savedCards]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app ${appStyles}`}>
        <Header
          onSignOutClick={handleSignOutClick}
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          loggedIn={loggedIn}
          hideMobileMenuButton={hideMobileMenuButton}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onCardBookmarkClick={handleCardBookmarkClick}
                loggedIn={loggedIn}
                onSearchSubmit={handleSearchSubmit}
                cardsToShow={cardsToShow}
                cards={cards}
                onShowMoreClick={handleShowMoreCards}
                isSearchPreloaderVisible={isSearchPreloaderVisible}
                isSearchNotFoundVisible={isSearchNotFoundVisible}
                bookmarkCards={bookmarkCards}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Navigate to="/" state={{ shouldOpenSignInPopup: true }} />
            }
          />
          <Route
            path="/signup"
            element={
              <Navigate to="/" state={{ shouldOpenSignUpPopup: true }} />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
            <Route
              path="/SavedArticles"
              element={
                <SavedArticles
                  onCardRemoveClick={handleCardRemove}
                  savedCards={savedCards}
                  setAppStyles={setAppStyles}
                />
              }
            />
          </Route>
        </Routes>

        <Footer />
        <SignInPopup
          onClose={closeAllPopups}
          title="Sign In"
          isOpen={isSignInPopupOpen}
          onSubmit={handleSignInSubmit}
          onSignUpPopupClick={handleSignUpClick}
          onError={authErrorMessage}
        />
        <SignUpPopup
          onClose={closeAllPopups}
          onSubmit={handleSignUpSubmit}
          title="Sign Up"
          isOpen={isSignUpPopupOpen}
          onSignInPopupClick={handleSignInClick}
          onError={authErrorMessage}
        />
        <PopupWithMessage
          title={popupWithMessage.title}
          onClose={closeAllPopups}
          isOpen={popupWithMessage.isOpen}
        >
          <Link
            onClick={handleSignInClick}
            className="popup__link popup__link_type_message"
          >
            Sign in
          </Link>
        </PopupWithMessage>
      </div>
    </CurrentUserContext.Provider>
  );
}
