export const Colors = {
  background: '#FAF7F2',
  surface: '#FFFFFF',
  surfaceElevated: '#F4EEE6',
  surfaceActive: '#EFE6DB',

  border: '#E6DED2',
  borderLight: '#DDD3C4',

  text: '#1C1815',
  textSecondary: '#5D554C',
  textMuted: '#93897D',

  accent: '#F26B5B',
  accentDim: '#D85849',
  accentSubtle: 'rgba(242, 107, 91, 0.12)',

  success: '#2F8F5B',
  successSubtle: 'rgba(47, 143, 91, 0.12)',
  warning: '#C67A1A',
  warningSubtle: 'rgba(198, 122, 26, 0.12)',
  danger: '#C65046',
  dangerSubtle: 'rgba(198, 80, 70, 0.12)',

  skillStrategy: '#5F84F2',
  skillLeadership: '#B96876',
  skillCommunication: '#4E9E83',
  skillCriticalThinking: '#D39A39',

  white: '#FFFFFF',
  black: '#000000',
};

export const Typography = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  tracking: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#A48D72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#A48D72',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 6,
  },
  accent: {
    shadowColor: '#F26B5B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
};
