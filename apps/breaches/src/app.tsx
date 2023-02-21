import React from "react";
import { Container } from "@mui/material";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import Form from "./components/form.component";
import BreachList from "./components/breach-list.component";
import { useSnackbar } from "notistack";

const GET_BREACHES = gql`
  query GetBreaches($email: String) {
    breaches(email: $email)
      @rest(type: "Breaches", path: "breaches?email={args.email}") {
      Name
      Domain
      BreachDate
    }
  }
`;

export default function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [getBreaches, { loading, data, called }] = useLazyQuery(GET_BREACHES, {
    onError: () =>
      enqueueSnackbar(
        "Something went wrong with that request. Try again later",
        {
          variant: "error",
        }
      ),
  });

  const handleSubmit = (formData) => {
    getBreaches({ variables: { email: formData.email } });
  };

  return (
    <>
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Form onSubmit={handleSubmit} />
      </Container>
      <Container maxWidth="lg">
        <BreachList
          show={called}
          loading={loading}
          data={Array.isArray(data?.breaches) ? data?.breaches : []}
        />
      </Container>
    </>
  );
}
