import type {TextStyle, ViewStyle} from 'react-native';

export type ColorToken = string;

export type GenesisColorPalette = {
  readonly canvas: ColorToken;
  readonly surface: {
    readonly primary: ColorToken;
    readonly secondary: ColorToken;
    readonly elevated: ColorToken;
    readonly tertiary: ColorToken;
    readonly light: ColorToken;
  };
  readonly ink: {
    readonly primary: ColorToken;
    readonly muted: ColorToken;
    readonly secondary: ColorToken;
    readonly inverse: ColorToken;
    readonly inverseMuted: ColorToken;
  };
  readonly hairline: {
    readonly strong: ColorToken;
    readonly default: ColorToken;
    readonly subtle: ColorToken;
    readonly onLight: ColorToken;
  };
  readonly accent: {
    readonly magma: ColorToken;
    readonly magmaMuted: ColorToken;
  };
  readonly brand: {
    readonly uyuniWhite: ColorToken;
    readonly matterhornWhite: ColorToken;
    readonly craneWhite: ColorToken;
    readonly vikBlack: ColorToken;
    readonly maunaRed: ColorToken;
    readonly tasmanBlue: ColorToken;
    readonly barossaBurgundy: ColorToken;
    readonly dancheongOrange: ColorToken;
    readonly copper: ColorToken;
    readonly gold: ColorToken;
    readonly silver: ColorToken;
    readonly charcoal: ColorToken;
    readonly black: ColorToken;
    readonly border: ColorToken;
    readonly muted: ColorToken;
  };
  readonly semantic: {
    readonly success: ColorToken;
    readonly warning: ColorToken;
    readonly error: ColorToken;
    readonly info: ColorToken;
  };
  readonly overlay: {
    readonly scrim: ColorToken;
    readonly scrimLight: ColorToken;
  };
};

export type GenesisFontFamily = {
  readonly heading: string;
  readonly body: string;
  readonly mono: string;
  readonly arabic: string;
};

export type GenesisTypographyScale = {
  readonly display: TextStyle;
  readonly headline1: TextStyle;
  readonly headline2: TextStyle;
  readonly headline3: TextStyle;
  readonly title: TextStyle;
  readonly bodyLarge: TextStyle;
  readonly body: TextStyle;
  readonly bodySmall: TextStyle;
  readonly label: TextStyle;
  readonly caption: TextStyle;
  readonly overline: TextStyle;
  readonly button: TextStyle;
  readonly link: TextStyle;
};

export type GenesisSpacingScale = {
  readonly hairline: number;
  readonly xxs: number;
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly xxl: number;
  readonly xxxl: number;
  readonly section: number;
  readonly hero: number;
};

export type GenesisRadiusScale = {
  readonly none: number;
  readonly full: number;
};

export type GenesisElevationLevel = 'none' | 'subtle' | 'raised' | 'floating';

export type GenesisElevationStyle = ViewStyle;

export type GenesisButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'text'
  | 'accent';

export type GenesisButtonSize = 'sm' | 'md' | 'lg';

export type GenesisCardVariant = 'elevated' | 'outlined' | 'filled' | 'editorial';

export type GenesisCanvasVariant = 'dark' | 'light';
