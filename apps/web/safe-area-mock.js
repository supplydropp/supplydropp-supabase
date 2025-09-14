module.exports = {
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children, style }) => <div style={style}>{children}</div>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
};
