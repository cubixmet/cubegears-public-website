import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { BottomCTA, SectionLead } from "@/components/MarketingBlocks";
import { WorkshopPhoto } from "@/components/WorkshopPhoto";

export const metadata: Metadata = {
  title: "For Automobile Workshops",
  description: "cubixgear workshop management for car garages, motorcycle service centres, specialist and multi-branch operations.",
};

const workshopTypes = [
  { number: "01", title: "Independent garages", description: "Give smaller teams a practical way to manage daily jobs, customers, parts and payments.", detail: "One place for day-to-day work" },
  { number: "02", title: "Service centres", description: "Help service advisors, mechanics and managers follow the same work-in-progress information.", detail: "Better visibility between teams" },
  { number: "03", title: "Motorcycle & scooter service", description: "Organise bike inspections, repair jobs, spare parts, labour and customer service history.", detail: "Dedicated to two-wheelers" },
  { number: "04", title: "Specialist workshops", description: "Keep a consistent service process for electrical, AC, detailing, body repair and other specialist work.", detail: "A flow that fits the service" },
  { number: "05", title: "Multi-branch teams", description: "Organise operations, staff and records with a more consistent company-wide structure.", detail: "Shared operational structure" },
];

export default function ForWorkshopsPage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="bg-[#f5f8ff]">
        <section className="marketing-hero marketing-hero-dark relative overflow-hidden text-white">
          <div className="page-shell relative grid items-center gap-10 py-16 sm:py-22 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
            <div>
              <p className="eyebrow !text-blue-300">BUILT FOR SERVICE TEAMS</p>
              <h1 className="marketing-text-balance mt-5 text-[clamp(38px,5vw,64px)] font-extrabold leading-[1.09] tracking-[-.058em]">Built for cars, bikes and the teams servicing them</h1>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-slate-300 sm:text-[17px]">Keep the front desk, technicians and managers connected around every car and motorcycle service visit.</p>
              <div className="responsive-actions mt-8">
                <Link href="/signup" className="button-primary focus-ring inline-flex">Create workshop account</Link>
                <Link href="/features" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-[14px] font-bold text-white transition hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Explore features</Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <WorkshopPhoto photo="bikeTeam" className="h-[300px] sm:h-[470px] lg:h-[500px]" priority caption="Two-wheeler repair" shade>
                <div className="photo-label">BIKE WORKSHOPS</div>
              </WorkshopPhoto>
              <WorkshopPhoto photo="service" className="h-[300px] sm:h-[470px] lg:h-[500px]" priority caption="Automotive garage" shade>
                <div className="photo-label">CAR SERVICE</div>
              </WorkshopPhoto>
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <SectionLead eyebrow="A FIT FOR DIFFERENT TEAMS" title="One foundation. Different workshop workflows" description="From local car garages and bike workshops to multi-team service centres, keep the day-to-day work organised." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {workshopTypes.map((item) => (
                <article key={item.number} className="marketing-card surface-card-hover flex flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="marketing-number" aria-hidden="true">{item.number}</span>
                    
                  </div>
                  <h3 className="mt-7 text-[24px] font-extrabold tracking-[-.04em] text-[#17283d]">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-8 text-slate-600">{item.description}</p>
                  <p className="mt-6 border-[#edf2fa] pt-5 text-[13px] font-bold text-[#245bd5]"><span aria-hidden="true">✓ </span>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <BottomCTA eyebrow="A SIMPLER WORKSHOP DAY" title="Give your team one place to work" description="See the service process in action, then set up the workspace that fits your team." href="/how-it-works" label="See the workflow" secondaryHref="/signup" secondaryLabel="Get started" />
      </main>
      <PublicFooter />
    </>
  );
}
