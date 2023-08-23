/*eslint-disable*/
import React, { useEffect, useState, useRef, createRef } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Divider, iconButtonClasses } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ReactionsList from '../ReactionsList/ReactionsList';
import Userbox from '../Userbox/Userbox';
import EditProfileInfoModal from '../EditProfileInfoModal/EditProfileInfoModal';
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
import UserReactionList from '../UserReactionList/UserReactionList';
import CommentsList from '../CommentsList.jsx';
///  popups components
import ProfileLayout from '../ProfileLayout';
import PopupWithInfo from '../PopupWithInfo/PopupWithInfo.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithAvatar from '../AvatarPopup/AvatarPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import PopupWithCard from '../PopupWithCard/PopupWithCard.jsx';
import PopupWithReactionsInfo from '../PopupWithInfo/PopupWithInfo.jsx';
///  pages
import Main from '../Main/Main.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';

import { Alert, AlertTitle } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import ChatMessage from '../ChatMessage/ChatMessage';
import SocialShareButton from '../SocialShareButton/SocialShareButton';
import useMobileDetect from '../../utils/hooks/useMobileDetect';
export default function App() {
  const location = useLocation();
  const token = localStorage.getItem('jwt');
  const isMobile = useMobileDetect();
  /*   const [cardComments, setCardComments] = useState([]); */
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
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [hideMobileMenuButton, setHideMobileMenuButton] = useState(false);

  const [authErrorMessage, setAuthErrorMessage] = useState({
    message: '',
    visible: false,
  });
  const [popupWithMessage, setPopupWithMessage] = useState({
    isOpen: false,
    title: '',
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfileInfoModalOpen, setIsEditProfileInfoModalOpen] =
    useState(false);
  const [isPopupWithCardOpen, setIsPopupWithCardOpen] = useState(false);
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
  const showSignUpIfNotLoggedIn = () => {
    if (!loggedIn) {
      setSignUpPopupOpen(true);
      return;
    }
  };

  const handleCardBookmarkClick = (targetCard, isBookmark) => {
    showSignUpIfNotLoggedIn();

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
    setIsPopupWithCardOpen({ isOpen: false, cardData: '' });
    setAuthErrorMessage({ message: '', visible: false });
    setPopupWithMessage({ isOpen: false, title: '' });
    setHideMobileMenuButton(false);
    setIsAvatarPopupOpen(false);
    setIsSharePopupOpen(false);
    setIsEditProfileInfoModalOpen(false);
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
    // localStorage.removeItem('cards');
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
      prevCards.map((currentCard) => {
        return currentCard.link === newCard.link ? newCard : currentCard;
      })
    );
  };

  const handleRemoveReaction = (cardData) => {
    showSignUpIfNotLoggedIn();
    mainApi
      .removeCardReaction(cardData.link)
      .then((res) => {
        cardData.reactions = res;
        handleUpdatedCard(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReactionSelect = (reactionData, cardData) => {
    showSignUpIfNotLoggedIn();
    mainApi
      .saveCardReaction(reactionData)
      .then((prop) => {
        /*         const { reactionId, isOwner, link } = prop;
        const updatedReactions = cardData?.reaction.map((currentCard) => {
          return currentCard.isOwner === isOwner
            ? { reactionId, isOwner, link }
            : currentCard;
        });
        if (updatedReactions.length > 0) {
          updatedReactions.push({ reactionId, isOwner, link });
        }
        cardData.reaction = updatedReactions; */

        cardData.reactions = prop;

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
    showSignUpIfNotLoggedIn();

    mainApi
      .getAllArticleComments(card.link)
      .then((res) => {
        console.log('getAllArticleComments', card);
        card.comments.data = res;
        setSelectedCard(card);
        setIsPopupWithCardOpen(true);
      })
      .catch((err) => {
        console.warn('getAllArticlesDate', err);
      });
  };

  const handleCommentSubmit = (card, commentData) => {
    /*  showSignUpIfNotLoggedIn(); */
    console.log('handleCommentSubmit', commentData);
    mainApi
      .saveComment(commentData)
      .then((res) => {
        card.comments.data = res;
        card.comments.count = res.length;
        handleUpdatedCard(card);
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
      .updateProfileInfo(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleProfileEditClick = (data) => {
    setIsEditProfileInfoModalOpen(true);

  }

  useEffect(() => {
    console.log('articleReactions', articleReactions);
  }, [articleReactions]);

  const handleCardShare = async (cardData) => {
    console.log('handleCardShare', cardData);
    isMobile ? handleMobileShareModel() : setIsSharePopupOpen(true);
  };

  const handleMobileShareModel = async () => {
    const shareData = {
      title: 'MDN',
      text: 'Learn web development on MDN!',
      url: 'https://developer.mozilla.org',
    };
    console.log('shareData', shareData);
    try {
      await navigator.share(shareData);
      console.log('shareData', 'MDN shared successfully');
    } catch (err) {
      console.log('shareDataError', `Error: ${err}`);
    }
  };

const handleProfileEditSubmit = (data) => {
  mainApi.updateProfileInfo
}


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
                onRemoveReaction={handleRemoveReaction}
                onCardShare={handleCardShare}
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
                  onCardShare={handleCardShare}
                  onCommentClick={handleCardCommentClick}
                  savedCards={savedCards}
                  setAppStyles={setAppStyles}
                  onUniqueReactionsClick={handleUniqueReactionsClick}
                  onReactionSelect={handleReactionSelect}
                  onRemoveReaction={handleRemoveReaction}
                />
              }
            />
          </Route>
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
            <Route
              path="/profile/*"
              element={
                <ProfileLayout
                onProfileEdit={handleProfileEditClick}
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

        <PopupWithInfo
          onClose={() => {
            setIsSharePopupOpen(false);
          }}
          isOpen={isSharePopupOpen}
        >
          <SocialShareButton />
        </PopupWithInfo>

        <PopupWithAvatar
          onClose={closeAllPopups}
          isOpen={isAvatarPopupOpen}
          onSubmit={handleAvatarSubmit}
        />

        <PopupWithCard
          isOpen={isPopupWithCardOpen}
          cardData={selectedCard}
          loggedIn={loggedIn}
          onClose={closeAllPopups}
          onCommentSubmit={handleCommentSubmit}
          /*       comments={cardComments} */
          onThankYou={handleThankYou}
          onUniqueReactionsClick={handleUniqueReactionsClick}
          onReactionSelect={handleReactionSelect}
          onRemoveReaction={handleRemoveReaction}
          onCardBookmarkClick={handleCardBookmarkClick}
          onCardRemoveClick={handleCardRemove}
          bookmarkCards={bookmarkCards}
          onCardShare={handleCardShare}
        ></PopupWithCard>
        <EditProfileInfoModal
          isOpen={isEditProfileInfoModalOpen}
          onClose={closeAllPopups}
          currentUser={currentUser}
          onSubmit={handleProfileEditClick}

        ></EditProfileInfoModal>
        <PopupWithInfo
          title="Reactions"
          onClose={handlePopupWithReactionClose}
          isOpen={isReactionPopupOpen}
          containerType="popup_type_user-reactions"
        >
          <UserReactionList data={articleReactions} />
        </PopupWithInfo>
      </div>
    </CurrentUserContext.Provider>
  );
}
