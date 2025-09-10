"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

export default function SlideFour() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    console.log({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center snap-start bg-gray-100 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Reach out to us with your next big idea
      </h1>
      <Form.Root
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md p-6 rounded-xl shadow-md bg-gray-200"
      >
        <Form.Field name="name">
          <div className="flex flex-col gap-1">
            <Form.Label className="text-sm font-medium text-gray-700">
              Name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message
              match="valueMissing"
              className="text-sm text-red-600"
            >
              Please enter your name
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field name="email">
          <div className="flex flex-col gap-1">
            <Form.Label className="text-sm font-medium text-gray-700">
              Email
            </Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message
              match="valueMissing"
              className="text-sm text-red-600"
            >
              Please enter your email
            </Form.Message>
            <Form.Message
              match="typeMismatch"
              className="text-sm text-red-600"
            >
              Please provide a valid email
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field name="message">
          <div className="flex flex-col gap-1">
            <Form.Label className="text-sm font-medium text-gray-700">
              Message
            </Form.Label>
            <Form.Control asChild>
              <textarea
                rows={4}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message
              match="valueMissing"
              className="text-sm text-red-600"
            >
              Please enter a message
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </Form.Submit>
      </Form.Root>
    </section>
  );
}
