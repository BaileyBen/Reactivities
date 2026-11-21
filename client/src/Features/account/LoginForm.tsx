import { useForm } from "react-hook-form";
import { useAccount } from "../../Lib/Hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../Lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../App/shared/components/TextInput";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
 const {
  control,
  handleSubmit,
  formState: { isValid, isSubmitting },
} = useForm<LoginSchema>({
  mode: "onTouched",
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
        onSuccess: () => {
            navigate(location.state?.from || '/activities');
        }
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          color: "secondary.main",
        }}
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>

      <TextInput label="Email" control={control} name="email" />
      <TextInput label="Password" type="password" control={control} name="password" />

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Typography sx={{textAlign: 'center'}}>
        <Typography sx={{ml: 2}} component={Link} to='/register' color="primary">
        </Typography>
         </Typography>
    </Paper>
  );
}
