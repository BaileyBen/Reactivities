import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { type SubmitEvent } from "react";
import { useActivities } from "../../../Lib/Hooks/useActivities";

type Props= {
    activity?: Activity
    closeForm: () => void
}

export default function ActivityForm({activity, closeForm}: Props) {
    const {updateActivity} = useActivities();
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
            if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            closeForm();
        } 
    }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create Activity
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            <TextField name='Title' label='Title' defaultValue={activity?.title}/>
            <TextField name='Description' label='Description' defaultValue={activity?.description} multiline rows={3}/>
            <TextField name='Category' label='Category' defaultValue={activity?.category}/>
            <TextField name='Date' type="Date" defaultValue={activity?.date}/>
            <TextField name='City' label='City' defaultValue={activity?.city}/>
            <TextField name='Venue' label='Venue' defaultValue={activity?.venue}/>
        <Box sx={{display: 'flex', justifyContent: 'end', gap: 3}}>
            <Button onClick={closeForm}color='inherit'>Cancel</Button>
            <Button type="submit" 
            color='success' 
            variant="contained"
            disabled={updateActivity.isPending}>Submit</Button>
        </Box>
        </Box>
    </Paper>
  )
}