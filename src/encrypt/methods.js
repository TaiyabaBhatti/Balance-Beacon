export function generateGrid (size){

const data = "abcdefghijklmnopqrstuvwxyz"
let grid = []


for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
        const randomLetter = data[Math.floor(Math.random() * data.length)]
        grid[i][j] = randomLetter
    }
}
print(grid);
return grid;

}


export function insertWordHori(board, word, rowStart, colStart) {

let col = colStart;
let row = rowStart

    for (let i = 0; i < word.length; i++) {
       
         
if(col >= board[row].length){
   
    row += 1;
    col=0;

    if(row >= board.length) {
       
    
        row=0;
    }
    board[row][col] = word[i];
    col++
   
}

else{
      board[row][col++] = word[i];
}
    }
    
    let cipherText = adjacentHorizontalText(board,rowStart,colStart,word.length)
    console.log(cipherText)

    return cipherText;
  }
  
export  function insertWordVerti(board, word, rowStart, colStart) {
       
    let col = colStart;
    let row = rowStart

    for (let i = 0; i < word.length; i++) {
       
if(row >=board.length){
    col++;
    row=0;
if(col >= board[row].length) {  
    col=0;
}
board[row][col] = word[i];
// row++;
}

      board[row++][col]=word[i];
      
    }

    let cipherText = adjacentVerticalText(board,rowStart,colStart,word.length)
    console.log(cipherText)

    return cipherText;
  }


// extracting cipher text
function adjacentHorizontalText(board, row, colStart, length, direction = "bottom") {
    let adjacentText = [];
    let targetedRow = row + 1;
    let col =colStart
  
    for (let i = 0; i < length; i++) {
        console.log(targetedRow)
      if(col >= board[row].length){
        targetedRow++;
        col=0;
    
        if(targetedRow >= board.length) {
            targetedRow=0;
        }
      
        adjacentText.push(board[targetedRow][col]);
        col++
       
    }
    
    else{
        adjacentText.push(board[targetedRow][col++]);    
    }
    }
  
    return adjacentText.join("");
  }
  
  function adjacentVerticalText(board, rowStart, col, length, direction = "left") {
    let adjacentText = [];
    let targetedCol = col - 1;
    let row = rowStart;
  
    for (let i = 0; i < length; i++) {
       
        if(row >=board.length){
            targetedCol++;
            row=0;
        if(targetedCol >= board[row].length) {  
            targetedCol=0;
        }
   
        adjacentText.push(board[row][targetedCol]);
       
        }
        
            else {
              adjacentText.push(board[row++][targetedCol]);
            }
            }
  
  
    return adjacentText.join("");
  }






 export function print(arr){

    for (const row of arr) {    
        const formatRow = row.join(" ");
        console.log(formatRow)
        }
        
}
