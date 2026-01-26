import { Platform } from './mockData';

interface PlatformBadgeProps {
  platform: Platform;
}

const platformStyles: Record<Platform, string> = {
  'mercado-livre': 'bg-yellow-300 text-blue-900 border border-yellow-400',
  shopee: 'bg-orange-500 text-white border border-orange-600'
};

const platformLabel: Record<Platform, string> = {
  'mercado-livre': 'Mercado Livre',
  shopee: 'Shopee'
};

export const PlatformBadge = ({ platform }: PlatformBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${platformStyles[platform]}`}>
      {platformLabel[platform]}
    </span>
  );
};
