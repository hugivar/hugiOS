import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./form.component";
import { act } from "@testing-library/react";

test("render the form correctly", () => {
  render(<Form onSubmit={jest.fn()} />);

  expect(screen.getByText("Email Breach Checker")).toBeInTheDocument();
});

test("handle form change correctly", async () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);

  const input = screen.getByLabelText("Email address");
  expect(input).toBeInTheDocument();

  await fireEvent.change(input, { target: { value: "test@gmail.com" } });

  expect(screen.getByDisplayValue("test@gmail.com")).toBeInTheDocument();

  const submit = screen.getByText("Breached?");
  await act(() => {
    fireEvent(
      submit,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  expect(handleSubmit).toBeCalledTimes(1);
});
