import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: any;
  colors: Array<any>;
  style: any;
  useAngle: boolean;
  angle: number;
};

export const Background = ({
  children,
  colors,
  style,
  useAngle,
  angle,
}: Props) => {
  return (
    <LinearGradient
      colors={colors}
      style={style}
      useAngle={useAngle}
      angle={angle}
    >
      {children}
    </LinearGradient>
  );
};
