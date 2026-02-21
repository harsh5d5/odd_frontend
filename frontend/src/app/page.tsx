'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { Truck, Wrench, Shield, BarChart3, MapPin, ArrowRight } from 'lucide-react';

const features = [
  {
    title: "Asset Management",
    desc: "Register, categorize, and monitor every vehicle in your fleet. Track license plates, load capacity, odometer readings, and lifecycle status in one centralized registry.",
    icon: <MapPin size={28} />,
    accentColor: "bg-orange-500",
    accentLight: "bg-orange-50",
    accentText: "text-orange-500",
    accentBorder: "border-orange-200",
    stats: ["Avg. response: 2.4s", "98% Uptime"],
    visual: (
      <div className="w-full h-full flex flex-col gap-3 p-4">
        <div className="flex gap-3">
          {["Available", "In Shop", "On Trip"].map((s, i) => (
            <div key={i} className={`flex-1 rounded-xl p-3 text-center text-xs font-bold ${i === 0 ? 'bg-green-50 text-green-600' : i === 1 ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-600'}`}>
              <div className="text-2xl font-extrabold mb-1">{i === 0 ? 42 : i === 1 ? 8 : 72}</div>
              {s}
            </div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
          {[85, 62, 94, 45].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-16 text-[10px] text-gray-400 font-bold">TRK-{1001 + i}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${w}%` }} />
              </div>
              <div className="text-[10px] font-bold text-gray-500">{w}%</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Trip Dispatcher",
    desc: "Assign drivers and vehicles to trips with intelligent validation. Prevent overloading, check driver compliance, and optimize routes in real-time.",
    icon: <Truck size={28} />,
    accentColor: "bg-amber-500",
    accentLight: "bg-amber-50",
    accentText: "text-amber-600",
    accentBorder: "border-amber-200",
    stats: ["500+ Trips / Month", "GPS Tracking"],
    visual: (
      <div className="w-full h-full p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live Routes
        </div>
        <div className="flex-1 bg-amber-50/50 rounded-xl p-3 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            <path d="M10,100 Q50,20 100,60 T190,30" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="10" cy="100" r="6" fill="#f59e0b" />
            <circle cx="100" cy="60" r="4" fill="#f59e0b" opacity="0.5" />
            <circle cx="190" cy="30" r="6" fill="#22c55e" />
            <text x="10" y="116" fontSize="8" fill="#888">Depot A</text>
            <text x="170" y="24" fontSize="8" fill="#888">Client B</text>
          </svg>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-lg font-extrabold text-gray-800">142</div>
            <div className="text-[10px] text-gray-400 font-bold">Active</div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-lg font-extrabold text-gray-800">38</div>
            <div className="text-[10px] text-gray-400 font-bold">Pending</div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-lg font-extrabold text-green-600">97%</div>
            <div className="text-[10px] text-gray-400 font-bold">On Time</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Maintenance Logs",
    desc: "Track preventative and reactive maintenance. Auto-mark vehicles as 'In Shop' and get alerts before breakdowns happen to minimize downtime.",
    icon: <Wrench size={28} />,
    accentColor: "bg-orange-400",
    accentLight: "bg-orange-50",
    accentText: "text-orange-500",
    accentBorder: "border-orange-200",
    stats: ["30% Less Downtime", "Predictive Alerts"],
    visual: (
      <div className="w-full h-full p-4 flex flex-col gap-3">
        {[
          { id: "TRK-1012", type: "Oil Change", due: "2 days", status: "Upcoming", color: "text-amber-600 bg-amber-50" },
          { id: "TRK-1045", type: "Brake Inspection", due: "Overdue", status: "Critical", color: "text-red-600 bg-red-50" },
          { id: "TRK-1023", type: "Tire Rotation", due: "1 week", status: "Scheduled", color: "text-green-600 bg-green-50" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold text-gray-800">{item.type}</div>
              <div className="text-[10px] text-gray-400">{item.id} · Due: {item.due}</div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Safety Profiles",
    desc: "Monitor driver performance scores, license expirations, and incident history. Ensure your fleet meets all regulatory and safety standards.",
    icon: <Shield size={28} />,
    accentColor: "bg-red-500",
    accentLight: "bg-red-50",
    accentText: "text-red-500",
    accentBorder: "border-red-200",
    stats: ["Safety Score: 94/100", "0 Incidents"],
    visual: (
      <div className="w-full h-full p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-extrabold text-sm">RS</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Rajesh Sharma</div>
            <div className="text-[10px] text-gray-400">License: Valid · 3 yrs exp</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-green-600">96</div>
            <div className="text-[10px] text-gray-400">Score</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-sm">AK</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Amit Kumar</div>
            <div className="text-[10px] text-gray-400">License: Expiring · 5 yrs exp</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-amber-500">78</div>
            <div className="text-[10px] text-gray-400">Score</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-extrabold text-sm">PV</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Priya Verma</div>
            <div className="text-[10px] text-gray-400">License: Valid · 7 yrs exp</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-green-600">99</div>
            <div className="text-[10px] text-gray-400">Score</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Financial Analytics",
    desc: "Audit fuel expenditure, maintenance ROI, and per-vehicle operational costs. Generate reports that help you make data-driven fleet decisions.",
    icon: <BarChart3 size={28} />,
    accentColor: "bg-orange-500",
    accentLight: "bg-orange-50",
    accentText: "text-orange-600",
    accentBorder: "border-orange-200",
    stats: ["Fuel savings: 18%", "ROI: +34%"],
    visual: (
      <div className="w-full h-full p-4 flex flex-col gap-3">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Monthly Cost Breakdown</div>
        <div className="flex-1 flex items-end gap-2 px-2">
          {[65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 40, 72].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md ${i === 11 ? 'bg-orange-500' : 'bg-orange-200'}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-[8px] text-gray-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
            <div className="text-sm font-extrabold text-green-600">₹2.4L</div>
            <div className="text-[10px] text-gray-400 font-bold">Saved</div>
          </div>
          <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-sm font-extrabold text-orange-600">₹8.1/km</div>
            <div className="text-[10px] text-gray-400 font-bold">Cost/KM</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Scroll Stack Features Section */}
      <section className="bg-white relative">
        <div className="text-center pt-20 pb-4 px-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Core Modules</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Everything you need to <span className="text-primary italic">manage your fleet</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Scroll down to explore all five pillars of FleetFlow&apos;s logistics management platform.
          </p>
        </div>

        <ScrollStack>
          {features.map((feature, idx) => (
            <ScrollStackItem
              key={idx}
              itemClassName={`bg-white border ${feature.accentBorder} shadow-[0_8px_40px_rgba(0,0,0,0.06)]`}
            >
              <div className="flex flex-col md:flex-row items-stretch gap-0 h-full">
                {/* Left Content */}
                <div className="flex-1 flex flex-col justify-center pr-8">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${feature.accentLight} ${feature.accentText} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">{feature.title}</h3>
                  </div>

                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mb-5">{feature.desc}</p>

                  {/* Stats Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {feature.stats.map((stat, sIdx) => (
                      <span key={sIdx} className={`px-3 py-1.5 ${feature.accentLight} ${feature.accentText} text-xs font-bold rounded-full border ${feature.accentBorder}`}>
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`inline-flex items-center gap-2 ${feature.accentText} font-bold text-sm hover:gap-3 transition-all`}>
                    Explore Module <ArrowRight size={16} />
                  </button>
                </div>

                {/* Right Visual */}
                <div className="w-full md:w-[320px] lg:w-[380px] shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-inner">
                  {feature.visual}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <Footer />
    </main >
  );
}
