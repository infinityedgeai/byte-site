"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

export default function SlideFive() {
    const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
  event.preventDefault();
  try {
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", process.env.WEB3FORMS_API_KEY || "");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });

    const res = await response.json();

    if (res.success) {
      console.log("Success", res);
    } else {
      console.error("Error", res);
    }
  } catch (err) {
    console.error("Network error", err);
  }
};


 

  return (
    <section className="font-mono h-screen flex flex-col items-center justify-center snap-start px-4"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reach out to us with your next big idea
      </h1>
     <Form.Root
     onSubmit={onSubmit}
        className="space-y-4 w-full max-w-md p-6 rounded-xl shadow-md bg-white text-neutral-900"
        style={{ colorScheme: "light" }} 
      >
        <Form.Field name="name">
          <div className="flex flex-col gap-1"><Form.Label className="text-sm font-medium text-neutral-800" >
              Name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                required
                className="w-full rounded-lg border px-3 py-2
                           bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <Form.Label className="text-sm font-medium text-neutral-800">
              Email
            </Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                required
                className="w-full rounded-lg border px-3 py-2
                           bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600">
              Please enter your email
            </Form.Message>
            <Form.Message match="typeMismatch" className="text-sm text-red-600">
              Please provide a valid email
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Field name="message">
          <div className="flex flex-col gap-1">
            <Form.Label className="text-sm font-medium text-neutral-800">
              Message
            </Form.Label>
            <Form.Control asChild>
              <textarea
                rows={4}
                required
                className="w-full rounded-lg border px-3 py-2
                           bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
};