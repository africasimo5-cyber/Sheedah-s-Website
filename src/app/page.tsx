import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Sheedah's Hair World | Home",
};

export default function Home() {
  return <HomeClient />;
}
