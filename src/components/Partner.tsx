interface PartnerProps {
  Partners: string[]
}
function Partner({Partners}: PartnerProps) {
  return (
    <section className="px-12 py-6  rounded-xl gap-18 flex bg-black
     items-center justify-center min-w-[200px] w-full overflow-hidden" >{
        Partners.map((name, i) => (
          <div key={i} className="items-center justify-center" >
            <span className="text-xl font-semibold text-text-muted">{name}</span>
            </div>
        ))}
    </section>
  )
}
export default Partner