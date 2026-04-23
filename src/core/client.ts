import { BadgeForgeConfig, DEFAULT_CONFIG, API_ENDPOINTS } from '../core/config';
import { UsersAPI } from '../api/users';
import { BadgesAPI } from '../api/badges';
import { EventsAPI } from '../api/events';
import { UserBadgesAPI } from '../api/userBadges';
import { BadgeForgeEventSlug, EventMetadata, EventResponse, EventTrackingOptions } from '../types/event';

/**
 * Main SDK client class
 */
export class BadgeForgeSDK {
  private readonly config: Required<BadgeForgeConfig>;
  public readonly users: UsersAPI;
  public readonly badges: BadgesAPI;
  public readonly events: EventsAPI;
  public readonly userBadges: UserBadgesAPI;

  constructor(config: BadgeForgeConfig) {
    // Validate required configuration
    if (!config.apiKey) throw new Error('API key is required');
    if (!config.secretKey) throw new Error('Secret key is required');

    // Merge with defaults
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    } as Required<BadgeForgeConfig>;

    // Initialize API modules
    this.users = new UsersAPI(this);
    this.badges = new BadgesAPI(this);
    this.userBadges = new UserBadgesAPI(this);
    this.events = new EventsAPI(this);

    if (this.config.debug) {
      console.log('BadgeForgeSDK initialized', {
        environment: this.config.environment,
        endpoint: this.baseUrl,
      });
    }
  }

  /**
   * Get base API URL based on environment
   */
  get baseUrl(): string {
    return API_ENDPOINTS[this.config.environment];
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<Required<BadgeForgeConfig>> {
    return this.config;
  }

  trackEvent(
    eventName: BadgeForgeEventSlug,
    userId: string,
    metadata: EventMetadata,
    options?: EventTrackingOptions
  ): Promise<EventResponse> {
    return this.events.trackEvent(eventName, userId, metadata, options);
  }
}
