import React, { useEffect, useState, memo } from 'react';
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import "./styles.css";

function Comments({
  commentId,
  content,
  vote,
  timestamp,
  replies,
  onReply,
  editComment,
  onDeleteComment,
  updateVote
}) {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(content);

  const onCommentChange = (e) => {
    setReplyContent(e.target.value);
  }

  useEffect(() => {
    if (editMode) {
      setEditText(content);
    } else {
      setEditText("");
    }
  }, [editMode]);

  const onEdit = () => {
    setEditMode(true);
  }

  const onReplyClick = () => {
    setExpand(prev => !prev);
  }

  const onDelete = () => {
    onDeleteComment(commentId);
  }

  const onAddReply = () =>{
    if (replyContent) {
      if(commentId) {
        onReply(commentId, replyContent);
      } else {
        onReply(null, replyContent);
      }
      setReplyContent("");
    }
  }

  const onEditChange = (e) => {
    setEditText(e.target.value);
  }

  const onEditCancel = (e) => {
    setEditMode(false);
  }

  const onEditSubmit = (e) => {
    if (editText) {
      editComment(commentId, editText);
      setEditMode(false);
    }
  }

  const onUpVote = () => {
    debugger
    updateVote(commentId, vote + 1);
  }

  const onDownVote = () => {
    if (vote) {
      debugger
      updateVote(commentId, vote - 1);
    }
  }

  return (
    <div className='comment-container'>
      <div className='comment-body'>
        <div>{content}</div>
        <div>Vote: {vote}</div>
        <div>{new Date(timestamp).toLocaleString()}</div>
      </div>
       {editMode && <div className='comment-input'>
           <textarea
            className='text-area'
            onChange={onEditChange}
            value={editText}
          />
          <button className='comment-button' onClick={onEditCancel}>Cancel</button>
          <button className='comment-button' onClick={onEditSubmit}>Submit</button>
        </div>}
      <div className='button-container'>
        <button className='comment-button' onClick={onUpVote}><AiFillLike /></button>
        <button className='comment-button' onClick={onDownVote}><AiFillDislike /></button>
        <button className='comment-button' onClick={onEdit}>Edit</button>
        <button className='comment-button' onClick={onReplyClick}>{expand ? 'Hide Reply' : 'Reply' }</button>
        <button className='comment-button' onClick={onDelete}>Delete</button>
      </div>
      {expand && (<>
       <div className='comment-input'>
           <textarea
            className='text-area'
            placeholder='Reply....'
            onChange={onCommentChange}
            value={replyContent}
          />
          <button className='comment-button' onClick={onAddReply}>Add Reply</button>
        </div>
        {replies?.length > 0 && replies?.map((comment) => (
          <Comments
            key={comment.id}
            commentId={comment.id}
            content={comment.content}
            vote={comment.vote}
            timestamp={comment.timestamp}
            replies={comment.replies}
            onReply={onReply}
            editComment={editComment}
            onDeleteComment={onDeleteComment}
            updateVote={updateVote}
          />
        ))}
      </>)}
    </div>
  )
}

export default memo(Comments);