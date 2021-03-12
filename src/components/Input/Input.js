import React from "react";
import PropTypes from 'prop-types';

import "./Input.scss";

const Input = ({
    type='text', 
    onChange,
     value,
      className=' ', 
      loading=false,
      placeholder
    }) => {
            return (
                <Input
                type={type}
                    onChange={onChange}
                    value={value}
                    className={`app-Input  ${className}`}
                    disaabledr={loading}
                    placeholder={placeholder}
                   />

  )
}
Input.propTypes={
    type:PropTypes.string,
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    className:PropTypes.string,
    loading:PropTypes.bool,
    placeholder:PropTypes.string
}

export default Input;