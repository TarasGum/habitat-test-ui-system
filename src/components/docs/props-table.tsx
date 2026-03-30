interface Prop {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/80">
            <th className="px-4 py-3 text-left font-semibold text-zinc-900">Prop</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-900">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-900">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-900 hidden md:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={i < props.length - 1 ? "border-b border-zinc-100" : ""}
            >
              <td className="px-4 py-3 align-top">
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs font-medium text-zinc-800">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1.5 text-[10px] font-semibold text-red-500">*</span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs text-violet-600">{prop.type}</code>
              </td>
              <td className="px-4 py-3 align-top">
                {prop.default ? (
                  <code className="font-mono text-xs text-zinc-500">{prop.default}</code>
                ) : (
                  <span className="text-xs text-zinc-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-zinc-600 hidden md:table-cell">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
