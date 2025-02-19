/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
// Sort every element inside the array from smallest to largest and update the smart counter
async function bubbleSort(array){
    for(let i = 0; i < array.length - 1; i++){ // Goes through the array
        for(let j = array.length - 1; j > 1; j--){ // Sorts through the end of the array, compares the 2 elements next to eachother, and when it updates it moves backwards sorting from the end to the beginning.
            if(array[j].value < array[j - 1].value){ //If the current value is less than the value of the previous element it swaps the element so the bigger element goes to the end of the array
                swap(array, j, j - 1); //swaps arrays
                updateCounter(bubbleCounter); // updates movecount so we can see how many swaps are occuring
                await sleep(); //Pauses the action so we can see it happen
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){ // checks If right index is greated than the left there is no need to sort it so it stops
        return;
    }

    var index = await partition(array, left, right); // Partitions the array and gets the pivot index
    if(left < index - 1){ //Sorts the left side
        await quickSort(array, left, index - 1);
    } 
    
    if(right > index){ //Sorts the right side
        await quickSort(array, index, right);
    }
}
// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; //Creates a var called pivot that selects the pivot amount by finding the middle index for our pivot
    while (left < right){ //while the left value is less than the right value continue doing this code
        while(array[left].value < pivot){ //Moves the left image to the right
            left++;
        }
        while(array[right].value > pivot){ //Moves the right pointer to the left
                right--;
            }
        if(left < right){ //if left is less than the right value swap.
            swap(array, left, right); 
            updateCounter(quickCounter)
            await sleep();

        }
    }
    return left + 1; //Returns the partition index to quickSort
}

// TODO 1: Implement swap
function swap(array, i, j){
    var tempVar = array[i]; //stores the OG value of array[i]
    array[i] = array[j]; //array[j] is stored in index[i]
    array[j] = tempVar; //the OG value of array[i] is stored in array[j]
    drawSwap(array, i, j); //Creates a visual for the arrays swapping YIPYAR!!!!
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}