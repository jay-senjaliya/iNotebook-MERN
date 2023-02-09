import React from "react";

export default function Alert(props) {
  const capitalized = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: 50 }}>
      {props.alert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{capitalized(props.alert.type)}</strong>:{props.alert.msg}
        </div>
      )}
    </div>
  );
}
