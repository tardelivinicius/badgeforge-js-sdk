import { BaseAPI } from './base';
import { BadgeListOptions, UserBadgesGetAllResponse } from '../types/badge';

/**
 * User-related API endpoints
 */
export class UserBadgesAPI extends BaseAPI {
  /**
   * Get all badges
   */
  async getAll(userId: string, options?: BadgeListOptions): Promise<UserBadgesGetAllResponse[]> {
    type ValidParam = string | number | boolean;
    const ensureValidParams = (opts: BadgeListOptions): Record<string, ValidParam> => {
      const params: Record<string, ValidParam> = {};
      if (opts.rarityFilter) params.rarityFilter = opts.rarityFilter.join(',');
      return params;
    };
    const params = options ? ensureValidParams(options) : undefined;
    return this.fetchGet(`api/v1/events/badges/user/${encodeURIComponent(userId)}/`, params);
  }

  /**
   * Give badge to the user
   */
  async award(userId: string, badgeId: string): Promise<{}> {
    return this.fetchPost(`api/v1/events/badges/user/${encodeURIComponent(userId)}/award/`, {
      badgeId,
    });
  }

  /**
   * Revoke badge from user
   */
  async revoke(userId: string, badgeId: string): Promise<{}> {
    return this.fetchPost(`api/v1/events/badges/user/${encodeURIComponent(userId)}/revoke/`, {
      badgeId,
    });
  }
}
