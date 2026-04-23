# BadgeForge SDK

Official JavaScript/TypeScript SDK for BadgeForge.

BadgeForge helps you track product events and receive badge data from your project rules. This SDK keeps the integration simple: authenticate requests, register users, send valid events, and receive badge payloads back so your application can decide what to do next.

## Before You Start

Before using the SDK, make sure your BadgeForge project is ready:

1. Create your account at `badgeforge.io`.
2. Create a project in the dashboard.
3. Generate your API credentials in the project settings.
4. Configure your badges and event rules in BadgeForge.

You will need:

- `apiKey`
- `secretKey`

## Installation

```bash
npm install @badgeforge/js-sdk
```

## Quick Start

```ts
import BadgeForgeSDK, { BADGEFORGE_EVENTS } from '@badgeforge/js-sdk';

const sdk = new BadgeForgeSDK({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
});

await sdk.users.register({
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
});

const result = await sdk.trackEvent(
  BADGEFORGE_EVENTS.COURSE_COMPLETED,
  'user-123',
  { value: 'react-101' }
);

if (result.event === 'badge_unlocked') {
  console.log('Unlocked badge:', result.badge);
}
```

## Configuration

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `apiKey` | `string` | Yes | - | Your project's public API key |
| `secretKey` | `string` | Yes | - | Your project's secret key |
| `debug` | `boolean` | No | `false` | Enables request and error logs |
| `environment` | `'production' \| 'staging' \| 'development'` | No | `'production'` | Selects the API environment |

## Core Concepts

### Users

Register users before tracking events for them:

```ts
await sdk.users.register({
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
});
```

You can also update an existing user:

```ts
await sdk.users.update({
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Events

All tracked events use the same contract:

```ts
await sdk.trackEvent(BADGEFORGE_EVENTS.COURSE_COMPLETED, 'user-123', {
  value: 'react-101',
});
```

The SDK accepts only valid BadgeForge event slugs and only these metadata fields:

- `value`
- `email`
- `username`

Examples:

```ts
await sdk.trackEvent(BADGEFORGE_EVENTS.VIDEO_WATCHED, 'user-123', {
  value: 82,
});

await sdk.trackEvent(BADGEFORGE_EVENTS.POINTS_EARNED, 'user-123', {
  value: 500,
});

await sdk.trackEvent(BADGEFORGE_EVENTS.QUIZ_PASSED, 'user-123', {
  value: 95,
});
```

If an event unlocks a badge, the API returns the badge data:

```ts
const result = await sdk.trackEvent(BADGEFORGE_EVENTS.COURSE_COMPLETED, 'user-123', {
  value: 'course-123',
});

if (result.event === 'badge_unlocked') {
  renderMyCustomToast(result.badge);
}
```

### Available Event Slugs

```ts
import { BADGEFORGE_EVENTS, BADGEFORGE_EVENT_CATEGORIES } from '@badgeforge/js-sdk';

BADGEFORGE_EVENTS.LOGIN;
BADGEFORGE_EVENTS.COURSE_COMPLETED;
BADGEFORGE_EVENTS.PURCHASE;

BADGEFORGE_EVENT_CATEGORIES.learning;
BADGEFORGE_EVENT_CATEGORIES.gamification;
```

### Badges

Fetch all badges configured in your project:

```ts
const badges = await sdk.badges.list();
```

Fetch a single badge by ID:

```ts
const badge = await sdk.badges.get('badge-123');
```

### User Badges

Fetch all badges for a user:

```ts
const userBadges = await sdk.userBadges.getAll('user-123');
```

Award a badge manually:

```ts
await sdk.userBadges.award('user-123', 'badge-456');
```

Revoke a badge manually:

```ts
await sdk.userBadges.revoke('user-123', 'badge-456');
```

## Error Handling

```ts
import BadgeForgeSDK, { APIError, BADGEFORGE_EVENTS } from '@badgeforge/js-sdk';

const sdk = new BadgeForgeSDK({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
});

try {
  await sdk.trackEvent(BADGEFORGE_EVENTS.LOGIN, 'user-123', {
    value: 'web',
  });
} catch (error) {
  if (error instanceof APIError) {
    console.error(error.status, error.message, error.details);
  }
}
```

## TypeScript

The SDK includes built-in TypeScript support:

```ts
import type { Badge, EventResponse } from '@badgeforge/js-sdk';

function handleResponse(response: EventResponse) {
  if (response.event === 'badge_unlocked') {
    const badge: Badge = response.badge;
    console.log(badge.name);
  }
}
```

## License

MIT © BadgeForge
