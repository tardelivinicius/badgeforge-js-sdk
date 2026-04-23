import { Badge } from './badge';

export const BADGEFORGE_EVENTS = {
  LOGIN: 'login',
  SESSION_START: 'session_start',
  PROFILE_COMPLETED: 'profile_completed',
  APP_OPENED: 'app_opened',
  COURSE_COMPLETED: 'course_completed',
  LESSON_COMPLETED: 'lesson_completed',
  QUIZ_PASSED: 'quiz_passed',
  CERTIFICATE_EARNED: 'certificate_earned',
  VIDEO_WATCHED: 'video_watched',
  PURCHASE: 'purchase',
  SUBSCRIPTION_STARTED: 'subscription_started',
  CART_CHECKOUT: 'cart_checkout',
  PAYMENT_MADE: 'payment_made',
  ORDER_DELIVERED: 'order_delivered',
  POINTS_EARNED: 'points_earned',
  LEVEL_REACHED: 'level_reached',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  CHALLENGE_COMPLETED: 'challenge_completed',
  CONTENT_CREATED: 'content_created',
  COMMENT_POSTED: 'comment_posted',
  REVIEW_SUBMITTED: 'review_submitted',
  POST_PUBLISHED: 'post_published',
  FILE_UPLOADED: 'file_uploaded',
  REFERRAL_CONVERTED: 'referral_converted',
  SHARE_COMPLETED: 'share_completed',
  FRIEND_ADDED: 'friend_added',
  TEAM_JOINED: 'team_joined',
  STREAK_DAILY: 'streak_daily',
  STREAK_WEEKLY: 'streak_weekly',
  STREAK_MONTHLY: 'streak_monthly',
} as const;

export const BADGEFORGE_EVENT_CATEGORIES = {
  engagement: [
    BADGEFORGE_EVENTS.LOGIN,
    BADGEFORGE_EVENTS.SESSION_START,
    BADGEFORGE_EVENTS.PROFILE_COMPLETED,
    BADGEFORGE_EVENTS.APP_OPENED,
  ],
  learning: [
    BADGEFORGE_EVENTS.COURSE_COMPLETED,
    BADGEFORGE_EVENTS.LESSON_COMPLETED,
    BADGEFORGE_EVENTS.QUIZ_PASSED,
    BADGEFORGE_EVENTS.CERTIFICATE_EARNED,
    BADGEFORGE_EVENTS.VIDEO_WATCHED,
  ],
  commerce: [
    BADGEFORGE_EVENTS.PURCHASE,
    BADGEFORGE_EVENTS.SUBSCRIPTION_STARTED,
    BADGEFORGE_EVENTS.CART_CHECKOUT,
    BADGEFORGE_EVENTS.PAYMENT_MADE,
    BADGEFORGE_EVENTS.ORDER_DELIVERED,
  ],
  gamification: [
    BADGEFORGE_EVENTS.POINTS_EARNED,
    BADGEFORGE_EVENTS.LEVEL_REACHED,
    BADGEFORGE_EVENTS.ACHIEVEMENT_UNLOCKED,
    BADGEFORGE_EVENTS.CHALLENGE_COMPLETED,
  ],
  content: [
    BADGEFORGE_EVENTS.CONTENT_CREATED,
    BADGEFORGE_EVENTS.COMMENT_POSTED,
    BADGEFORGE_EVENTS.REVIEW_SUBMITTED,
    BADGEFORGE_EVENTS.POST_PUBLISHED,
    BADGEFORGE_EVENTS.FILE_UPLOADED,
  ],
  social: [
    BADGEFORGE_EVENTS.REFERRAL_CONVERTED,
    BADGEFORGE_EVENTS.SHARE_COMPLETED,
    BADGEFORGE_EVENTS.FRIEND_ADDED,
    BADGEFORGE_EVENTS.TEAM_JOINED,
  ],
  streaks: [
    BADGEFORGE_EVENTS.STREAK_DAILY,
    BADGEFORGE_EVENTS.STREAK_WEEKLY,
    BADGEFORGE_EVENTS.STREAK_MONTHLY,
  ],
} as const;

export type BadgeForgeEventSlug =
  typeof BADGEFORGE_EVENTS[keyof typeof BADGEFORGE_EVENTS];

/**
 * Options for event tracking
 */
export interface EventTrackingOptions {
  /**
   * Custom timestamp for the event
   * @default Current server time
   */
  timestamp?: Date;

  /**
   * Event priority (higher = more important)
   * @default 1
   */
  priority?: number;
}

export interface EventMetadata {
  value: string | number;
  email?: string;
  username?: string;
}

/**
 * Badge unlock response
 */
export interface BadgeUnlockedResponse {
  event: 'badge_unlocked';
  badge: Badge;
  verificationUrl?: string;
}

/**
 * Generic event response
 */
export type EventResponse =
  | BadgeUnlockedResponse
  | { event: 'event_processed'; success: true };
