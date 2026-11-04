// 1. REMOVE 'Link' from the @mui/material imports line
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
// 2. IMPORT 'Link' and 'useNavigate' from 'react-router-dom' instead
import { Link, useNavigate, useParams } from "react-router-dom"
import { useActivities } from "../../../Lib/Hooks/useActivities";


export default function ActivityDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id!);

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    if (!activity) return <Typography>Activity not found...</Typography>

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
             <Button component={Link} to = {`/manage/${activity.id}`} color="primary">Edit</Button>
            <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
        </CardActions>
    </Card>
  )
}