/*eslint-disable*/
import React, { useEffect, useState, useRef, createRef } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import './App.css';

// APIs
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';

// Contexts
import CurrentUserContext from '../../contexts/CurrentUserContext';

// Constants
import LoginState from '../../constants/enums/LoginState';
import { ENGLISH_MONTHS, CARDS_PAR_PAGE } from '../../constants/constants';

// Utils

import frownFaceIcon from '../../images/icons/frown-face.svg';

// Images
import imageNotAvailable from '../../images/Image_not_available.png';

// Components
import ProtectedRoutes from '../ProtectedRoutes.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import UserReactionList from '../UserReactionList/UserReactionList';
import CommentsList from '../CommentsList.jsx';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy.jsx';
import { Button, Divider, iconButtonClasses } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ReactionsList from '../ReactionsList/ReactionsList';
import EditProfileInfoModal from '../EditProfileInfoModal/EditProfileInfoModal';

// Popups Components
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import PopupWithInfo from '../PopupWithInfo/PopupWithInfo.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithAvatar from '../AvatarPopup/AvatarPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import PopupWithCard from '../PopupWithCard/PopupWithCard.jsx';
import PopupWithReactionsInfo from '../PopupWithInfo/PopupWithInfo.jsx';
import jwtDecode from 'jwt-decode';

// Pages
import Main from '../Main/Main.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import useAppStyles from '../../utils/hooks/useAppStyles';
import { Alert, AlertTitle } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import ChatMessage from '../ChatMessage/ChatMessage';
import SocialShareButton from '../SocialShareButton/SocialShareButton';
import useMobileDetect from '../../utils/hooks/useMobileDetect';
import Preloader from '../Preloader/Preloader';

/**
 * The main component of the application, `App`, handles the state and logic of the entire application.
 * It includes various hooks, state variables, and functions to manage user authentication, card data, popups, and API calls.
 *
 * @returns {JSX.Element} The rendered JSX code of the application.
 */
