import React from "react";
import '../buttons/Buttons.css';

export const SubmitButton = ({ text } : { text:string }) => {
  return (
    <button type="submit" className="submit-button">{text}</button>
  );
}

export const AuthButton = ({ text } : { text:string }) => {
  return (
    <button type="submit" className="auth-button">{text}</button>
  );
}