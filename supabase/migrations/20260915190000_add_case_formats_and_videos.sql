-- Additive support for Home Day variants, custom formats and uploaded videos.
ALTER TABLE ad_formats
  ADD COLUMN IF NOT EXISTS additional_formats text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS custom_format_name text;

CREATE TABLE IF NOT EXISTS case_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  format_id uuid NOT NULL REFERENCES ad_formats(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  video_url text NOT NULL,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_videos_format_id ON case_videos(format_id);

ALTER TABLE case_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_case_videos" ON case_videos;
CREATE POLICY "anon_select_case_videos" ON case_videos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_case_videos" ON case_videos;
CREATE POLICY "anon_insert_case_videos" ON case_videos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_case_videos" ON case_videos;
CREATE POLICY "anon_delete_case_videos" ON case_videos FOR DELETE
  TO anon, authenticated USING (true);