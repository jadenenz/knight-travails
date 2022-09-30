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
      }
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
    console.log("newPosX: ", newPosX, "newPosY: ", newPosY)
    node.moves[dir] = this.getPos(newPosX, newPosY)
  }

  linkBoard() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let node = this.getPos(x, y)
        for (let dir in this.moves) {
          console.log(dir)
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

  predictMove(dir1, dir2) {
    let newPosX = this.posX
    let newPosY = this.posY
    console.log("newPosX: ", newPosX, "newPosY: ", newPosY)
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
