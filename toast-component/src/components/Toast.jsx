import React from 'react';
import { AiOutlineCheckCircle, AiOutlineWarning, AiOutlineInfoCircle, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";
import "./Toast.css";

const iconStyle = { marginRight: '10px' };

const icons = {
    success: <AiOutlineCheckCircle style={iconStyle} />,
    warning: <AiOutlineWarning style={iconStyle} />,
    info: <AiOutlineInfoCircle style={iconStyle} />,
    error: <AiOutlineCloseCircle style={iconStyle} />
}

const Toast = ({ type = "info", message, onClose = () => {}, animation = "slide" }) => {
  return (
    <div className={`toast ${type} ${animation}`}>
        {icons[type]}
        {message}
        <AiOutlineClose className='close-btn' color="white" onClick={onClose} />
    </div>
  )
}

export default Toast