// 1. REMOVE 'Link' from the @mui/material imports line
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useActivities } from "../../../Lib/Hooks/useActivities"

// 2. IMPORT 'Link' and 'useNavigate' from 'react-router-dom' instead
import { Link, useNavigate } from "react-router-dom"


export default function ActivityDetails() {
    const navigate = useNavigate();
    const activity ={} as Activity;

    if (!activity) return <Typography>Loading...</Typography>

    return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia
        component='img'
        src={`/images/categoryImages/${activity.category}.jpg`}/>
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
             <Typography variant="subtitle1" sx={{fontWeight: 'light'}}>{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
             <Button component={Link} to = {`/activities/${activity.id}`} color="primary">Edit</Button>
            <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
        </CardActions>
    </Card>
  )
}