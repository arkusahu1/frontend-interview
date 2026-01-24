import React, { useRef, useEffect, useState } from 'react';
import "./styles.css"
import SuggestionList from './SuggestionList';
// import debounce from 'loadsh/debounce';

function Autocomplete({
    placeholder,
    fetchSuggetions,
    dataKey,
    customLoading,
    onSelect,
    onBlur,
    onFocus,
    onChange,
    customStyles
}) {
	const [inputValue, setInputValue] = useState("");
	const [suggestion, setSuggestion] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [cachedData, setCachedData] = useState({});
	const [activeIndex, setActiveIndex] = useState(-1);

	const fetchRecipes = async (inpVal) => {
		setError(null);
		setLoading(true);
		try {
			if (cachedData[inpVal]) {
				setSuggestion(cachedData[inpVal]);
				return;
			}
			const data = await fetchSuggetions(inpVal);
			setSuggestion(data);
			setCachedData((prev) => ({ ...prev, [inpVal]: data }));
		} catch (e) {
			setError("Fail to fetch suggestion");
			setSuggestion([]);
		}
		finally {
			setLoading(false);
		}
	}


	useEffect(() => {
		let timer;
		if (inputValue) {
			timer = setTimeout(() => {
				fetchRecipes(inputValue);
			}, 300);
		} else {
			setSuggestion([]);
		}
		return () => {
			clearTimeout(timer);
		}
	}, [inputValue]);

	/*
		if we simple use debounce with useCallback
		then it leads to the stale async call issue

		Timeline of the bug
		1. User types "sa" → debouncedFetch("sa") scheduled
		2. User quickly clears input → inputValue === ""
		3. setSuggestion([]) runs
		4. BUT the earlier debounced call still fires
		5.API returns → setSuggestion(data) runs
		this can be fixed with below implementation

	*/

	// Below step can also be used for debounce
	// const debouncedFetch = useRef(
  // debounce((value) => {
  //  		fetchRecipes(value);
	// 	}, 300)
	// ).current;

	// useEffect(() => {
	// 	if (inputValue) {
	// 			debouncedFetch(inputValue);
	// 	} else {
	// 		debouncedFetch.cancel();
	// 		setSuggestion([]);
	// 	}
	// 	return () => {
	// 		debouncedFetch.cancel();
	// 	}
	// }, [inputValue]);

	const handleChange = (evt) => {
		setInputValue(evt.target.value);
		onChange(evt.target.value);
	}

	const handelSuggetionClick = (val) => {
		setInputValue(dataKey ? val[dataKey] : val);
		onSelect(val);
		setSuggestion([]);
	}

	const handleKeyDown = (e) => {
		if (!suggestion.length) return;

		switch (e.key) {
			case 'ArrowDown':
			e.preventDefault();
			setActiveIndex((prev) =>
				prev < suggestion.length - 1 ? prev + 1 : 0
			);
			break;

			case 'ArrowUp':
			e.preventDefault();
			setActiveIndex((prev) =>
				prev > 0 ? prev - 1 : suggestion.length - 1
			);
			break;

			case 'Enter':
			if (activeIndex >= 0) {
						handelSuggetionClick(suggestion[activeIndex])
			}
			break;

			case 'Escape':
			setActiveIndex(-1);
			break;
		}
	};
    
  return (
    <div className='container'>
			<input
				type='text'
				value={inputValue}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={onBlur}
				onFocus={onFocus}
				style={customStyles}
				onKeyDown={handleKeyDown}
				aria-autocomplete="list"
				aria-expanded={suggestion.length > 0}
				aria-activedescendant={
					activeIndex >= 0 ? `option-${activeIndex}` : undefined
				}
			/>
			{(suggestion.length > 0 || loading || error) && <ul role='listbox' className='suggestion-list'>
				{loading && <div className='loading'>{customLoading}</div>}
				{error && <div className='error'>{error.message}</div>}
				<SuggestionList
					suggestions={suggestion}
					dataKey={dataKey}
					highlight={inputValue}
					onSuggetionClick={handelSuggetionClick}
					activeIndex={activeIndex}				
				/>
			</ul>}
    </div>
  )
}

export default Autocomplete