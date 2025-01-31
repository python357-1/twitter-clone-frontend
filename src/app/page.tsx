import TwitterNav, { HighlightUrl } from "@/components/TwitterNav";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <TwitterNav highlight={HighlightUrl.Home} />
        <div className="flex-2 text-left">main contnet</div>
      </div>
    </>
  );
}
