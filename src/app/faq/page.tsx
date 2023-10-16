"use client"

import Footer from "@/components/footer"
import RiverCard from "@/components/river/river-card"
import { Language } from "@/utils/language"

export default function FAQ() {
  const lang = Language()
  return (
    <main className="w-2/5">
      <div className="MainText font-monda text-5xl font-bold text-title">River List</div>
      {/* {Array.from(Array(5).keys()).map((temp, i) => */}
      {lang.faq.map(({ Q, A }, i) => (
        <ul key={i}>
          <li>
            <details className="ring-secondary group my-4 w-full rounded-lg font-monda font-normal ring-1">
              <summary className="MainText flex cursor-pointer list-none justify-between px-4 py-6 text-2xl font-extrabold text-white">
                <span>
                  Q{i + 1} - {Q}
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    height="30"
                    fill="white"
                    shapeRendering="geometricPrecision"
                    stroke="black"
                    strokeLinecap="inherit"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="3 3 18 18"
                    width="30"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="MainText border-t border-title px-4 py-6 text-left text-2xl font-extrabold text-white">
                A{i + 1}:
                <br />
                {A}
              </p>
            </details>
          </li>
        </ul>
      ))}
      {/* )} */}
    </main>
  )
}
