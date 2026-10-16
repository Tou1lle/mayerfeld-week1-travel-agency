export default function TestimonialCard({ text, name, tour }) {
  return (
    <article className="overflow-hidden rounded-[15px] bg-sand p-4">
      <p className="pb-5">{text}</p>
      <h3>{name}</h3>
      <p>{tour}</p>
    </article>
  )
}
