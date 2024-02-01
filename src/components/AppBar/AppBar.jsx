import { useState } from 'react';
import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Profile from './Menus/Profile';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


function AppBar() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <Box sx={{
      width: "100%",
      height: (theme) => theme.trello.appBarHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      paddingX: 2,
      overflow: "auto",
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      "&::-webkit-scrollbar-track": { m: 2 }
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "white" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: "white" }} />
          <Typography variant="span" sx={{ fontSize: "1.2rem", fontWeight: "Bold", color: "white" }}>
            Trello
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<LibraryAddIcon />} sx={{ fontWeight: "Bold", color: "white", border: "none", "&:hover": { border: "none" } }} >Create</Button>
        </Box>

      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "white" }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon  sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize="Small"
                sx={{ color: searchValue ? "white" : "transparent", cursor: "pointer" }}
                onClick={() => setSearchValue("")} 
              />
            )
          }}
          sx={{
            minWidth: "120px",
            maxWidth: "170px",
            '& label': { color: "white" },
            '& input': { color: "white" },
            '& label.Mui-focused': { color: "white" },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: "white" },
              '&: hover fieldset': { borderColor: "white" },
              '&.Mui-focused fieldset': { borderColor: "white" }   
            }
          }} 
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar