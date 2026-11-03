import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();
      const {data: activities, isPending} = useQuery({ // stores raw data from api into activities
    queryKey: ['activities'], //unique locker key
    queryFn: async () => { //query function
      const response = await agent.get<Activity[]>('/activities')
      return response.data
    }
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
        await agent.put('/activities', activity)
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: ['activities']
        })
    }
  })

    return {
        activities,
        isPending,
        updateActivity
    }

}