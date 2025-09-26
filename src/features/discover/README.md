# Discovery

## Frontend

### Goals

- Present users with a swipeable "For You" feed featuring jams and musicians, each displayed in concise, interactive cards.
- Enable users to quickly view details and take actions (join jam, connect with musician) with minimal friction.

### MVP Requirements

- **Feed UI:** Vertical, alternating cards for jams and musicians, optimized for rapid browsing.
- **Jam Card:** Displays title, date/time, location, style, host, and a clear join call-to-action.
- **Musician Card:** Shows name, main instrument, genres, profile link, and jam invite/request CTA.
- **Quick Actions:** Buttons for join, connect, save, skip, tailored to card type.
- **Personalization:** Basic feed tuning based on recent interactions and user preferences.
- **Detail Popover:** Tap to expand jam or musician info.
- **Contextual Actions:** Dynamically show join or connect options per card.

### Roadmap (Post-MVP)

- AI-driven feed ranking and recommendations.
- Soundbite/audio previews embedded in jam and musician cards.
- Advanced filters: style, location, time, genre, skill level.
- Multi-step actions: voting, jam suggestions, direct messaging before connecting.

### Open Questions

- Which user signals (likes, joins, skips) most influence feed curation?
- Should the feed prioritize upcoming jams for time sensitivity?
- How are featured musicians/jams selected versus random or sorted entries?
- What privacy and discoverability controls are needed for musician profiles?

## Backend

### Goals

- Aggregate jams and musicians into a unified, personalized feed, optimized for speed and actionable insights.
- Support fast feed refreshes and contextual card data.

### MVP Requirements

- **Discovery Endpoint:** Delivers mixed, paginated jam/musician cards, personalized to user profile and preferences.

### Backend Features

- **Data stitching:** Combine jam and musician records with relevant display data.
- **Fast querying and caching:** Optimize for popular feed combinations.
- **API actions:** Support join jam, connect with musician, save/dislike/skip asset.
- **Basic analytics:** Track user actions on discovery assets.

### Roadmap (Post-MVP)

- **Feed ranking engine:** AI/ML-driven recommendations using user behavior and entity popularity.
- **Media enrichment:** Embed soundbite/audio previews in response objects.
- **Dynamic filtering:** Filter by time, style, location, genre, instrument.
- **Granular logging:** Track feature engagement and support A/B testing.

### Open Questions

- How are jam and musician models unified for efficient querying?
- What are the caching and consistency challenges for fast feed refresh?
- How can real-time personalization be supported without user data leakage?
- How should push notifications be handled for actions (jam joins, musician connect requests)?
