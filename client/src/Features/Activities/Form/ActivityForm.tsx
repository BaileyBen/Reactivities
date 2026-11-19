import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../Lib/Hooks/useActivities";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../Lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../App/shared/components/TextInput";
import SelectInput from "../../../App/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../App/shared/components/DateTimeInput";
import LocationInput from "../../../App/shared/components/LocationInput";
import type { Activity } from "../../../Lib/Types";

export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: new Date(),
      location: {
        venue: "",
        city: "",
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        date: new Date(activity.date),
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };

    try {
      if (activity) {
        await updateActivity.mutateAsync({ ...activity, ...flattenedData } as Activity);
        navigate(`/activities/${activity.id}`);
      } else {
        createActivity.mutate(flattenedData as unknown as Activity, {
          onSuccess: (newId) => {
            navigate(`/activities/${newId}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create activity"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={3}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>

        <LocationInput
          control={control}
          label="Enter the location"
          name="location"
        />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button onClick={() => navigate(-1)} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
