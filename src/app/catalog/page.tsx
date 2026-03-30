import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: "Hair Catalog | Sheedah's Hair World",
};

export default function Catalog() {
  return <CatalogClient />;
}
