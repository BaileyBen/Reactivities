import Grid from '@mui/material/Grid'
import ActivityList from './ActivityList'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../Form/ActivityForm'

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({activities, 
  cancelSelectActivity, selectActivity, selectedActivity, 
  openForm, closeForm, editMode, deleteActivity
}: Props) {
  return (
    <Grid container spacing={3}>
        <Grid size={7}>
          <ActivityList activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity} />
        </Grid>
        <Grid size={5}>
            {selectedActivity && !editMode &&
            <ActivityDetails 
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
            />}
            {editMode && 
            <ActivityForm closeForm={closeForm} activity={selectedActivity}
            />}
        </Grid>
    </Grid>
  )
}
