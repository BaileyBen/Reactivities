// ===================================================================================
// IMPORT BLOCK
// ===================================================================================
// Paper: An MUI container that adds a white background, clean drop-shadow elevation, and rounded corners.
// TextField: MUI's comprehensive form input wrapper (handles input tags, labels, placeholders, and error text).
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
// SubmitEvent: A Type import from React to type-check form submissions.
import { type SubmitEvent } from "react";
// useActivities: The data engine custom hook we built that handles queries and mutations.
import { useActivities } from "../../../Lib/Hooks/useActivities";
// useNavigate / useParams: Essential React Router DOM navigation and URL parsing utilities.
import { useNavigate, useParams } from "react-router-dom";


export default function ActivityForm() {
    // 1. ROUTING INTERROGATION
    // useParams extracts the ':id' segment from the URL (e.g., /manage/:id). 
    // If navigating to '/createActivity', this 'id' variable will evaluate to 'undefined'.
    const {id} = useParams();
    
    // 2. DATA HOOK INGESTION
    // We pass the parsed id to our hook. If an id is provided, React Query automatically pulls that 
    // single activity from cache or server to populate the form fields.
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
    
    // navigate: Lets us push redirect routes to the user browser programmatically after saving data.
    const navigate = useNavigate();

    // ===================================================================
    // FORM SUBMISSION AND SERIALISATION LOGIC
    // ===================================================================
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        // preventDefault stops the native browser behavior of refreshing the whole window on submit.
        event.preventDefault();

        // Native Web API JavaScript tool that grabs all named fields (<TextField name="...">) out of the form.
        const formData = new FormData(event.currentTarget);

        // Serialization: Converting native FormData key-value items into a standard JavaScript object.
        const data: {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // ===================================================================
        // DUAL-PURPOSE ROUTING EXECUTION BRANCHES
        // ===================================================================
        if (activity) {
            // BRANCH A: WE ARE EDITING AN EXISTING RECORD
            // Inject the matching database Guid id back into our clean dataset body.
            data.id = activity.id
            // mutateAsync returns a promise, meaning we use 'await' to stall navigation until the server confirms the save.
            await updateActivity.mutateAsync(data as unknown as Activity)
            // Immediately navigate the user to the single detailed dashboard view of that activity.
            navigate(`/activities/${activity.id}`)
        } else {
            // BRANCH B: WE ARE CREATING A BRAND NEW RECORD
            // .mutate triggers a firing callback right away without waiting for async promises.
            createActivity.mutate(data as unknown as Activity, {
                // onSuccess options object: Grabs the newly generated Guid ID sent back from your .NET API!
                onSuccess: (id) => {
                    // Redirects the user directly to the freshly created item view page.
                    navigate(`/activities/${id}`)
                }
            });
    
        }
    }

    // Guard Clause: Stops input rendering from breaking if data is currently being fetched over the wire.
    if (isLoadingActivity) return <Typography>Loading...</Typography>

  return (
    // Paper provides the clean physical wrapper canvas
    <Paper sx={{borderRadius: 3, padding: 3}}>
        
        {/* Dynamic Header Typography:
            Ternary operator checking if 'activity' exists in state.
            If true, text displays 'Edit activity'. If false, it displays 'Create activity'. */}
        <Typography variant="h5" gutterBottom color="primary">
        {activity? 'Edit activity': 'Create activity'}       
        </Typography>
        
        {/* Box component='form' renders a semantic HTML <form> element while giving you access to MUI 'sx' flex layout spacing */}
        <Box component='form' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            
            {/* IMPORTANT: The 'name' attributes must match your C# .NET API class property casing EXACTLY (e.g., Title, Description).
                defaultValue maps the existing loaded data if we are editing, or remains blank/empty if creating. */}
            <TextField name='Title' label='Title' defaultValue={activity?.title}/>
            <TextField name='Description' label='Description' defaultValue={activity?.description} multiline rows={3}/>
            <TextField name='Category' label='Category' defaultValue={activity?.category}/>
            
            {/* Date Parsing Sandbox: HTML date pickers strictly require values formatted as YYYY-MM-DD.
                We evaluate if a record exists, cast the ISO string, split it at the time divider 'T', and select the index 0 date slice. */}
            <TextField name='Date' type="Date" defaultValue={activity?.date ?
                new Date(activity.date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }/>
            <TextField name='City' label='City' defaultValue={activity?.city}/>
            <TextField name='Venue' label='Venue' defaultValue={activity?.venue}/>
        
        {/* Action Button Strip */}
        <Box sx={{display: 'flex', justifyContent: 'end', gap: 3}}>
            <Button color='inherit'>Cancel</Button>
            
            {/* Submit Button:
                disabled state checks if either mutation is currently flying across the network. 
                This safely stops a user from double-clicking and creating duplicate records in your database! */}
            <Button type="submit" 
            color='success' 
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
        </Box>
        </Box>
    </Paper>
  )
}