import "./EditableText.scss";
export const EditableText = ({ initialText, field, userRole, onBlur }) => {
  const handleOnBlur = (value) => {
    onBlur?.(value, field);
  };

  return (
    <span
      role="textbox"
      onBlur={(e) => handleOnBlur(e.currentTarget.innerText)}
      contentEditable={userRole === "recruiter"}
      suppressContentEditableWarning={true}
    >
      {initialText}
    </span>
  );
};
