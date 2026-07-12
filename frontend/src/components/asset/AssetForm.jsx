import React, { useState } from 'react';

/**
 * Reusable form wrapper for registering and modifying assets inventory details.
 */
const AssetForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditMode = false,
  validate,
  className = '',
  ...props
}) => {
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    category: '',
    status: '',
    location: '',
    description: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(formData);
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`custom-asset-form ${className}`} {...props}>
      <div className="form-group">
        <label htmlFor="name">Asset Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tag">Asset Tag</label>
        <input
          id="tag"
          name="tag"
          type="text"
          value={formData.tag}
          onChange={handleChange}
        />
        {errors.tag && <span className="form-error">{errors.tag}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span className="form-error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <input
          id="status"
          name="status"
          type="text"
          value={formData.status}
          onChange={handleChange}
        />
        {errors.status && <span className="form-error">{errors.status}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <span className="form-error">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">{isEditMode ? 'Save Changes' : 'Create Asset'}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AssetForm;
