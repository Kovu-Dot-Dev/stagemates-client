# Frontend

## Goals

- Empower musicians to present their musical identity, skills, and interests through comprehensive, customizable profiles.
- Highlight key information such as social links, media samples, and affiliations to facilitate discovery and networking.
- Ensure profiles are easily searchable and filterable by relevant criteria (instrument, genre, location), supporting both grid and list views for efficient browsing.
- Provide a user-friendly interface for profile creation and editing, encouraging regular updates and engagement.

## MVP Requirements

- **Signup/Profile Creation:** Collect essential details including name, bio, primary instrument, genre, and location. Guide users through a step-by-step onboarding flow to ensure completeness.
- **Profile Editing:** Enable users to upload avatars, add or update media links (SoundCloud, YouTube), and manage social links. Provide clear feedback on successful uploads and validations.
- **Profile Display:**
  - **Grid/List View:** Show concise profile cards featuring avatar, name, instrument, genre, and location. Include quick-access filters for instrument and genre.
  - **Profile Detail Page:** Present all profile fields, including bio, media links, social links, and any endorsements or badges. Embed media players for audio/video samples directly in the profile.
- **Search/Filter UI:** Implement robust search and filter options for public profiles, allowing users to find musicians by instrument, genre, location, and other tags.
- **Privacy Controls:** Clearly indicate which fields are public and ensure only public information is displayed to other users. Provide toggles for users to manage visibility of specific fields.
- **Responsive Design:** Ensure all profile views and editing interfaces are optimized for both desktop and mobile devices for seamless user experience.

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
