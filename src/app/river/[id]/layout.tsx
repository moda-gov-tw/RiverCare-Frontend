import { River } from "@/interfaces/river.interface"

export default function RiverLayout({ children }: { children: React.ReactNode }) {
  return <section className="w-full bg-white xl:w-2/5">{children}</section>
}
