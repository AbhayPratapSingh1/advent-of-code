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
    for (let row = 0; row < map.length; row++){
        for (let col = 0; col < map[row].length; col++){
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

const removeRollInMap = (map, positions)=>{
    const newMap = map.map((x) => x.map(y=>y));
    positions.forEach(([x,y]) => {
        newMap[y][x] = ".";
    });
    
    return newMap;
}


let removableRolls = rollWithLessThanN(data, 3);

let totalRemoved =removableRolls.length;    

let map = removeRollInMap(data, removableRolls);


while (removableRolls !== 0){
    const neighbors = rollWithLessThanN(map, 3)
    removableRolls = neighbors.length;
    totalRemoved += removableRolls;
    map = removeRollInMap(map, neighbors);
}

console.log({totalRemoved})