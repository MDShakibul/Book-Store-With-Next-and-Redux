
interface IProps {
  onChange: (dateValue: string) => void;
  id: string;
  value?: string; // Add the 'value' prop to the interface
}

function DatePickerWithPresets({ onChange, id, value }: IProps) {
  // Your DatePickerWithPresets component implementation
  // Make sure to use the 'value' prop to set the initial value of the input field
  return (
    <input
      type="date"
      id={id}
      className="mt-2"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export { DatePickerWithPresets };
