/**
 * Badge rarity levels
 */
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

/**
 * Badge style properties provided by the API.
 */
export interface BadgeStyle {
  size?: string;
  color?: string;
  format?: string;
  texture?: string;
  icon: {
    name: string;
    size?: string;
  };
  rarity?: {
    borderClass?: string;
    glow_class?: string;
  };
}

/**
 * Badge representation
 */
export interface Badge {
  id: string;
  name: string;
  trigger_type: string;
  description: string;
  is_active: string;
  unlockedAt?: string;
  styles?: BadgeStyle;
}

/**
 * Options for listing badges
 */
export interface BadgeListOptions {
  rarityFilter?: BadgeRarity[];
}

export interface UserBadgesGetAllResponse {
  awarded_at: string;
  badge: Badge;
}
