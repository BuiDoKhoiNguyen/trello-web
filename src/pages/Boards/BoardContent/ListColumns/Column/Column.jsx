import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListCards from './ListCards/ListCards';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useConfirm } from "material-ui-confirm";



function Column({ column, createNewCard, deleteColumnDetails }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        // chiều cao luôn max 100% nếu không sẽ lỗi lúc kéo các column ngắn qua một column dài thì phải kéo ở khu vực giữa rất khó chịu, kết hợp với listeners để xử lí
        height: "100%",
        opacity: isDragging ? 0.5 : undefined
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // card da duoc sap xep o _id.jsx
    const orderedCards = column.cards

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

    const [newCardTitle, setNewCardTitle] = useState('')

    const addNewCard = () => {
        if (!newCardTitle) {
            toast.error("Please enter Card Title!", { position: 'bottom-right' })
            return
        }

        const newCardData = {
            title: newCardTitle,
            columnId: column._id
        }

        createNewCard(newCardData)
        // console.log()
        //call API

        toggleOpenNewCardForm()
        setNewCardTitle('')
    }

    const confirmDeleteColumn = useConfirm()
    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            title: 'Delete Column?',
            description: 'This action will premanently delete your Column and its Card! Are you sure?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel',
            // allowClose: false,
            // dialogProps: { maxWidth: 'xs' },
            // confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
            // cancellationButtonProps: { color: 'inherit' },
            // buttonOrder: ['confirm', 'cancel']
        }).then(() => {
            deleteColumnDetails(column._id)
        }).catch(() => {})
    }

    // bọc div ở ngoài cùng vì vấn đề chiều cao của column khi kéo thả sẽ có bug kiểu flickering
    return (
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: "300px",
                    maxWidth: "300px",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#333643" : "#ebecf0"),
                    ml: 2,
                    borderRadius: "6px",
                    height: "fit-content",
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}
            >
                {/* Box column header */}
                <Box sx={{
                    height: (theme) => theme.trello.columnHeaderHeight,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="h6" sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}>
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMoreIcon
                                sx={{ color: "text.primary", cursor: "pointer" }}
                                id="basic-button-column-dropdown"
                                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-column-dropdown',
                            }}
                        >
                            <MenuItem
                                onClick={toggleOpenNewCardForm} 
                                sx={{
                                '&:hover': {
                                    color: 'success.light',
                                    '& .add-card-icon': { color: 'success.light' }
                                }
                            }}>
                                <ListItemIcon>
                                    <AddCardIcon className='add-card-icon' fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopy fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPaste fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem
                                onClick={handleDeleteColumn} 
                                sx={{
                                '&:hover': {
                                    color: 'warning.dark',
                                    '& .delete-forever-icon': { color: 'warning.dark' }
                                }
                            }}>
                                <ListItemIcon>
                                    <DeleteForeverIcon className="delete-forever-icon" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete this column</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* Box list card */}
                <ListCards cards={orderedCards} />

                {/* Box column footer */}
                <Box sx={{
                    height: (theme) => theme.trello.columnFooterHeight,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    {!openNewCardForm
                        ? <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>
                                Add new card
                            </Button>
                            <Tooltip title="Drag handle icon">
                                <DragHandleIcon sx={{ cursor: "pointer" }} />
                            </Tooltip>
                        </Box>
                        : <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField
                                label="Enter card title..."
                                type="text"
                                size="small"
                                variant='outlined'
                                autoFocus
                                data-no-dnd="true"
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}

                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: (theme) => theme.palette.primary.main,
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                                    },
                                    '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&: hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <Button
                                    data-no-dnd="true"
                                    onClick={addNewCard}
                                    variant="contained" color="success" size="small"
                                    sx={{
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                    }}>
                                    Add
                                </Button>
                                <CloseIcon
                                    fontSize="Small"
                                    sx={{
                                        color: (theme) => theme.palette.warning.light,
                                        cursor: 'pointer'
                                    }}
                                    onClick={toggleOpenNewCardForm}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default Column