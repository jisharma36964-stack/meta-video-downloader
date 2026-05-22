import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I download a Meta AI video by link?",
    a: "Copy the video URL from the Meta AI chat, paste it into the input above, and click Download. Our system fetches the file and streams it to your device as an MP4.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes. You can download Meta AI videos free of charge — no subscription, no credits.",
  },
  {
    q: "Can I save my AI-generated video with sound?",
    a: "Yes. We pass through the original video and audio so you get a complete, ready-to-watch MP4.",
  },
  {
    q: "Does this tool work on mobile?",
    a: "Yes. It's an online downloader that runs in any modern browser — iPhone, Android, or desktop.",
  },
  {
    q: "What type of file will I get?",
    a: "A standard HD MP4 file, compatible with all devices and editing software, without watermarks.",
  },
  {
    q: "Is it legal to save these videos?",
    a: "Only download Meta AI videos you generated yourself or have permission to use. Always respect copyright.",
  },
  {
    q: "Why did my download fail?",
    a: "Make sure you pasted a valid direct video URL. If the link is expired, private, or auth-protected, our downloader cannot access the file.",
  },
  {
    q: "What if the link expires?",
    a: "If a Meta AI share link expires, the file can no longer be fetched. Save your videos right after generating them.",
  },
  {
    q: "Do you store my videos on your servers?",
    a: "No. We stream the file through our server only to deliver it to your device — nothing is saved.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
