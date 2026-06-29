export function Overview() {
  return (
    <section id="overview" className="bg-background py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-6 leading-relaxed text-foreground">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About MetaVideoDownloader
        </h2>
        <p>
          MetaVideoDownloader is a free online tool that helps you save the videos you create
          with Meta AI as high-quality MP4 files. When you generate a clip inside a Meta AI chat,
          it stays locked in that conversation — easy to lose and hard to reuse. This tool gives
          you a fast, no-signup way to keep a copy of your own creations on your device, in HD and
          without a watermark.
        </p>

        <h3 className="pt-2 text-xl font-semibold">How to use it (step by step)</h3>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Generate a video with Meta AI and open the clip you created in the chat.</li>
          <li>Tap the share button and copy the public video link to your clipboard.</li>
          <li>Paste that link into the input box at the top of this page.</li>
          <li>Click the Download button and wait a few seconds while we fetch the file.</li>
          <li>Save the HD MP4 to your phone or computer — ready to edit, post, or archive.</li>
        </ol>

        <h3 className="pt-2 text-xl font-semibold">Supported platforms &amp; formats</h3>
        <p>
          The downloader works in any modern web browser on iPhone, Android, Windows, and macOS —
          there is nothing to install. It accepts public Meta AI share links as well as related
          Facebook video links. Videos are delivered as standard <strong>MP4</strong> files
          (H.264 video with AAC audio), which play on virtually every device and import cleanly
          into editing apps. We pass the original file through untouched, so the quality of your
          download matches exactly what Meta AI generated.
        </p>

        <h3 className="pt-2 text-xl font-semibold">Built for responsible use</h3>
        <p>
          We designed this tool for creators who want to own and reuse their own AI-generated
          videos. We do not host, store, or distribute any third-party content, and the tool can
          only access links that are already publicly shareable — never private chats or
          logged-in sessions. You are responsible for making sure you have the rights to any
          content you download. For the full rules, see our Terms of Service, and for how we
          handle data, read our Privacy Policy.
        </p>
      </div>
    </section>
  );
}
