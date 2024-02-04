import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { capitalizeFirstLetter } from '~/utils/formatters';

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  paddingX: "5px",
  borderRadius: "4px",
  '.MuiSvgIcon-root': {
    color: "white"
  },
  '&:hover': {
    bgcolor: "primary.50"
  }
}

function BoardBar({ board }){
  return (
    <Box sx={{
      backgroundColor: "#1976d2",
      width: "100%",
      height: (theme) => theme.trello.boardBarHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      paddingX: 2,
      overflowX: "auto",
      bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
      borderButtom: "1px solid #00bfa5",
      "&::-webkit-scrollbar-track": { m: 2 }
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          onClick={() => { }}
        />

        <Chip sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          onClick={() => { }}
        />

        <Chip sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to drive"
          onClick={() => { }}
        />

        <Chip sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => { }}
        />
        <Chip sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => { }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: "white", borderColor: "white", '&:hover': { borderColor: "white" } }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="https://th.bing.com/th/id/OIP.QgOP8DxPSVtEbWUeV7faVQHaHa?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title="khoinguyen">
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}


export default BoardBar;