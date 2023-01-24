export const IFrameParent = (validationErrors) => {
  return (
    <div
      className="container"
      style={{
        width: "50%",
        marginTop: "43px",
      }}
    >
      <iframe
        src="/iframe"
        width="600"
        height="700"
        title="Form"
        style={{ border: "2px solid red" }}
      ></iframe>
    </div>
  );
};
