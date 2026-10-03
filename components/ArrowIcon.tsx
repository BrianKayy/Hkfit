type ArrowDirection = "up-right" | "right" | "left";

export default function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  const paths = {
    "up-right": "M5 19 19 5M5 5h14v14",
    right: "M4 12h16m-7-7 7 7-7 7",
    left: "M20 12H4m7-7-7 7 7 7",
  };
  return <svg className="arrow-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
