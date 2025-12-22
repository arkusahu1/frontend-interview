import React, { useRef, useEffect } from 'react';
import './styles.css';

function SuggestionList({
	suggestions,
	onSuggetionClick,
	dataKey,
	highlight,
	activeIndex
}) {
	const itemRefs = useRef([]);
	useEffect(() => {
		const el = itemRefs.current[activeIndex];
		if (el) {
			el.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		}
	}, [activeIndex]);
	
	const escapeRegExp = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	const getHighlightedText = (text, highlight) => {
		if (!highlight) return [text];
		const safeHighlight = escapeRegExp(highlight);
		const parts = text.split(new RegExp(`(${safeHighlight})`, "gi"))

		return (
			<span>
				{parts.map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? <b key={index}>{part}</b> : part)}
			</span>
		);
	}

  return (
    <>
			{suggestions?.map((item, index) => {
					const currentSuggestion = dataKey ? item[dataKey] : item;
					return (
						<li
							aria-selected={activeIndex === index}
							ref={(el) => (itemRefs.current[index] = el)}
							id={`option-${index}`}
							role="option"
							key={index}
							className={index === activeIndex ? 'suggestion-item active' : 'suggestion-item'}
							onClick={() => onSuggetionClick(item)}
						>
							{getHighlightedText(currentSuggestion, highlight)}
						</li>
					)

			})}
    </>
  )
}

export default SuggestionList