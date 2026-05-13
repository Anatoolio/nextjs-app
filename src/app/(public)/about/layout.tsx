type TAboutLayout = {
  children: React.ReactNode;
};

const AboutLayout: React.FC<TAboutLayout> = ({ children }) => {
  return <section>{children}</section>;
};

export default AboutLayout;
