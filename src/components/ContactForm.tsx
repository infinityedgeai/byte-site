"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

  };

  return (
    <section className="font-mono h-screen flex flex-col items-center justify-center snap-start px-4 bg-background text-foreground"
      >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Reach out to us with your next <span className="text-primary">big idea</span>
      </h1>
     <Form.Root
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Form.Field name="name">
              <div className="flex flex-col gap-1">
                <Form.Label className="text-sm font-medium text-foreground">
                  Name
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border px-3 py-2
                               bg-background text-foreground placeholder:text-foreground/50 border-foreground/20
                               focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="text-sm text-secondary font-semibold"
                >
                  Please enter your name
                </Form.Message>
              </div>
            </Form.Field>
            <Form.Field name="email">
              <div className="flex flex-col gap-1">
                <Form.Label className="text-sm font-medium text-foreground">
                  Email
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border px-3 py-2
                               bg-background text-foreground placeholder:text-foreground/50 border-foreground/20
                               focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="text-sm text-secondary font-semibold">
                  Please enter your email
                </Form.Message>
                <Form.Message match="typeMismatch" className="text-sm text-secondary font-semibold">
                  Please enter a valid email
                </Form.Message>
              </div>
            </Form.Field>
          </div>

          <Form.Field name="message" className="h-full">
            <div className="flex flex-col gap-1 h-full">
              <Form.Label className="text-sm font-medium text-foreground">
                Message
              </Form.Label>
              <Form.Control asChild>
                <textarea
                  required
                  className="w-full h-full min-h-[120px] rounded-lg border px-3 py-2
                             bg-background text-foreground placeholder:text-foreground/50 border-foreground/20
                             focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </Form.Control>
              <Form.Message
                match="valueMissing"
                className="text-sm text-secondary font-semibold"
              >
                Please enter a message
              </Form.Message>
            </div>
          </Form.Field>
        </div>

        <div className="mt-6 flex justify-end">
          <Form.Submit asChild>
            <button
              type="submit"
              className="w-full md:w-auto px-8 rounded-lg bg-primary py-2 text-background font-medium hover:bg-primary/80 transition-colors"
            >
              Send Message
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </section>
  );
}
