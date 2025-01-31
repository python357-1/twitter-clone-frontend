import TwitterNav, { HighlightUrl } from "@/components/TwitterNav";
export default function Notifications() {
  return (
    <>
      <div className="flex">
        <TwitterNav highlight={HighlightUrl.Notifications} />
        <h1 className="flex-1">NOTIFICATIONS</h1>
      </div>
    </>
  );
}
