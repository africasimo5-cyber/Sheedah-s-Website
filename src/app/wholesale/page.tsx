import { Metadata } from 'next';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = {
  title: "Wholesale Hair Lagos | Sheedah's Hair World",
};

export default function Wholesale() {
  return <WholesaleClient />;
}
