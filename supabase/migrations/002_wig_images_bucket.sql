INSERT INTO storage.buckets (id, name, public)
VALUES ('wig-images', 'wig-images', true)
ON CONFLICT (id)
DO UPDATE SET
  name = EXCLUDED.name,
  public = EXCLUDED.public;