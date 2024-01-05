// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onClickingLike, deleteComment} = props
  const {name, comment, id, isLiked, initialClassName, date} = commentDetails
  const initial = name.slice(0, 1).toUpperCase()
  const time = formatDistanceToNow(date)

  const onLikingComment = () => {
    onClickingLike(id)
  }

  const onDeletingComment = () => {
    deleteComment(id)
  }

  // Updating Like image based on User interaction
  const commentLiked = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeColor = isLiked ? 'liked' : 'not-liked'

  return (
    <li className="list-container">
      <div className="user-profile-container">
        <div className={`profile-initial ${initialClassName}`}>{initial}</div>
        <p className="username">{name}</p>
        <p>{time}</p>
      </div>
      <p>{comment}</p>
      <div className="like-delete-container">
        <button
          type="button"
          className={`like-btn ${likeColor}`}
          onClick={onLikingComment}
        >
          <img src={commentLiked} alt="like" className="like-img" />
          LIKE
        </button>
        <button
          type="button"
          data-testid="delete"
          className="delete-btn"
          onClick={onDeletingComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
