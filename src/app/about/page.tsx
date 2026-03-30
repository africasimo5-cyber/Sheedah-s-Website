import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Sheedah | Sheedah's Hair World",
};

export default function About() {
  return <AboutClient />;
}
