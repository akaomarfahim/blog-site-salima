# My Blog

A self-contained personal blog built with Node.js and Express. No database
required — all data (users, posts, comments) is stored in JSON files inside
the `data/` folder.

## Features

- Modern, editorial/newspaper-style design — serif headlines (Playfair
  Display), a featured-post hero on the homepage, and a clean post grid
- Public blog homepage listing all posts, and a single-post page for each
- Featured images on posts: upload a JPG, PNG, WEBP, or GIF (up to 5MB)
  when writing or editing a post; it shows as a hero image on the post
  and as a thumbnail on the homepage and dashboard
- Visitor account system: sign up, log in, log out (passwords are hashed
  with bcrypt, never stored in plain text)
- Logged-in visitors can post comments under any blog post
- Any logged-in user (including you, the blog author) can reply to a
  comment — your replies are marked with an "Author" badge
- Comment authors and the admin can delete comments; deleting a top-level
  comment also removes its replies
- Admin dashboard to write, edit, and delete blog posts (only your account
  can access `/admin`)
- All data lives in `data/users.json`, `data/posts.json`, and
  `data/comments.json` — easy to back up, inspect, or migrate later.
  Uploaded images are stored as plain files in `public/uploads/`

## Getting started

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment file and set your own values:
   ```
   cp .env.example .env
   ```
   Open `.env` and set `SESSION_SECRET` to a long random string, and set
   `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` to the credentials
   you want for your author/admin account.

3. Start the server:
   ```
   npm start
   ```
   The first time it runs with an empty `data/users.json`, it automatically
   creates your admin account from the `.env` values above. This is your
   login for writing posts and moderating comments — you do not need to
   "register" separately.

4. Open `http://localhost:3000` in your browser.

## How to use it

- **Writing posts**: log in with your admin account, then go to
  `/admin` (also linked in the top navigation as "Dashboard") to write,
  edit, or delete posts. Attach a featured image using the file picker
  on the post form — it's optional, and you can remove or replace it
  later from the edit screen.
- **Visitors**: anyone can read your posts. To comment, they click
  "Sign up", create a free account (username, email, password), and can
  then comment and reply on any post.
- **Replying**: click "Reply" under any comment — this works for you and
  for any logged-in visitor, so conversations can go back and forth.
  Replies are nested one level under their parent comment to keep threads
  easy to read.
- **Moderation**: you (the admin) can delete any comment or reply. Regular
  users can only delete their own.

## Project structure

```
server.js            entry point
routes/               auth.js, posts.js, comments.js, admin.js
middleware/auth.js    session/auth helpers
utils/db.js           JSON read/write helpers
utils/seed.js         creates your admin account on first run
data/                 users.json, posts.json, comments.json (your content)
views/                EJS templates (pages)
public/               CSS and JS served to the browser
```

## Data storage notes

Every write goes through `utils/db.js`, which writes to a temporary file
and then renames it into place — this avoids corrupting your JSON files
if the server is stopped mid-write. Since everything is a plain JSON file,
you can open `data/posts.json` in any text editor to inspect or hand-edit
your content if you ever need to.

This setup is great for a personal blog with light-to-moderate traffic. If
your comment volume grows very large, moving to a real database later is
straightforward since the data shapes (user, post, comment) are simple and
already separated by file.

## Deploying

Any host that runs Node.js works (a small VPS, Render, Railway, Fly.io,
etc.). Two things to remember in production:

- Set `SESSION_SECRET` to a real random value.
- Make sure the `data/` folder is on **persistent** storage — on some
  platforms the filesystem resets on every deploy, which would wipe your
  posts and comments. Look for a "persistent disk" or "volume" option.
