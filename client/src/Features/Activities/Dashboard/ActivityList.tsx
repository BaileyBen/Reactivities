// ===================================================================================
// IMPORT BLOCK
// ===================================================================================
// Box: MUI's semantic general-purpose <div> container that accepts custom layouts via the 'sx' prop.
import { Box, Typography } from "@mui/material";

// ActivityCard: The child item component responsible for displaying a single activity card block.
import ActivityCard from "./ActivityCard";

// useActivities: Our core server cache access mechanism built with TanStack Query.
import { useActivities } from "../../../Lib/Hooks/useActivities";


// ===================================================================================
// COMPONENT FUNCTION
// ===================================================================================
export default function ActivityList() {
 // 1. DATA CONSUMPTION
 // Pulling the entire array of 'activities' and the asynchronous server loading state 'isPending'.
 const {activities, isPending} = useActivities();

  // 2. DATA SENSITIVITY GUARD CLAUSE
  // If the server network request has not finished executing (isPending), or if the cache returns null/undefined, 
  // immediately escape execution and display a clean loading fallback indicator.
  // This explicitly keeps the .map() operation below from running on non-existent array records, avoiding UI page crashes.
  if (!activities || isPending) return <Typography>Loading...</Typography>
  
  return (
    // Box Layout Wrapper: Formats the inner list vertically using simple CSS flex layouts.
    // display: 'flex' converts layout mechanics to Flexbox models.
    // flexDirection: 'column' stacks children vertically rather than horizontally.
    // gap: 3 injects a uniform gutter separation space multiplier (3 * 8px = 24px) between nested items.
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        
        {/* 3. DYNAMIC ARRAY LOOPING AND KEY INJECTION
            .map() loops over each separate database item found in the activities array cache sequentially.
            For each item, it instances a separate <ActivityCard />.
            
            key={activity.id}: A critical requirement for React's virtual DOM Reconciliation. 
            By providing the unique database Guid ID as the key, React can track this precise card element. 
            If you delete or update a single item, React only updates that exact specific card, bypassing 
            the heavy performance cost of rebuilding the entire list window from scratch.
            
            activity={activity}: Feeds the iteration entity data directly into the card component via Props. */}
        {activities.map(activity => (<ActivityCard 
        key={activity.id} 
        activity ={activity} 
        />))}
    </Box>
  )
}