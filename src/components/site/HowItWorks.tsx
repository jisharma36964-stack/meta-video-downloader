const steps = [
  { n: 1, title: "Create Your Content", body: "Generate a video with Meta AI. Locate the clip you personally created in the chat." },
  { n: 2, title: "Get the Link", body: "Tap the share button and copy the video link to your clipboard." },
  { n: 3, title: "Paste URL", body: "Paste the URL into the input box above and hit the Download button." },
  { n: 4, title: "Save File", body: "Save the HD MP4 to your device — ready for editing or sharing." },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          How to Download Meta AI Videos
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
