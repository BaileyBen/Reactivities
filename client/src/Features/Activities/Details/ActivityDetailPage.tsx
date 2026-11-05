import { Grid } from "@mui/material";
import { useParams } from "react-router";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSideBar";
import { useActivities } from "../../../Lib/Hooks/useActivities";


export default function ActivityDetailsPage() {
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) return <div>Loading activity...</div>;

    if (!activity) return <div>Activity not found</div>;
    
    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity}  />
                <ActivityDetailsInfo activity={activity}  />
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar />
            </Grid>
        </Grid>
    )
}