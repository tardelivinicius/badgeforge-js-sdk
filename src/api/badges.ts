import { BaseAPI } from './base';
import { Badge, BadgeListOptions } from '../types/badge';

/**
 * Badge-related API endpoints
 */
export class BadgesAPI extends BaseAPI {
  /**
   * Get badge details
   */
  async get(badgeId: string): Promise<Badge> {
    return this.fetchGet(`api/v1/events/badges/${encodeURIComponent(badgeId)}/`);
  }

  /**
   * List all available badges
   */
  async list(_options?: BadgeListOptions): Promise<Badge[]> {
    return this.fetchGet('api/v1/events/badges/');
  }
}
