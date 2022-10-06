export class Chessboard {
  min = 0
  size = 8
  max = this.size - 1
  moves = {
    ul: "ul",
    ur: "ur",
    ru: "ru",
    rd: "rd",
    dr: "dr",
    dl: "dl",
    ld: "ld",
    lu: "lu",
  }

  constructor() {
    this.board = this.buildBoard()
  }

  buildBoard() {
    let board = []

    for (let x = 0; x < this.size; x++) {
      let row = []
      for (let y = 0; y < this.size; y++) {
        row.push(new BoardPosition(x, y))
      }
      board.push(row)
    }
    return board
  }

  getPos(x, y) {
    const max = this.size - 1
    const min = 0
    if (x <= max && x >= min) {
      if (y <= max && y >= min) {
        return this.board[x][y]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  returnMoves() {}

  //https://www.algorithms-and-technologies.com/bfs/javascript
  // bfs(start, end, graph = this.board) {
  //   //Queue to manage nodes to be visited
  //   let queue = []

  //   //Add start node to queue
  //   queue.push(start)

  //   //Boolean array indicated whether or not node has been visited
  //   let visited = []

  //   //set start node to visited
  //   visited[start] = true

  //   //Keeping the distances
  //   let distances = []

  //   //set start node distance to 0
  //   distances[start] = 0

  //   //while there are nodes left to visit
  //   while (queue.length > 0) {
  //     console.log("Visited nodes: " + visited)
  //     console.log("Distances: " + distances)
  //     let node = queue.shift()
  //     console.log("Removing node " + node + " from the queue...")
  //     //for all neighboring nodes that haven't been visited yet
  //     for (let i = 1; i < graph[node].length; i++) {
  //       if (graph[node][i] && !visited[i]) {
  //         if (node === end) {
  //           console.log("end node found")
  //           return node
  //         }

  //         visited[i] = true
  //         distances[i] = distances[node] + 1
  //         queue.push(i)
  //         console.log(
  //           "Visiting node " +
  //             i +
  //             ", setting its distance to " +
  //             distances[i] +
  //             " and adding it to the queue"
  //         )
  //       }
  //     }
  //   }
  //   console.log("No more nodes in the queue. Distances: " + distances)
  //   return distances
  // }

  checkArrayEqual(arr1, arr2) {
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) {
      return true
    } else {
      return false
    }
  }

  knightMoves(start, end) {
    //initialize queue with start in it

    const destination = [end.posX, end.posY]

    const queue = [start]

    while (queue.length > 0) {
      const currentNode = queue.shift()
      const currentNodeXY = [currentNode.posX, currentNode.posY]
      //When the destination node is found
      if (this.checkArrayEqual(currentNodeXY, destination)) {
        //have to walk back through the nodes before the list can be converted into board coords
        //due to the way the data is stored
        const nodePath = [end]
        while (!nodePath.includes(start)) {
          const prevNode = nodePath[0].getPrevious()
          nodePath.unshift(prevNode)
        }
        //Convert nodePath to path which just shows the (x,y) coordinates of each node
        const path = []
        while (nodePath.length > 0) {
          const currentPath = nodePath.shift()
          const currentPathCoord = [currentPath.posX, currentPath.posY]
          path.push(currentPathCoord)
        }
        // console.log("Your knight has arrived at its destination!", currentNode)
        // console.log("nodePath: ", nodePath)
        console.log("Path: ", path)
        return currentNode
      }
      const listToBeQueued = []
      //Prepare a list of nodes to manipulate and later add to queue
      Object.values(currentNode.moves).forEach((move) => {
        if (move !== null) {
          listToBeQueued.push(move)
        }
      })

      //set previous nodes for the list of nodes to be queued
      listToBeQueued.forEach((move) => move.setPrevious(currentNode))

      //queue up the list to be queued
      queue.push(...listToBeQueued)
      // console.log(
      //   "currentNodeXY: ",
      //   currentNodeXY,
      //   "destination: ",
      //   destination,
      //   "isEqual?: ",
      //   this.checkArrayEqual(currentNodeXY, destination)
      // )
      // console.log("currentNode: ", currentNode)
    }
  }

  linkPositions(node, dir) {
    let newPosX = node.posX
    let newPosY = node.posY

    switch (dir) {
      case this.moves.ul:
        newPosX = newPosX - 1
        newPosY = newPosY + 2
        break

      case this.moves.ur:
        newPosX = newPosX + 1
        newPosY = newPosY + 2
        break

      case this.moves.ru:
        newPosX = newPosX + 2
        newPosY = newPosY + 1
        break

      case this.moves.rd:
        newPosX = newPosX + 2
        newPosY = newPosY - 1
        break

      case this.moves.dr:
        newPosX = newPosX + 1
        newPosY = newPosY - 2
        break

      case this.moves.dl:
        newPosX = newPosX - 1
        newPosY = newPosY - 2
        break

      case this.moves.ld:
        newPosX = newPosX - 2
        newPosY = newPosY - 1
        break

      case this.moves.lu:
        newPosX = newPosX - 2
        newPosY = newPosY + 1
        break

      default:
        throw new Error()
    }
    // console.log("newPosX: ", newPosX, "newPosY: ", newPosY)
    node.moves[dir] = this.getPos(newPosX, newPosY)
  }

  linkBoard() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let node = this.getPos(x, y)
        for (let dir in this.moves) {
          // console.log(dir)
          this.linkPositions(node, dir)
        }
      }
    }
  }

  placeKnight(x, y, tarX, tarY) {
    return new BoardPosition(x, y, tarX, tarY)
  }

  getBoard() {
    return this.board
  }
}

class BoardPosition {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.moves = {}
  }

  previous

  getPrevious() {
    return this.previous
  }

  setPrevious(newPrevious) {
    this.previous = this.previous || newPrevious
  }

  predictMove(dir1, dir2) {
    let newPosX = this.posX
    let newPosY = this.posY
    // console.log("newPosX: ", newPosX, "newPosY: ", newPosY)
    if (dir1 === "up") {
      newPosY = newPosY + 2
    } else if (dir1 === "down") {
      newPosY = newPosY - 2
    } else if (dir1 === "left") {
      newPosX = newPosX - 2
    } else if (dir1 === "right") {
      newPosX = newPosX + 2
    }

    if (dir2 === "up") {
      newPosY = newPosY + 1
    } else if (dir2 === "down") {
      newPosY = newPosY - 1
    } else if (dir2 === "left") {
      newPosX = newPosX - 1
    } else if (dir2 === "right") {
      newPosX = newPosX + 1
    }

    const min = 0
    const max = 7

    if (newPosX >= min && newPosX <= max && newPosY >= min && newPosY <= max) {
      return
    } else {
      return null
    }
  }
}
