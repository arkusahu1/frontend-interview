import React, { useCallback, useEffect, useState } from 'react';
import Comments from './Comments';
import useComments from "../hooks/useComments";
import "./styles.css";

function NestedComments({
  comments
}) {

  const [comment, setComment] = useState();
  const [sortBy, setSortBy] = useState('newest');
  const { 
    comments: commentData,
    addComment,
    editComment,
    deleteComment,
    updateVote,
    sortComment
  } = useComments(comments);

  useEffect(() => {
    sortComment(sortBy);
  }, [sortBy]);

  const onCommentChange = (e) => {
    setComment(e.target.value);
  }

  const onAddComment = useCallback(() => {
    if (comment) {
      addComment(null, comment);
    }
  }, [comment]);

  const onChangeSortBy = (e) => {
    setSortBy(e.target.value);
  }

  return (
    <>
      <div className='comment-input'>
        <textarea
          className='text-area'
          onChange={onCommentChange}
          value={comment}
          placeholder='Add new comment'
        />
        <button className='comment-button' onClick={onAddComment}>Add Comment</button>
      </div>
      <div className='sort-by'>
        Sort By: <select onChange={onChangeSortBy} value={sortBy}>
          <option value={'newest'}>Newest</option>
          <option value={'oldest'}>Oldest</option>
          <option value={'mostvoted'}>Mostvoted</option>
        </select>
      </div>
      {commentData?.map((comment) => {
        return (
          <Comments
            key={comment.id}
            commentId={comment.id}
            content={comment.content}
            vote={comment.vote}
            timestamp={comment.timestamp}
            replies={comment.replies}
            onReply={addComment}
            editComment={editComment}
            onDeleteComment={deleteComment}
            updateVote={updateVote}
          />
        )
      })}
    </>
  )
}

export default NestedComments