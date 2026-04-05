type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  copy,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className="mt-6 text-4xl leading-[0.96] text-balance text-(--ink) sm:text-5xl lg:text-[4rem]"
      >
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-(--muted) sm:text-lg">
        {copy}
      </p>
    </div>
  );
}
