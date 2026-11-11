
import type { ContentBlock } from "../../schemas/lesson";

type LessonContentProps = {
  blocks: ContentBlock[];
};

const calloutStyles = {
  tip: "border-frontier-teal",
  warning: "border-frontier-amber",
  important: "border-red-400",
} as const;

function ContentBlockView({
  block,
}: {
  block: ContentBlock;
}) {
  switch (block.type) {
    case "text":
      return (
        <p className="whitespace-pre-wrap leading-8 text-frontier-text/90">
          {block.content}
        </p>
      );

    case "code":
      return (
        <figure className="overflow-hidden rounded-xl border border-white/10">
          <figcaption className="bg-frontier-panel px-4 py-2 text-sm text-frontier-teal">
            {block.language}
          </figcaption>

          <pre className="overflow-x-auto bg-black/40 p-4 text-sm leading-6">
            <code>{block.code}</code>
          </pre>

          {block.explanation && (
            <p className="bg-frontier-panel px-4 py-3 text-sm">
              {block.explanation}
            </p>
          )}
        </figure>
      );

    case "callout":
      return (
        <aside
          className={`rounded-lg border-l-4 bg-frontier-panel p-4 ${calloutStyles[block.variant]}`}
        >
          <p className="mb-1 text-sm font-bold capitalize">
            {block.variant}
          </p>
          <p>{block.content}</p>
        </aside>
      );
  }
}

export function LessonContent({
  blocks,
}: LessonContentProps) {
  return (
    <section
      aria-label="Lesson content"
      className="space-y-6"
    >
      {blocks.map((block, index) => (
        <ContentBlockView key={index} block={block} />
      ))}
    </section>
  );
}

