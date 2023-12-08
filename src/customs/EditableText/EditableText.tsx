import "./EditableText.scss";
export const EditableText = ({
  initialText,
  element = "",
  field,
  userRole,
  onBlur,
}) => {
  const handleOnBlur = (value) => {
    onBlur?.(value, field);
  };

  const TitleTag = (element ? element : "span") as keyof JSX.IntrinsicElements;

  return (
    <TitleTag
      role="textbox"
      onBlur={(e) => handleOnBlur(e.currentTarget.innerText)}
      contentEditable={userRole === "recruiter"}
      suppressContentEditableWarning={true}
    >
      {initialText}
    </TitleTag>
  );
};
