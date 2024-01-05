import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
const initialCommentsList = []

class Comments extends Component {
  state = {commentsList: initialCommentsList, name: '', comment: '', count: 0}

  onChangingName = event => {
    this.setState({name: event.target.value})
  }

  onChangingComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault() // To prevent the default behavior of form when submitted
    const {name, comment} = this.state
    const initialBackgroundColorClassNames =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    // initialContainerBackgroundClassNames[ random index ] will give the value at that corresponding index
    // Finally the value at the corresponding index will be assigned to the initialBackgroundColorClassName

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColorClassNames,
    }
    // Creating an object using appropriate values to the keys of an object newComment.

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment], // Using spread operator setting state variable commentLists
      name: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  // Displaying like based on the respective id
  onClickingLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  // Deleting comment based on the respective id and also updating the count of comments
  deleteComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState(prevState => ({
      commentsList: filteredList,
      count: prevState.count - 1,
    }))
  }

  render() {
    const {commentsList, count, comment, name} = this.state
    return (
      <div className="bg">
        <div className="card-container">
          <h1 className="heading">Comments</h1>
          <div className="content-container">
            <form onSubmit={this.onAddComment}>
              <p>Say something about 4.0 technologies</p>
              <input
                placeholder="Your Name"
                onChange={this.onChangingName}
                value={name}
              />
              <br />
              <textarea
                placeholder="Your Comment"
                onChange={this.onChangingComment}
                value={comment}
                className="textarea-input"
                cols="18"
                rows="5"
              />
              <div>
                <button type="submit">Add Comment</button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="img-style"
            />
          </div>
          <hr className="hr-line" />
          <div className="comments-container">
            <p className="count">{count}</p>
            <p className="comments-text">Comments</p>
          </div>
          <ul className="comments-section">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                onClickingLike={this.onClickingLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
