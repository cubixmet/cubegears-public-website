import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { BottomCTA, SectionLead } from "@/components/MarketingBlocks";
import { WorkshopPhoto } from "@/components/WorkshopPhoto";

export const metadata: Metadata = {
  title: "Car & Bike Workshop Management Software",
  description: "One connected platform for car garages, motorcycle service centres, vehicle jobs, inventory, estimates, invoices and workshop teams.",
};

const modules = [
  { number: "01", name: "Job cards & service", detail: "Follow car and bike repairs from intake and inspection through delivery.", label: "SERVICE" },
  { number: "02", name: "Customers & vehicles", detail: "Organise customer profiles and service history for every vehicle.", label: "RECORDS" },
  { number: "03", name: "Stock & inventory", detail: "Keep spare parts, suppliers and stock movements connected.", label: "INVENTORY" },
  { number: "04", name: "Estimates & invoices", detail: "Build estimates and invoices around real parts and labour.", label: "BILLING" },
  { number: "05", name: "Team & attendance", detail: "Manage staff permissions, shifts, attendance and daily work.", label: "PEOPLE" },
  { number: "06", name: "Reports & insights", detail: "Understand work in progress and workshop records at a glance.", label: "INSIGHTS" },
];

const stages = [
  { number: "01", title: "Check in", copy: "Capture the customer, car or bike, and service concern." },
  { number: "02", title: "Plan the work", copy: "Create a job card and prepare an estimate." },
  { number: "03", title: "Service & update", copy: "Assign tasks, manage parts and record progress." },
  { number: "04", title: "Invoice & deliver", copy: "Complete the job and keep the service history." },
];

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main id="main-content">
        <section className="marketing-hero relative overflow-hidden">
          <div className="page-shell grid items-center gap-12 py-12 sm:py-18 lg:min-h-[660px] lg:grid-cols-[.96fr_1.04fr] lg:gap-14">
            <div className="reveal relative z-10">
              <p className="eyebrow">THE MODERN WORKSHOP WORKSPACE</p>
              <h1 className="mt-6 max-w-[680px] text-[clamp(43px,5.3vw,76px)] font-[850] leading-[1.04] tracking-[-.065em] text-[#151719]">
                Every service job. <span className="text-[#2563eb]">One clear system.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.85] text-[#63666b]">
                Keep your car garage or motorcycle service centre moving with connected job cards, customers, parts, estimates, invoices and staff tools.
              </p>
              <div className="responsive-actions mt-8">
                <Link href="/signup" className="button-primary focus-ring">Create workshop account</Link>
                <Link href="/how-it-works" className="button-secondary focus-ring">Explore how it works</Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3  pt-5 text-[13px] font-semibold text-[#56595d]">
                <span className="flex items-center gap-2"><span className="text-[#2563eb]">✓</span> Car service centres</span>
                <span className="flex items-center gap-2"><span className="text-[#2563eb]">✓</span> Bike workshops</span>
                <span className="flex items-center gap-2"><span className="text-[#2563eb]">✓</span> Multi-team operations</span>
              </div>
            </div>
            <div className="grid min-h-0 grid-cols-1 gap-3 sm:min-h-[480px] sm:grid-cols-[1.3fr_.7fr]">
              <WorkshopPhoto photo="garage" priority className="h-[345px] min-h-0 sm:h-full sm:min-h-[480px]" caption="Automotive service">
                <div className="photo-label"><span className="photo-label-dot" /> CAR SERVICE</div>
                <h2 className="photo-punchline mt-4">Give every vehicle a better service journey.</h2>
              </WorkshopPhoto>
              <div className="grid min-w-0 grid-cols-2 grid-rows-1 gap-3 sm:grid-cols-1 sm:grid-rows-2">
                <WorkshopPhoto photo="bike" priority className="h-[190px] min-h-0 sm:h-full" shade={false}>
                  <div className="photo-label">TWO-WHEELERS</div>
                </WorkshopPhoto>
                <div className="flex flex-col justify-center rounded-[15px] bg-[#2563eb] p-4 text-white sm:p-6">
                  <p className="text-[10px] font-extrabold tracking-[.15em] text-white/75">ONE PLATFORM</p>
                  <p className="mt-4 text-[clamp(17px,2.2vw,28px)] font-extrabold leading-[1.2] tracking-[-.03em]">Cars, bikes & the teams behind them.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="page-shell">
            <SectionLead eyebrow="CONNECTED CAPABILITIES" title="Built for the rhythm of your workshop." description="Manage the work behind each service visit without switching between spreadsheets, paper and scattered notes." />
            <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <article key={module.number} className="marketing-card surface-card-hover flex flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="marketing-number">{module.number}</span>
                    <span className="text-[10px] font-extrabold tracking-[.14em] text-[#99999b]">{module.label}</span>
                  </div>
                  <h3 className="mt-7 text-[21px] font-extrabold tracking-[-.035em] text-[#1b1d1f]">{module.name}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-[#696b6e]">{module.detail}</p>
                </article>
              ))}
            </div>
            <Link href="/features" className="focus-ring mt-9 inline-flex min-h-11 items-center font-extrabold text-[#245bd5] hover:underline">Explore all workshop features</Link>
          </div>
        </section>

        <section className="section-pad bg-[#f3f7fd]">
          <div className="page-shell grid items-center gap-12 lg:grid-cols-2">
            <WorkshopPhoto photo="bikeTeam" className="h-[340px] sm:h-[500px]" caption="Two-wheeler service" shade>
              <div className="photo-label"><span className="photo-label-dot" /> FROM THE WORKSHOP FLOOR</div>
              <h2 className="photo-punchline mt-5">Your team stays connected, wherever the job happens.</h2>
            </WorkshopPhoto>
            <div>
              <SectionLead eyebrow="FOR CARS AND TWO-WHEELERS" title="One approach, different service needs." description="Whether you service a family car, motorbike or scooter, CubixGears keeps the job information, service history and daily operations organised." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#e5edf9] bg-white p-5">
                  <h3 className="mt-4 text-lg font-extrabold">Automotive garages</h3>
                  <p className="mt-2 text-sm leading-6 text-[#67696c]">Workshop job flow, vehicle service records and connected parts.</p>
                </div>
                <div className="rounded-xl border border-[#e5edf9] bg-white p-5">
                  <h3 className="mt-4 text-lg font-extrabold">Motorcycle service</h3>
                  <p className="mt-2 text-sm leading-6 text-[#67696c]">Bike maintenance, inspections, job cards and billing.</p>
                </div>
              </div>
              <Link href="/for-workshops" className="button-primary focus-ring mt-7">Explore workshop types</Link>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="page-shell">
            <SectionLead eyebrow="A CLEARER SERVICE JOURNEY" title="From check-in to the final handover." description="A practical, connected flow for technicians, advisors and workshop owners." center />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stages.map((stage) => (
                <article key={stage.number} className="marketing-card p-6 sm:p-7">
                  <span className="text-[36px] font-black tracking-[-.06em] text-[#2563eb]">{stage.number}</span>
                  <h3 className="mt-5 text-[20px] font-extrabold text-[#162e52]">{stage.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#6b6e71]">{stage.copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-9 text-center"><Link href="/how-it-works" className="button-secondary focus-ring">See the complete workflow</Link></div>
          </div>
        </section>

        <section className="section-pad bg-[#f3f7fd]">
          <div className="page-shell grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <SectionLead eyebrow="INSIDE THE SERVICE BAY" title="A platform made for the people doing the work." description="From the reception counter to the technician and the owner, every service job has a clear place." />
              <p className="mt-6 max-w-md text-[15px] leading-8 text-[#686b6e]">Organise vehicle records, job updates and invoices with a shared system. Modules and access depend on your workshop configuration.</p>
              <Link href="/signup" className="button-primary focus-ring mt-7">Start your workshop setup</Link>
            </div>
            <WorkshopPhoto photo="service" className="h-[325px] sm:h-[445px]" caption="Service inspection" shade={false} />
          </div>
        </section>

        <BottomCTA eyebrow="GET STARTED WITH CUBEGEARS" title="Make room for better workshop operations." description="Set up your workspace, then choose the tools your car or motorcycle service team needs." href="/signup" label="Create workshop account" secondaryHref="/contact" secondaryLabel="Get in touch" />
      </main>
      <PublicFooter />
    </>
  );
}
