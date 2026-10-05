const SAMPLES = {
    INPUT: "input.txt",
    SAMPLE_1 : "sample1.txt",
    CUST_SAMPLE_1 : "custSample1.txt",
}


const rawInput = Deno.readTextFileSync(SAMPLES.INPUT);


const parseData = (input)=>{
    return input.split("\n").map((row)=>row.split(""));
}

const data = parseData(rawInput)


const getNeighborsCount = (map, tRow, tCol)=>{
    let neighborsCount = 0;
    
    for (let row = Math.max(0, tRow - 1); row < Math.min(map.length, tRow + 2); row ++ ){

        for (let col = Math.max(0, tCol - 1); col < Math.min(map[row].length, tCol + 2); col ++ ){
            if (map[row][col] === "@"){
                neighborsCount++;
            }
        }
    }

    return neighborsCount - 1;
}


const rollWithLessThanN = (map, maxNeighborsCount)=>{
    const positions = []
    for (let row =0; row < map.length; row++){
        for (let col =0; col < map[row].length; col++){
            if (map[row][col] === "@"){
                const neighborCount = getNeighborsCount(map, row, col);
                
                if (neighborCount <= maxNeighborsCount){
                    positions.push([col,row])
                }
            }
        }
    }
    return positions
}

// console.log(rawInput)
const neightbors = rollWithLessThanN(data, 3)
// console.log(neightbors)
console.log(neightbors.length);