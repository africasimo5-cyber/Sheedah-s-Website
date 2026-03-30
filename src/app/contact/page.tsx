import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | Sheedah's Hair World",
};

export default function Contact() {
  return <ContactClient />;
}
