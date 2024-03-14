import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/apis';
import { mockData } from '~/apis/mock-data';


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // react-router-dom de lay boardId tu URL ve
    const boardId = '65f15b43d4279f90a64dcd18'
    // Call api
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board