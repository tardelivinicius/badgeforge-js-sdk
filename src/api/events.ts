import { BaseAPI } from './base';
import {
  BADGEFORGE_EVENTS,
  BadgeForgeEventSlug,
  EventMetadata,
  EventTrackingOptions,
  EventResponse,
} from '../types/event';
/**
 * Event tracking and management
 *
 * @remarks
 * This class handles all event-related operations including:
 * - Tracking user events
 * - Managing event metadata
 */
export class EventsAPI extends BaseAPI {
  public readonly slugs = BADGEFORGE_EVENTS;
  private readonly validEventSlugs = new Set<BadgeForgeEventSlug>(
    Object.values(BADGEFORGE_EVENTS)
  );

  /**
   * Track a user event
   *
   * @param eventName - Name of the event to track (e.g., 'login', 'purchase')
   * @param userId - Unique user identifier
   * @param metadata - Additional event data (optional)
   * @param options - Tracking options (optional)
   *
   * @returns Promise resolving with tracking result
   *
   * @example
   * ```typescript
   * await sdk.events.trackEvent(BADGEFORGE_EVENTS.LOGIN, 'user-123', {
   *   value: 'mobile',
   * });
   * ```
   */
  async trackEvent(
    eventName: BadgeForgeEventSlug,
    userId: string,
    metadata: EventMetadata,
    options?: EventTrackingOptions
  ): Promise<EventResponse> {
    this.assertValidEvent(eventName);
    this.assertValidMetadata(metadata);

    return this.fetchPost<EventResponse>('api/v1/events/', {
      event: eventName,
      user_id: userId,
      metadata,
      options
    });
  }

  async track(
    eventName: BadgeForgeEventSlug,
    userId: string,
    metadata: EventMetadata,
    options?: EventTrackingOptions
  ): Promise<EventResponse> {
    return this.trackEvent(eventName, userId, metadata, options);
  }

  /**
   * Batch track multiple events
   *
   * @param events - Array of events to track
   *
   * @example
   * ```typescript
   * await sdk.events.batchTrack([
   *   { event: 'login', userId: 'user-123' },
   *   { event: 'page_view', userId: 'user-123' }
   * ]);
   * ```
   */
  async batchTrack(
    events: Array<{
      event: BadgeForgeEventSlug;
      userId: string;
      metadata: EventMetadata;
    }>
  ): Promise<void> {
    for (const item of events) {
      this.assertValidEvent(item.event);
      this.assertValidMetadata(item.metadata);
    }

    await this.fetchPost('api/v1/events/batch', { events });
  }

  /**
   * Get event history for a user
   *
   * @param userId - User ID to retrieve history for
   * @param limit - Number of events to return (default: 25)
   */
  async getHistory(
    userId: string,
    limit: number = 25
  ): Promise<Array<{
    event: BadgeForgeEventSlug;
    timestamp: string;
    metadata?: EventMetadata;
  }>> {
    return this.fetchGet(`api/v1/events/users/${encodeURIComponent(userId)}/events/`, { limit });
  }

  private assertValidEvent(eventName: string): void {
    if (!this.validEventSlugs.has(eventName as BadgeForgeEventSlug)) {
      throw new Error(`Invalid BadgeForge event: ${eventName}`);
    }
  }

  private assertValidMetadata(metadata: EventMetadata): void {
    if (!metadata || (typeof metadata.value !== 'string' && typeof metadata.value !== 'number')) {
      throw new Error('Event metadata must include a value field of type string or number');
    }

    const allowedKeys = new Set(['value', 'email', 'username']);
    const invalidKeys = Object.keys(metadata).filter((key) => !allowedKeys.has(key));

    if (invalidKeys.length > 0) {
      throw new Error(
        `Invalid event metadata keys: ${invalidKeys.join(', ')}. Only value, email, and username are allowed`
      );
    }
  }
}
