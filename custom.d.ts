declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
declare module '*.jpg';
declare module '*.jpeg';
// add SVG, GIF if you import them too
declare module '*.svg';
