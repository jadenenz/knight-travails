import { Chessboard } from "./chessboard"

test("given board space returns expected X and Y values", () => {
  const chess = new Chessboard()
  const testVar = chess.getPos(1, 3)
  expect(testVar.posX).toBe(1)
  expect(testVar.posY).toBe(3)
})

// test("placing a knight down", () => {
//   const chess = new Chessboard()
//   expect(chess.getPos(5, 3)).toBe("X")
//   // chess.placeKnight(5, 3)
//   expect(chess.getPos(5, 3)).toBe("K")
//   expect(chess.getPos(4, 3)).toBe("X")
// })

test("log tester", () => {
  // const chess = new Chessboard()
  // const knight = chess.placeKnight(2, 4, 5, 7)
  // console.log(knight)
  // const knightMove = knight.predictMove("up", "left")
  // console.log(knightMove)
})

test("link positions correctly links positions", () => {
  const chess = new Chessboard()
  const node = chess.getPos(5, 3)
  const linkedNode = chess.getPos(4, 1)
  chess.linkPositions(node, chess.moves.dl)
  console.log("node: ", node)
  expect(node.moves.dl).toEqual(linkedNode)
})

test("linkBoard links all the positions on the board", () => {
  const chess = new Chessboard()
  chess.linkBoard()
  const node = chess.getPos(2, 6)
  const linkedNodeDL = chess.getPos(1, 4)
  const linkedNodeRU = chess.getPos(4, 7)
  expect(node.moves.dl).toEqual(linkedNodeDL)
  expect(node.moves.ru).toEqual(linkedNodeRU)
  console.log(node)
})

test("knightMoves initial test", () => {
  const chess = new Chessboard()
  chess.linkBoard()
  const start = chess.getPos(1, 5)
  const end = chess.getPos(2, 2)
  console.log(start, end)
  chess.knightMoves(start, end)
})
