import { BaseAPI } from './base';
import { UserRegistrationResponse } from '../types/user';

/**
 * User-related API endpoints
 */
export class UsersAPI extends BaseAPI {
  /**
   * Register a new user
   */
  async register(userData: {
    id: string;
    name: string;
    email: string;
    metadata?: Record<string, any>;
  }): Promise<UserRegistrationResponse> {
    return this.fetchPost('api/v1/events/user/register/', userData);
  }

  /**
   * Update user
   */
  async update(userData: {
    id: string;
    name: string;
    email: string;
    metadata?: Record<string, any>;
  }): Promise<UserRegistrationResponse> {
    return this.fetchPost('api/v1/events/user/register/', userData);
  }

  /**
   * Fetch a user by query params supported by the API
   */
  async get(params?: {
    id?: string;
    email?: string;
  }): Promise<UserRegistrationResponse> {
    return this.fetchGet('api/v1/events/user/', params);
  }
}
