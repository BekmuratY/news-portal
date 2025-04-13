import React from 'react';
import CommentForm from './CommentForm';
import './CommentItem.css';

const CommentItem = ({
  comment,
  level,
  onReply,
  onEdit,
  onDelete,
  isReplying,
  isEditing,
  onSubmit
}) => {
  return (
    <div className="comment-item" style={{ marginLeft: level * 20 }}>
      <div className="comment-meta">
        <strong>{comment.name}</strong> — {comment.date}
      </div>
      <div className="comment-text">{comment.text}</div>

      <div className="comment-actions">
        <button onClick={() => onReply(comment.id)}>Ответить</button>
        <button onClick={() => onEdit(comment)}>Редактировать</button>
        <button onClick={() => onDelete(comment.id)}>Удалить</button>
      </div>

      {isReplying && (
        <CommentForm
          key={`reply-${comment.id}`}
          onSubmit={onSubmit}
          parentId={comment.id}
        />
      )}

      {isEditing && (
        <CommentForm
          key={`edit-${comment.id}`}
          initialData={comment}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default CommentItem;
