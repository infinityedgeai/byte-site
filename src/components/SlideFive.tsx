"use client";

import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

export default function SlideFive() {
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      alert("✅ Message sent successfully!");
    } else {
      alert("❌ Error: " + (data.error || "Something went wrong"));
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("❌ Network error. Please try again later.");
  }
};



  return (
    <section
      className="font-mono h-screen flex flex-col items-center justify-center snap-start px-4 scrollbar-hide"
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
          <div className="flex flex-col gap-1">
            <Form.Label className="text-sm font-medium text-neutral-800">
              Name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                required
                className="w-full rounded-lg border px-3 py-2 bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600">
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
                className="w-full rounded-lg border px-3 py-2 bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full rounded-lg border px-3 py-2 bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600">
              Please enter a message
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-white font-medium hover:bg-indigo-700 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </Form.Submit>

        {status === "success" && (
          <p className="text-green-600 text-sm text-center">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </Form.Root>
    </section>
  );
}
