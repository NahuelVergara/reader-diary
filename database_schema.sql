-- Crear tabla para los libros/reseñas
CREATE TABLE public.entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  date_read text NOT NULL,
  content text,
  key_learnings jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla para las citas, relacionada con entries
CREATE TABLE public.quotes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  text text NOT NULL,
  entry_id uuid REFERENCES public.entries(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS) para permitir acceso desde el cliente si es necesario
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir operaciones públicas (Solo como entorno de desarrollo inicial)
-- IMPORTANTE: Ajustar estas políticas para un entorno de producción usando Auth.
CREATE POLICY "Allow public select on entries" ON public.entries FOR SELECT USING (true);
CREATE POLICY "Allow public insert on entries" ON public.entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on entries" ON public.entries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on entries" ON public.entries FOR DELETE USING (true);

CREATE POLICY "Allow public select on quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Allow public insert on quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on quotes" ON public.quotes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on quotes" ON public.quotes FOR DELETE USING (true);
