import { Card as MuiCard } from '@mui/material';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Card({ temporaryHideMedia }) {
    if (temporaryHideMedia) {
        return (
            <MuiCard sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",

            }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>
                        Card test 01
                    </Typography>
                </CardContent>
            </MuiCard>
        )
    }
    return (
        <MuiCard sx={{
            cursor: "pointer",
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
            overflow: "unset"
        }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                    MERN Stack  
                </Typography>
            </CardContent>
            <CardActions sx={{ p: "0px 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
            </CardActions>
        </MuiCard>
    )
}

Card.propTypes = {
    temporaryHideMedia: PropTypes.bool.isRequired,
};

export default Card