export default function App() {
  // State Declarations
  const location = useLocation();
  const token = localStorage.getItem('jwt');
  const isMobile = useMobileDetect();

  // Authentication State
  const [loggedIn, setLoggedIn] = useState(LoginState.PENDING);
  const [currentUser, setCurrentUser] = useState(null);

  // Styles
  const [appStyles, headerStyles] = useAppStyles();

  // Card State
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [bookmarkCards, setBookmarkCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);

  // Window Scroll State
  const [isWindowScrolled, setIsWindowScrolled] = useState(true);

  // Popup State
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isSearchPreloaderVisible, setSearchPreloaderVisible] = useState(false);
  const [isSearchNotFoundVisible, setIsSearchNotFoundVisible] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  // Mobile Menu Button
  const [hideMobileMenuButton, setHideMobileMenuButton] = useState(false);

  // Other State Variables (Add comments to describe their purpose)
  const [authErrorMessage, setAuthErrorMessage] = useState({
    message: '',
    visible: false,
  });
  const [popupWithPageLoading, setPopupWithPageLoading] = useState({
    isOpen: false,
    title: '',
    text: '',
    showLoader: false,
    showOkButton: false,
    isError: false,
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
    setIsPopupWithCardOpen(false);
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
  const handleSignOut = () => {
    localStorage.removeItem('jwt');

    // localStorage.removeItem('cards');
    setCurrentUser(null);
    setLoggedIn(LoginState.LOGGED_OUT);
    FB.getLoginStatus(({ status }) => {
      if (status === 'connected') {
        FB.logout();
      }
    });
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
    const loadingApp = document.querySelector('.loading-app__container');
    if (loadingApp) {
      loadingApp.style.display = 'none';
    }
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
  const handleCredentialResponse = (googleToken) => {
    setPopupWithPageLoading({
      isOpen: true,
      title: 'Google Signin',
      text: 'Signing you into the website',
      showLoader: true,
      showOkButton: false,
      isError: false,
    });

    mainApi
      .signinWithGoogle(googleToken)
      .then((res) => {
        if (res.token) {
          const { credential } = googleToken;
          const googleUser = jwtDecode(credential);

          closeAllPopups();
          setPopupWithPageLoading({
            isOpen: true,
            title: 'Google Signin',
            text: (
              <>
                <p className="popup__loader-text_type_success">
                  Hello {googleUser.name}
                  <img
                    src={googleUser.picture}
                    alt="google user"
                    className="popup__loader-image"
                  />
                </p>
                <br />
                Sign in with google succeed
              </>
            ),
            showLoader: false,
            showOkButton: true,
            isError: false,
          });
          localStorage.setItem('jwt', res.token);
          setLoggedIn(LoginState.LOGGED_IN);
        }
      })
      .catch((ts) => {
        console.log(ts);

        setPopupWithPageLoading({
          isOpen: true,
          title: 'Google Signin',
          text: `Sign in with google failed. Please try again later...`,
          showOkButton: true,
          showLoader: false,
          isError: true,
        });
      });
  };
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:
        '109257300086-qa4gpb1jcah14ug0g3pfrvllpgm4b95l.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });

    console.log(google.accounts.id);
    google.accounts.id.renderButton(googleSigninButton.current, {
      theme: 'outline',
      size: 'large',
    });
  }, [window.google, loggedIn]);

  const handleCardCommentClick = (card) => {
    showSignUpIfNotLoggedIn();

    mainApi
      .getAllArticleComments(card.link)
      .then((res) => {
        card.comments = res.comments || {};
        card.comments.data = res;
        console.log('handleCardCommentClick', 'empty result');

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
        console.log('handleCommentSubmit', res);
        card.comments = res.comments || {};
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

  const handleProfileEditClick = (data) => {
    setIsEditProfileInfoModalOpen(true);
  };

  useEffect(() => {
    console.log('articleReactions', articleReactions);
  }, [articleReactions]);

  const handleCardShare = async (cardData) => {
    console.log('handleCardShare', cardData);
    isMobile ? handleMobileShareModel() : setIsSharePopupOpen(true);
  };

  const handleMobileShareModel = async () => {
    const shareData = {
      title: 'news-explorer',
      text: selectedCard.title,
      url: selectedCard.link,
    };
    console.log('shareData', shareData);
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('shareDataError', `Error: ${err}`);
    }
  };

  const handleUpdateProfileSubmit = (data) => {
    mainApi
      .updateProfile(data)
      .then((res) => {
        console.log('handleUpdateProfileSubmit', res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleUpdateProfileSubmit', err);
      });
  };

  const handleProfileCommentClick = () => {
    mainApi
      .getAllUserComments()
      .then((res) => {
        console.log('getAllUserComments', res);
        setCurrentUser((props) => ({ ...props, comments: res }));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('getAllUserComments', err);
      });
  };

  useEffect(() => {
    if (!window.FB) return;
    FB.init({
      appId: '259080930351101', // Use your app's ID here
      cookie: true,
      xfbml: true,
      version: 'v17.0',
    });
    FB.Event.subscribe('auth.statusChange', (response) => {
      const { authResponse } = response;

      if (authResponse) {
        mainApi
          .signinWithFacebook(authResponse)
          .then((res) => {
            if (res.token) {
              FB.api(
                '/me?fields=id,name,email,picture.width(320).height(320)',
                function (facebookUser) {
                  setPopupWithPageLoading({
                    isOpen: true,
                    title: 'Facebook Signin',
                    text: (
                      <>
                        <p className="popup__loader-text_type_success">
                          Hello {facebookUser.name}
                          <img
                            src={facebookUser.picture.data.url}
                            alt="facebook user"
                            className="popup__loader-image"
                          />
                        </p>
                        <br />
                        Sign in with facebook succeed
                      </>
                    ),
                    showLoader: false,
                    showOkButton: true,
                    isError: false,
                  });
                  closeAllPopups();

                  localStorage.setItem('jwt', res.token);

                  setLoggedIn(LoginState.LOGGED_IN);
                }
              );
            }
          })
          .catch((err) => {
            console.log('signinWithFacebook', err);
          });
      }
    });
  }, [loggedIn]);

  useEffect(() => {
    const hasPopupOpen =
      isSharePopupOpen ||
      isAvatarPopupOpen ||
      isSignUpPopupOpen ||
      isSignInPopupOpen ||
      isReactionPopupOpen ||
      popupWithPageLoading.isOpen ||
      isPopupWithCardOpen;

    setIsWindowScrolled(hasPopupOpen);
  }, [
    isSharePopupOpen,
    isAvatarPopupOpen,
    isSignUpPopupOpen,
    isSignInPopupOpen,
    isReactionPopupOpen,
    isPopupWithCardOpen,
    popupWithPageLoading.isOpen,
  ]);

  useEffect(() => {
    const body = document.body;
    if (isWindowScrolled) {
      body.classList.add('no-scroll-y');
    } else {
      body.classList.remove('no-scroll-y');
    }

    // Clean up the effect by removing the class when the component unmounts
    return () => {
      body.classList.remove('no-scroll-y');
    };
  }, [isWindowScrolled]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app ${appStyles}`}>
        <Header
          className={headerStyles}
          onSignOut={handleSignOut}
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          loggedIn={loggedIn}
          hideMobileMenuButton={hideMobileMenuButton}
        />

        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
                  onProfileCommentClick={handleProfileCommentClick}
                  onProfileEditClick={handleProfileEditClick}
                  onAvatarClick={handleAvatarClick}
                />
              }
            />
          </Route>
        </Routes>

        <Footer />
        <SignInPopup
          id="signin-popup"
          onClose={closeAllPopups}
          title="Sign In"
          isOpen={isSignInPopupOpen}
          onSubmit={handleSignInSubmit}
          onSignUpPopupClick={handleSignUpClick}
          onError={authErrorMessage}
        >
          <div className="button__google-signin" ref={googleSigninButton}></div>

          <div
            className="fb-login-button button__facebook-signin"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-use-continue-as="true"
          ></div>
        </SignInPopup>
        <SignUpPopup
          id="signup-popup"
          onClose={closeAllPopups}
          onSubmit={handleSignUpSubmit}
          title="Sign Up"
          isOpen={isSignUpPopupOpen}
          onSignInPopupClick={handleSignInClick}
          onError={authErrorMessage}
        />
        <PopupWithMessage
          id="navigate-to-signin-popup"
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

        <PopupWithMessage
          id="page-loading-popup"
          title={popupWithPageLoading.title}
          isCloseButtonVisible={false}
          className={'popup_type_page-loading'}
          closeOnOutsideClick={false}
          onClose={() => {
            setPopupWithPageLoading({
              isOpen: false,
              title: '',
              text: '',
              showLoader: false,
              showOkButton: false,
              isError: false,
            });
          }}
          isOpen={popupWithPageLoading.isOpen}
        >
          <div className="popup__loader">
            {popupWithPageLoading.isError && (
              <img
                src={frownFaceIcon}
                alt="frown face"
                className="popup__loader-image popup__loader-image_type_error"
              />
            )}
            <div
              className={`popup__loader-text ${
                popupWithPageLoading.isError && 'popup__loader-text_type_error'
              }`}
            >
              {popupWithPageLoading.text}
            </div>
            <Preloader isVisible={popupWithPageLoading.showLoader} />

            {popupWithPageLoading.showOkButton && (
              <Button
                style={{ width: '80%', height: 50 }}
                variant="contained"
                color={`${popupWithPageLoading.isError ? 'error' : 'success'}`}
                onClick={() => {
                  setPopupWithPageLoading({
                    isOpen: false,
                    title: '',
                    text: '',
                    showLoader: false,
                    showOkButton: false,
                    isError: false,
                  });
                }}
              >
                OK
              </Button>
            )}
          </div>
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
          id="share-popup"
          onClose={() => {
            setIsSharePopupOpen(false);
          }}
          isOpen={isSharePopupOpen}
        >
          <SocialShareButton />
        </PopupWithInfo>

        <PopupWithCard
          id="card-popup"
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
          id="edit-profile-info-modal"
          isOpen={isEditProfileInfoModalOpen}
          onClose={closeAllPopups}
          currentUser={currentUser}
          onSubmit={handleUpdateProfileSubmit}
        ></EditProfileInfoModal>
        <PopupWithInfo
          id="user-reactions-popup"
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
