type TIngredientsLayout = {
  children: React.ReactNode;
};

const IngredientsLayout: React.FC<TIngredientsLayout> = ({ children }) => {
  return <section>{children}</section>;
};

export default IngredientsLayout;
