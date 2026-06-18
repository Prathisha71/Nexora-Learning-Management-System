-- Additive nullable DRM fields (existing rows are not modified)
ALTER TABLE "course_videos" ADD COLUMN IF NOT EXISTS "drm_enabled" BOOLEAN;
ALTER TABLE "course_videos" ADD COLUMN IF NOT EXISTS "encrypted_path" TEXT;
ALTER TABLE "course_videos" ADD COLUMN IF NOT EXISTS "hls_path" TEXT;
ALTER TABLE "course_videos" ADD COLUMN IF NOT EXISTS "dash_path" TEXT;
ALTER TABLE "course_videos" ADD COLUMN IF NOT EXISTS "license_id" TEXT;
