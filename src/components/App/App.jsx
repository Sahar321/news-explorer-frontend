/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProtectedRoutes from '../../utils/ProtectedRoutes.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoginState from '../../constants/enums/LoginState';
import './App.css';
import { ENGLISH_MONTHS, CARDS_PAR_PAGE } from '../../constants/constants';
import imageNotAvailable from '../../images/Image_not_available.png';
import Main from '../Main/Main.jsx';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(LoginState.PENDING);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isSearchPreloaderVisible, setSearchPreloaderVisible] = useState(false);
  const [isSearchNotFoundVisible, setIsSearchNotFoundVisible] = useState(false);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [popupWithMessage, setPopupWithMessage] = useState({
    isOpen: false,
    title: '',
  });
  const [hideMobileMenuButton, setHideMobileMenuButton] = useState(false);
  const token = localStorage.getItem('jwt');
  const location = useLocation();
  const showMoreCards = () => {
    if (cards.length > 0) {
      const newCards = cards.splice(0, CARDS_PAR_PAGE);
      console.log('cardsToShow', cardsToShow);
       setCardsToShow((prvCards) => [...prvCards, ...newCards]);
    }
  };
  React.useEffect(() => {
    const { shouldOpenSignInPopup } = location.state || false;
    if (shouldOpenSignInPopup) {
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
      mainApi.getAllArticles().then((res) => {
        setSavedCards(res);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    showMoreCards();
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
        .catch(({ message }) => {
          console.log('getUserInfo', message);
        });
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
        .catch(({ message }) => {
          console.log('getArticles', message);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen || popupWithMessage.isOpen) {
      setHideMobileMenuButton(true);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen, popupWithMessage]);

  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
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

  const handleSignInSubmit = (data) => {
    mainApi
      .signin(data)
      .then((res) => {
        if (res.token) {
          closeAllPopups();
          localStorage.setItem('jwt', res.token);
          setLoggedIn(LoginState.LOGGED_IN);
          console.log('Login Success!', res);
        }
      })
      .catch(({ message }) => {
        console.log('handleSignInSubmit', message);
      });
  };
  const handleSignUpSubmit = (data) => {
    mainApi
      .signup(data)
      .then((res) => {
        if (res._id) {
          closeAllPopups();
          console.log('Register Success!', res);
        }
      })
      .catch(({ message }) => {
        console.log('handleSignInSubmit', message);
      });
  };

  const handleSignOutClick = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setLoggedIn(LoginState.LOGGED_OUT);
  };

  const setCardDateFormat = (dateStr) => {
    if (!dateStr) {
      return '';
    }
    const date = new Date(dateStr);
    return `${
      ENGLISH_MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleCardBookmarkClick = (e) => {
    mainApi.saveArticle(e).then((res) => {
      setSavedCards([...savedCards, res]);
    });
  };
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
       /*  showMoreCards(true); */
        setSearchPreloaderVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowMoreCards = () => {
    showMoreCards();
  };
  const handleCardRemoveClick = (card) => {
    if (card) {
      mainApi.deleteArticle(card._id).then((res) => {
        console.log(savedCards);
        setSavedCards((state) =>
          state.filter((currentCard) => currentCard._id !== res._id)
        );
      });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          OnSignOutClick={handleSignOutClick}
          OnSignInClick={handleSignInClick}
          OnSignUpClick={handleSignUpClick}
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
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
            <Route
              path="/SavedArticles"
              element={
                <SavedArticles
                  onCardRemoveClick={handleCardRemoveClick}
                  savedCards={savedCards}
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
        />
        <SignUpPopup
          onClose={closeAllPopups}
          onSubmit={handleSignUpSubmit}
          title="Sign Up"
          isOpen={isSignUpPopupOpen}
          onSignInPopupClick={handleSignInClick}
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
