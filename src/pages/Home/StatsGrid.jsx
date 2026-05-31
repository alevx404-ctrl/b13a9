import React from 'react';
import { Users, Building2, ShieldCheck, Flame } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    { id: 1, name: 'Active Athletes', value: '12,000+', icon: <Users className="h-5 w-5" /> },
    { id: 2, name: 'Verified Venues', value: '450+', icon: <Building2 className="h-5 w-5" /> },
    { id: 3, name: 'Bookings Secured', value: '85,000+', icon: <ShieldCheck className="h-5 w-5" /> },
    { id: 4, name: 'Match Hours Hosted', value: '120k+', icon: <Flame className="h-5 w-5" /> },
  ];

  return (
    <section className="bg-[#111827] border-y border-[#F8FAFC]/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-2 group">
              <div className="p-3 bg-[#166534]/10 rounded-xl text-[#22C55E] group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div>
                <dd className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
                  {stat.value}
                </dd>
                <dt className="text-xs font-semibold text-[#F8FAFC]/50 uppercase tracking-wider mt-0.5">
                  {stat.name}
                </dt>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;