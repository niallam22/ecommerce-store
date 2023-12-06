"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailData = {
  name: string;
  email: string;
  orderId?: string;
  message: string;
  storeId: string
}

export const sendEmail = async (emailData: EmailData) => {
  const {email, message, orderId, name, storeId } = emailData

  // simple server-side validation
  if (!validateString(email, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "johnbreevanco@gmail.com",
      subject: "Message from contact form",
      reply_to: email,
      react: React.createElement(ContactFormEmail, {
        message: message,
        email: email,
        orderId: orderId||'',
        name: name,
        storeId: storeId,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
