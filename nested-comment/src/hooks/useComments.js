import { useState, useEffect, useCallback } from "react";


const useComments = (initialComment) => {
  const [comments, setComments] = useState(initialComment);

	const getNewReply = (tree, commentId, newComment) => {
		return tree.map((item) => {
			if (item.id === commentId) {
				return {
					...item,
					replies: [newComment, ...item.replies]
				}
			} else if (item?.replies?.length > 0) {
				return {
					...item,
					replies: getNewReply(item.replies, commentId, newComment)
				}
			}
			return item;
		});
	}

	const getNewEdit = (tree, commentId, newComment) => {
		debugger
		return tree.map((item) => {
			if (item.id === commentId) {
				return {
					...item,
					...newComment
				}
			} else if (item?.replies?.length > 0) {
				return {
					...item,
					replies: getNewEdit(item.replies, commentId, newComment)
				}
			}
			return item;
		});
	}

	const getCommentAfterDelete = (tree, commentId) => {
		return tree.reduce((acc, item) => {
			if (item.id === commentId) {
				return acc;
			} else if (item?.replies?.length > 0) {
				item.replies = getCommentAfterDelete(item.replies, commentId);
			}
			return [...acc, item];
		}, []);
	}

	const addComment = useCallback((commentId, content) => {
		const newComment = {
			id: Date.now(),
			content,
			vote: 0,
			timestamp: new Date().toISOString(),
			replies: []
		}

		if (commentId) {
			setComments(prev => getNewReply(prev, commentId, newComment));
		} else {
			setComments(prev => [newComment, ...prev]);
		}

	}, []);

	const editComment = useCallback((commentId, content) => {
		const newComment = {
			timestamp: new Date().toISOString(),
			content
		}
		setComments(prev => getNewEdit(prev, commentId, newComment));
	}, []);

	const deleteComment = useCallback((commentId) => {
		setComments(prev => getCommentAfterDelete(prev, commentId));
	}, []);

	const updateVote = useCallback((commentId, vote) => {
		const newComment = {
			timestamp: new Date().toISOString(),
			vote
		}
		setComments(prev => getNewEdit(prev, commentId, newComment));
	}, []);

	const getSortFn = (sortByKey) => {
		switch (sortByKey) {
			case 'oldest':
				return (a, b) => new Date(a.timestamp) - new Date(b.timestamp);
			case 'mostvoted':
				return (a, b) => b.vote - a.vote;
			default:
				return (a, b) => new Date(b.timestamp) - new Date(a.timestamp); // newest
		}
	}

	const sortCommentOrder = (tree = [], sortByKey) => {
		return tree.map(item => ({
      ...item,
      replies: sortCommentOrder(item.replies, sortByKey)
    })).sort(getSortFn(sortByKey));
	}

	const sortComment = useCallback((sortByKey) => {
		setComments(prev => sortCommentOrder(prev, sortByKey));
	}, []);

	return {
		comments: comments || [],
		addComment,
		editComment,
		deleteComment,
		updateVote,
		sortComment
	}
}

export default useComments;