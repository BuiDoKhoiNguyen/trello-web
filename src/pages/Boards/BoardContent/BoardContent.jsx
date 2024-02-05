import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

function BoardContent({ board }) {
    // di chuyen chuot 10px thi ms kich hoat event
    const pointerSensor = useSensor(PointerSensor, {activationConstraint: { distance: 10 }})
    const mouseSensor = useSensor(PointerSensor, {activationConstraint: { distance: 10 }})
    const touchSensor = useSensor(PointerSensor, {activationConstraint: { delay: 250, tolerance: 500 }})
    const sensors = useSensors(mouseSensor, touchSensor)


    const [orderedColumns, setOrderedColumn] = useState([])

    useEffect(() => {
        setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, "_id"))
    }, [board])
    
    const handleDragEnd = (event) => {
        console.log("handle drag end", event)
        const { active, over } = event

        if(!over) return

        if(active._id !== over.id) {
            //lay vi tri cu tu active
            const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
            //lay vi tri moi tu over
            const newIndex = orderedColumns.findIndex(column => column._id === over.id)

            const dndOrederedColumns =  arrayMove(orderedColumns, oldIndex, newIndex)
            // const dndOrederedColumnsIds = dndOrederedColumns.map(column => column._id)
            // console.log("dndOrederedColumns", dndOrederedColumns)
            // console.log("dndOrdererColumnsIds", dndOrederedColumnsIds)
            
            setOrderedColumn(dndOrederedColumns)
        }

    }
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
                width: "100%",
                height: (theme) => (theme.trello.boardContentHeight),
                p: "10px 0"
            }}>
                <ListColumns columns={orderedColumns} />
            </Box>
        </DndContext>
    );
}

export default BoardContent;
