import React, { useState } from 'react';
import '../App.css';

export default function VirtualizedList({
  list,
	height,
	width,
	itemHeight
}) {
	const [indices, setIndices] = useState([0, Math.floor(height/itemHeight)]);
	const visibleList = list.slice(indices[0], indices[1]+1);

	const handleScroll = (e) => {
		const { scrollTop } = e.target;

		const startIndex = Math.floor(scrollTop/itemHeight);
		const endIndex = startIndex + Math.floor(height/itemHeight);
		setIndices([startIndex, endIndex])
	}

  return (
    <div
			className="container"
			style={{ height, width}}
			onScroll={handleScroll}
		>

		<div className="container__item-list" style={{ height: list.length*itemHeight }}>
			{visibleList.map((item, indx) => (
				<div
					style={{ height: itemHeight, top: (indices[0] + indx)*itemHeight }}
					key={item}
					className="container__item-list--item"
				>
					Item: {item}
				</div>
			))}
		</div>

    </div>
  )
}
