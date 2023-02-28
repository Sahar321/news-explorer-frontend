import likeIcon from '../../images/icons/reactions/popup/like.svg';
import lolIcon from '../../images/icons/reactions/popup/lol.svg';
import loveIcon from '../../images/icons/reactions/popup/love.svg';
import sadIcon from '../../images/icons/reactions/popup/sad.svg';
import wowIcon from '../../images/icons/reactions/popup/wow.svg';

const ReactionType = {
  LOL: lolIcon,
  WOW: wowIcon,
  LIKE: likeIcon,
  SAD: sadIcon,
  LOVE: loveIcon,
};
Object.freeze(ReactionType);

export default ReactionType;
