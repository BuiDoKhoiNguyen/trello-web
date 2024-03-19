/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
  
// hold a place when column is empty by create a card
export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    }
}