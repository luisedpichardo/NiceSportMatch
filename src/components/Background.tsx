import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: any;
  colors: Array<any>;
  style: any;
};

export const Background = ({ children, colors, style }: Props) => {
  return (
    <LinearGradient colors={colors} style={style} useAngle={true} angle={115}>
      {children}
    </LinearGradient>
  );
};
