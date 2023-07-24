/*eslint-disable*/
import React, { useEffect, useState, useRef,createRef  } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Divider, iconButtonClasses } from '@mui/material';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import ReactionsList from '../ReactionsList/ReactionsList';
import Userbox from '../Userbox/Userbox';
import ReactionStats from '../ReactionStats/ReactionStats';
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
import PopupWithAvatar from '../AvatarPopup/AvatarPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import PopupWithCard from '../PopupWithCard/PopupWithCard.jsx';
import PopupWithReactionsInfo from '../PopupWithInfo/PopupWithInfo.jsx';
///  pages
import Main from '../Main/Main.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import Profile from '../../pages/Profile.jsx';
import { Alert, AlertTitle } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import ChatMessage from '../ChatMessage/ChatMessage';
export default function App() {
  const location = useLocation();
  const token = localStorage.getItem('jwt');
  const [cardComments, setCardComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(LoginState.PENDING);
  const [currentUser, setCurrentUser] = useState(null);
  const [appStyles, setAppStyles] = useState('');
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [bookmarkCards, setBookmarkCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
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
  const [popupWithCard, setPopupWithCard] = useState({
    isOpen: false,
    cardData: '',
  });
  const [isReactionPopupOpen, setIsReactionPopupOpen] = useState(false);
  const [articleReactions, setArticleReactions] = useState([]);
  const [disappearingMessages, setDisappearingMessages] = useState({
    message: '',
    visible: false,
    severity: 'info', // default value
    title: '',
  });
  // Functions
  /// error handling

  const handleMainError = ({ message, type }) => {
    if (type === 'auth') {
      setAuthErrorMessage({ message, visible: true });
      return;
    }
    if (type === 'SERVER_NOT_AVAILABLE') {
      setSearchPreloaderVisible(false);
      setDisappearingMessages({
        message:
          'Server is not available at the moment, please try again later...',
        visible: true,
        severity: 'error',
        title: 'Server Error',
      });

      return;
    }
    console.log(message); //  todo: custom error message
  };

  /// crds

  const [cardSliceNumber, setCardSliceNumber] = useState(0);
  const handleLoadMoreCards = () => {
    const { length } = cards;
    const hasMoreCards = length > 0 && cardSliceNumber < length;
    if (!hasMoreCards) return;
    const newCards = cards.slice(
      cardSliceNumber,
      cardSliceNumber + CARDS_PAR_PAGE
    );
    setCardSliceNumber((prevSliceNumber) => prevSliceNumber + CARDS_PAR_PAGE);
    setCardsToShow((prevCards) => [...prevCards, ...newCards]);
    console.log('load more cards');
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
      ); // getting _id MongoDB
      handleCardRemove(card);
    }
  };

  /// popups
  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
    setPopupWithCard({ isOpen: false, cardData: '' });
    setAuthErrorMessage({ message: '', visible: false });
    setPopupWithMessage({ isOpen: false, title: '' });
    setHideMobileMenuButton(false);
    setIsAvatarPopupOpen(false);
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
    localStorage.removeItem('cards');
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

        setCards(articles);
        localStorage.setItem('cards', JSON.stringify(articles));
        setSearchPreloaderVisible(false);
      })
      .catch((err) => {
        console.log(err);
        handleMainError({ type: 'SERVER_NOT_AVAILABLE' });
      });
  };

  const handleUpdatedCard = (newCard) => {
    // update localStorage
    const localCards = JSON.parse(localStorage.getItem('cards'));
    const updatedLocalCards = localCards.map((currentCard) =>
      currentCard.link === newCard.link ? newCard : currentCard
    );
    localStorage.setItem('cards', JSON.stringify(updatedLocalCards));
    // update cardsToShow
    setCardsToShow((prevCards) =>
      prevCards.map((currentCard) =>
        currentCard.link === newCard.link ? newCard : currentCard
      )
    );
  };

  const handleReactionSelect = (reactionData, cardData) => {
    if (!loggedIn) {
      setSignUpPopupOpen(true);
      return;
    }
    mainApi
      .saveCardReaction(reactionData)
      .then(({ reactionId, isOwner, link }) => {
        const updatedReactions = cardData?.reaction.map((currentCard) => {
          return currentCard.isOwner === isOwner
            ? { reactionId, isOwner, link }
            : currentCard;
        });
        if (updatedReactions.length === 0) {
          updatedReactions.push({ reactionId, isOwner, link });
        }
        cardData.reaction = updatedReactions;

        handleUpdatedCard(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffects
  useEffect(() => {
    disappearingMessages.visible &&
      setTimeout(() => {
        setDisappearingMessages({
          message: '',
          visible: false,
          severity: '',
          title: '',
        });
      }, 5000);
  }, [disappearingMessages]);
  useEffect(() => {
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
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setCardSliceNumber(0);
    handleLoadMoreCards();
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

  window.handleGooogleToken = (token) => {
    console.log('handleGooogleToken', token);
  };

  useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen || popupWithMessage.isOpen) {
      setHideMobileMenuButton(true);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen, popupWithMessage]);
  useEffect(() => {
    if (!savedCards) return;
    let bookmark = [];
    savedCards.forEach((card) => {
      bookmark.push(card.link);
    });
    setBookmarkCards(bookmark);
  }, [savedCards]);
  const googleSigninButton = createRef();
  useEffect(() => {
    const handleCredentialResponse = (credential) => {
      console.log('handleCredentialResponse', credential);
      mainApi
        .signinWithGoogle(credential)
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

    if (window.google) {
      console.log('window.google', window.google);
      window.google.accounts.id.initialize({
        client_id:
          '1026060339727-lamt04gh0s9uqpqklh2mjchcnpsu35g0.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(googleSigninButton.current, {
        theme: 'outline',
        size: 'large',
        click_listener: onClickHandler,
      });

      function onClickHandler() {
        console.log('Sign in with Google button clicked...');
      }
    }
  }, []);

  const handleCardCommentClick = (card) => {
    if (!loggedIn) {
      setSignUpPopupOpen(true);
      return;
    }
    mainApi
      .getAllArticleComments(card.link)
      .then((res) => {
        setCardComments(res);
        setPopupWithCard({ isOpen: true, cardData: card });
      })
      .catch((err) => {
        console.warn('getAllArticlesDate', err);
      });
  };

  const handleCommentSubmit = (commentData) => {
    if (!loggedIn) {
      setSignUpPopupOpen(true);
      return;
    }
    console.log('handleCommentSubmit', commentData);
    mainApi
      .saveComment(commentData)
      .then((res) => {
        console.log('handleCommentSubmit', res);
      })
      .catch((err) => {
        console.log('handleCommentSubmit', err);
      });
  };

  const handlePopupWithReactionClose = () => {
    setIsReactionPopupOpen(false);
  };

  const handleUniqueReactionsClick = ({ link }) => {
    mainApi
      .getAllArticlesReaction(link)
      .then((res) => {
        setArticleReactions(res);
        console.log('handleUniqueReactionsClick', res);
        setIsReactionPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleThankYou = (comment) => {
    mainApi
      .sendThankYouToCommentOwner(comment)
      .then((res) => {
        console.log('handleThankYou', res);
      })
      .catch((err) => {
        console.log('handleThankYou', err);
      });
  };

  const handleAvatarClick = () => {
    setIsAvatarPopupOpen(true);
  };

  const handleAvatarSubmit = (avatar) => {
    setIsAvatarPopupOpen(false);
    mainApi
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('articleReactions', articleReactions);
  }, [articleReactions]);

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
                onShowMoreClick={handleLoadMoreCards}
                isSearchPreloaderVisible={isSearchPreloaderVisible}
                isSearchNotFoundVisible={isSearchNotFoundVisible}
                bookmarkCards={bookmarkCards}
                onReactionSelect={handleReactionSelect}
                onCommentClick={handleCardCommentClick}
                onUniqueReactionsClick={handleUniqueReactionsClick}
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
                  onUniqueReactionsClick={handleUniqueReactionsClick}
                  onReactionSelect={handleReactionSelect}
                />
              }
            />
          </Route>
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
            <Route
              path="/profile"
              element={
                <Profile
                  onAvatarClick={handleAvatarClick}
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
        >
          <div className="button__google-signin" ref={googleSigninButton}></div>
        </SignInPopup>
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
        <Alert
          variant="filled"
          severity={disappearingMessages.severity}
          className={`alert alert_visible_${disappearingMessages.visible}`}
        >
          {disappearingMessages.title && <AlertTitle>Server Error</AlertTitle>}
          {disappearingMessages.message}
        </Alert>

        <PopupWithAvatar
          onClose={closeAllPopups}
          isOpen={isAvatarPopupOpen}
          onSubmit={handleAvatarSubmit}
        />

        <PopupWithCard
          isOpen={popupWithCard.isOpen}
          cardData={popupWithCard.cardData}
          onClose={closeAllPopups}
          onCommentSubmit={handleCommentSubmit}
          comments={cardComments}
          onThankYou={handleThankYou}
        ></PopupWithCard>
        <PopupWithReactionsInfo
          onClose={handlePopupWithReactionClose}
          isOpen={isReactionPopupOpen}
        >
          <div className="popup__container">
            <input type="text" className="popup__reactions-filter-input" />
            <div className="popup__reactions-filter">
              <Button className="popup__reactions-filter-button">All</Button>
              <Button className="popup__reactions-filter-button">LOL</Button>
              <Button className="popup__reactions-filter-button">WOW</Button>
              <Button className="popup__reactions-filter-button">SAD</Button>
              <Button className="popup__reactions-filter-button">SHOCK</Button>
            </div>

            {isReactionPopupOpen &&
              articleReactions?.map((stats, index) => (
                <>
                  <hr />
                  <Userbox
                    key={index}
                    username={stats.name}
                    avatar={stats.avatar || imageNotAvailable}
                  >
                    <ReactionStats stats={stats} />
                  </Userbox>
                </>
              ))}
          </div>
        </PopupWithReactionsInfo>
      </div>
    </CurrentUserContext.Provider>
  );
}
