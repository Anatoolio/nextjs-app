export const getLabel = (
  value: string,
  options: readonly { value: string; label: string }[],
) => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};
