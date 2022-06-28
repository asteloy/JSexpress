import React from 'react';

const InputField = ({
  type,
  value,
  onBlur,
  onChange,
  placeholder,
}) => {
  return (
    /* beautify ignore:start */
    <label style={{ display: 'block' }}>
      <div class="input-group mt-2">
        <input
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          style={{ flex: 0.5 }}
        />
      </div>
    </label>
    /* beautify ignore:end */
  )
}

export default InputField;