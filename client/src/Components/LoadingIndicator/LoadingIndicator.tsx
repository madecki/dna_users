import "./LoadingIndicator.css";

export default function LoadingIndicator() {
  return (
    <div className="lds-ellipsis" aria-label="loading in progress">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
