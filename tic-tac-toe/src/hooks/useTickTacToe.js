import { useState } from "react";

const WINING_PATTARN = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

const useTickTacToe = (size) => {
  const [board, setBoard] = useState(new Array(size*size).fill(null));
  const [isNext, setIsNext] = useState(true);

    const winningPatternList = () => {

			const patterns = [];
			const diag1 = [];
			const diag2 = [];

			for (let row = 0; row < size; row++) {
				const rows = [];
				const cols = [];
				for (let col = 0; col<size; col++) {
					rows.push(row*size+col)
					cols.push(col*size+row)
				}
				diag1.push(row*size+row)
				diag2.push(row*size+(size-row-1))
				patterns.push(rows, cols);
			}
			patterns.push(diag1, diag2);

			return patterns;
		}

    const checkWinner = () => {
				const list = winningPatternList();
        for (let item of list) {
						const first = board[item[0]];

            if (!first) continue;

						if(item.every((indx) => board[indx] === first)) {
							return first;
						}

        }
        return null;
        
    }


    const getMessage = () => {
        const winner = checkWinner();
        if (winner) {
            return `${winner} is winner`
        }
        return `${isNext ? 'X' : 'O'}'s Turn`
    }

    const handleClick = (index) => {
        const winner = checkWinner();
        if (winner || board[index]) return;
        const newBoard = [...board];
        newBoard[index] = isNext ? 'X' : 'O';
        setIsNext(prev => !prev);
        setBoard(newBoard);
    }

    const resetGame = () => {
        const newBoard = [...board].fill(null);
        setBoard(newBoard);
        setIsNext(true);
    }

    return {
        board,
        handleClick,
        message: getMessage(),
        resetGame
    }
}

export default useTickTacToe;