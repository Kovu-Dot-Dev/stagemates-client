# Frontend

## Goals

- Allow musicians to showcase musical identity, skills, and interests through rich, editable, searchable profiles.
- Surface social and media links and enable easy browsing/filtering.

## MVP Requirements

- **Signup/profile creation:** name, bio, main instrument, genre, location.
- **Profile edit:** avatar upload, media links (SoundCloud, YouTube).
- **Grid/list view:** profile cards and instrument/genre filters.
- **Profile detail page:** displays all fields and linked media.
- **Search/filter UI:** for public profiles.
- Only public fields are visible to others.

## Roadmap (Post-MVP)

- Profile privacy toggling (public/private fields).
- Verified badges and skill endorsements.
- Band affiliations/tags, media gallery.
- Direct audio/video upload.

## Open Questions

- What info is mandatory at signup?
- Email/social verification at launch?
- Audio upload moderation and caps?
- Which fields are public vs private?

# Backend

## Goals

- Maintain searchable, rich user profiles; flexible querying and media integration.
- Integrate with user auth system.

## MVP Requirements

- **Endpoints:** create, update, view, search profiles.
- **Avatar/media validation and storage.**
- **API-controlled public/private data tagging.**
- **External media link validation.**

## Roadmap (Post-MVP)

- Granular privacy controls in schema.
- Skill endorsement APIs.
- Band/jam history, entity relations.

## Open Questions

- Email/social verification workflow?
- Audio/media moderation pipeline?
- Media storage at scale?
