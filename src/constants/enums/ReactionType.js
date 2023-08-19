import likeIcon from '../../images/icons/reactions/popup/like.png';
import lolIcon from '../../images/icons/reactions/popup/lol.png';
import loveIcon from '../../images/icons/reactions/popup/love.png';
import sadIcon from '../../images/icons/reactions/popup/sad.png';
import wowIcon from '../../images/icons/reactions/popup/wow.png';
// implement
const ReactionType = {
  LOL: lolIcon,
  WOW: wowIcon,
  LIKE: likeIcon,
  SAD: sadIcon,
  LOVE: loveIcon,
};
Object.freeze(ReactionType);

export default ReactionType;
