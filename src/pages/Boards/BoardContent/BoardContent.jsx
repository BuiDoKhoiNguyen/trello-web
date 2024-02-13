import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
    CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD"
}

function BoardContent({ board }) {
    // di chuyen chuot 10px thi ms kich hoat event
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
    const sensors = useSensors(mouseSensor, touchSensor, pointerSensor)

    const [orderedColumns, setOrderedColumns] = useState([])

    // cùng một thời điểm chỉ có 1 column hoặc card được kéo
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"))
    }, [board])

    const findColumnByCardId = (cardId) => {
        //
        return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
    }

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOrderedColumns(prevColumns => {
            //tim vi tri cua cai overCard trong column khac
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

            let newCardIndex
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1

            const nextColumns = cloneDeep(prevColumns)
            const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
            const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

            if (nextActiveColumn) {
                //xoa card o column active
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                //cap nhat lai mang cardOrderIds
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
            }

            if (nextOverColumn) {
                //kiem tra xem card dang keo co ton tai o overcolumn chua, neu co thi can xoa no truoc
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                //chan card dang keo vao overcolumn theo vi tri index moi
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                //cap nhat lai mang cardOrderIds
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
            }

            return nextColumns
        })
    }

    const handleDragStart = (event) => {
        // console.log("handleDragStart: ", event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        //neu keo card thi moi thuc hien
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    const handleDragOver = (event) => {
        // ko lam gi them neu dang keo column
        // if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        // console.log("handleDragOver: ", event)
        const { active, over } = event

        if (!over || !active) return

        // la card dang duoc keo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over

        //tim 2 column theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        // xu li luc keo over len column khac
        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData
            )
        }
    }

    const handleDragEnd = (event) => {
        // console.log("handleDragEnd: ", event)
        const { active, over } = event

        //dam bao ko co active hoac over 
        if (!over || !active) return

        //xu li keo tha card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // la card dang duoc keo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over

            //tim 2 column theo cardId
            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId)

            if (!activeColumn || !overColumn) return

            //phai dung toi activeDragItemData chu khong phai activeData trong scope handleDragEnd nay vi sau khi di qua onDragOver 
            //toi day la state cua card da bi cap nhat mot lan roi
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData
                )
            } else {
                // keo tha card cung mot column

                // lay vi tri cu tu oldColumnWhenDraggingCard
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(column => column._id === activeDragItemId)
                //lay vi tri moi tu over
                const newCardIndex = overColumn?.cards?.findIndex(column => column._id === overCardId)

                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)

                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
                    // console.log("targetColumn: ", targetColumn)

                    return nextColumns
                })
            }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                //lay vi tri cu tu active
                const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
                //lay vi tri moi tu over
                const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
                // console.log("dndOrderedColumns", dndOrderedColumns)
                // console.log("dndOrdererColumnsIds", dndOrderedColumnsIds)

                setOrderedColumns(dndOrderedColumns)
            }
        }


        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    // animation khi thả phần tử 
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5"
                }
            }
        })
    }

    return (
        <DndContext
            collisionDetection={closestCorners}
            // collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            sensors={sensors}
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
                width: "100%",
                height: (theme) => (theme.trello.boardContentHeight),
                p: "10px 0"
            }}>
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
