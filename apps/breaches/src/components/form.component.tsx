import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@mui/material/Typography";

const schema = yup
  .object({
    email: yup.string().email(),
  })
  .required();

export default function Form({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Typography variant="h4" component="h1" align="center">
        Email Breach Checker
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        sx={{ mb: 2 }}
      >
        find out how many times your email address has been subject to a
        security breach
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={10}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ py: 2 }}
              disabled={!isDirty || !!errors.email}
            >
              Breached?
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
