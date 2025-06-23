
import { generateGrid, insertWordHori, insertWordVerti,print} from "./methods";



// making the jumble board Grid sysemtem and filling with letters
function executeAlgorithm(grid,userData,direction,row,col){
   
let cipherText;

    if(direction == "x"){
       
        cipherText = insertWordHori(grid, userData, row, col); 
            
    }

    else if(direction === "y"){
        cipherText = insertWordVerti(grid, userData, row, col); 
      
    }
   


   return cipherText;

}




export default executeAlgorithm