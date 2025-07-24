const EditModal = ({
  isOpen,
  title = "Edit",
  fields = [],
  values = {},
  onChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleFieldChange = (name, value) => {
    onChange({ ...values, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {fields.map((field) =>
          field.options ? (
            // Dropdown Field
            <select
              key={field.name}
              value={values[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="border px-3 py-2 rounded mb-3 w-full"
            >
              <option value="">
                {field.placeholder || "Select an option"}
              </option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            // Input Field
            <input
              key={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              className="border px-3 py-2 rounded mb-3 w-full"
              value={values[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          )
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
