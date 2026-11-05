// ===================================================================================
// IMPORT BLOCK
// ===================================================================================
// useMutation: TanStack hook used for creating, updating, or deleting data (HTTP POST, PUT, DELETE).
// useQuery: TanStack hook used for fetching data (HTTP GET) and caching it securely.
// useQueryClient: Provides global access to the cache container, allowing us to clear/refresh cached data.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";

// Custom Hook Wrapper: Encapsulates all React Query logic so your components can share it instantly.
// Parameter (id?): Marked optional with '?' so it works on both list views (no ID) and detail views (has ID).
export const useActivities = (id?: string) => {
    
    // Instantiating the queryClient to allow cache invalidation across mutations down below.
    const queryClient = useQueryClient();
    
    // ===================================================================
    // 1. FETCH ALL ACTIVITIES (HTTP GET)
    // ===================================================================
    const {data: activities, isPending} = useQuery({ // stores raw data from api into activities
    queryKey: ['activities'], // unique locker key identifying this specific global cache list
    queryFn: async () => { // asynchronous query function that actually executes the API network request
      const response = await agent.get<Activity[]>('/activities') // fetches typing-enforced Activity arrays
      return response.data // returns the raw JSON payload to update the cached 'activities' state variable
    }
  });

  // ===================================================================
  // 2. FETCH SINGLE ACTIVITY DETAILS (HTTP GET BY ID)
  // ===================================================================
  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    // Composite Key: Locks this single item cache under a sub-key like ['activities', '123-abc']
    queryKey: ['activities', id],
    queryFn: async () => {
        const response = await agent.get<Activity>(`/activities/${id}`) // targets the specific API endpoint
        return response.data
    },
    // The "enabled" flag: Crucial performance feature. !!id converts the ID string to a boolean.
    // If 'id' is undefined (like on the main dashboard page), this query will NOT run, preventing unnecessary 404 server calls.
    enabled: !!id
  })

  // ===================================================================
  // 3. UPDATE AN ACTIVITY MUTATION (HTTP PUT)
  // ===================================================================
  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
        await agent.put('/activities', activity) // makes the backend update API call
    },
    // onSuccess callback: Executes automatically the moment the backend database successfully updates
    onSuccess: async () => {
        // Invalidation: Tells TanStack Query that the existing cache list inside locker ['activities'] is now out-of-date.
        // This forces React to immediately re-fetch the fresh data in the background, keeping the UI perfectly in sync.
        await queryClient.invalidateQueries({
            queryKey: ['activities']
        })
    }
  })

  // ===================================================================
  // 4. CREATE AN ACTIVITY MUTATION (HTTP POST)
  // ===================================================================
  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
    const response = await agent.post('activities', activity) // pushes new payload to backend API
    return response.data;
    },
    onSuccess: async () => {
        // Automatically refreshes the main UI tracking view by invalidating the primary list cache
        await queryClient.invalidateQueries({
            queryKey: ['activities']
        })
    }
  })

  // ===================================================================
  // 5. DELETE AN ACTIVITY MUTATION (HTTP DELETE)
  // ===================================================================
  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
        await agent.delete(`/activities/${id}`)  // triggers target deletion on backend database
    },
    onSuccess: async () => {
        // Refreshes the operational board to instantly clear the deleted record from user view
        await queryClient.invalidateQueries({
            queryKey: ['activities']
        })
    }
  })

    // Return Statement: Exposes the data states, loading flags, and mutation triggers 
    // to any UI view or React component that executes 'useActivities()'
    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    }

}