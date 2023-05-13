import React from "react";
import { it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./form.component";
import { act } from "@testing-library/react";

it("render the form correctly", () => {
  render(<Form onSubmit={vi.fn()} />);

  expect(screen.getByText("Email Breach Checker")).toBeInTheDocument();
});

it("handle form change correctly", async () => {
  const handleSubmit = vi.fn();
  const { container } = render(<Form onSubmit={handleSubmit} />);

  const input = screen.getByRole("textbox", { name: "Email address" });

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
