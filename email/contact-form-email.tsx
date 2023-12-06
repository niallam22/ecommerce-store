import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  email: string;
  orderId: string;
  name: string;
  storeId: string;
};

export default function ContactFormEmail({
  message,
  email,
  orderId,
  name,
  storeId,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                You received the following message from the contact form
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Sender details: </Text>
              <Text>- Name - {name}</Text>
              <Text>- Order id - {orderId}</Text>
              <Text>- Email - {email}</Text>
              <Text>- StoreId - {storeId}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
