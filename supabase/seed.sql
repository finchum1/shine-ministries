-- Optional: run after schema.sql to pre-fill a few real starter rows so the
-- Events and Bible Studies pages have live data right away instead of the
-- built-in placeholder content. Feel free to edit the values below before
-- running, or just add real rows via the Supabase Table Editor instead.

insert into public.bible_studies (title, description, day_of_week, meeting_time, location, leader_name, sort_order)
values
  ('Tuesday Morning Study', 'A gentle-paced study through Scripture with coffee, conversation, and childcare provided.', 'Tuesdays', '9:30–11:00 AM', 'Fellowship Hall', 'Rachel Simmons', 1),
  ('Thursday Evening Study', 'A study designed for women balancing work and family, meeting in the evening for deeper discussion.', 'Thursdays', '6:30–8:00 PM', 'Room 204', 'Sarah Mitchell', 2),
  ('Online Study', 'Join from anywhere on a flexible video call — perfect for busy seasons or if you''re out of town.', 'Wednesdays', '7:00 PM', 'Online (Zoom link sent after sign-up)', 'Emily Carter', 3);

insert into public.events (title, description, event_date, event_time, location)
values
  ('Fall Kickoff Brunch', 'Join us for a cozy morning of good food, warm conversation, and an introduction to this season''s Bible studies.', current_date + interval '14 days', '10:00 AM', 'Fellowship Hall'),
  ('Women''s Retreat Weekend', 'A weekend away to rest, reconnect with God, and build friendships that last well beyond the weekend.', current_date + interval '45 days', 'Friday–Sunday', 'Cedar Ridge Retreat Center'),
  ('Christmas Tea & Testimony Night', 'A festive evening of tea, treats, and stories of how God has been at work in the lives of women in our ministry.', current_date + interval '90 days', '6:30 PM', 'Fellowship Hall');
