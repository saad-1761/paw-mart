// import React, { useContext, useEffect, useMemo, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { AuthContext } from "../Context/AuthContext";

// const API_BASE = "https://paw-mart-server-roan.vercel.app";

// // subtle palette (works in both themes; not too bright)
// const PIE_COLORS = ["#22c55e", "#f59e0b"]; // green, amber

// const monthKey = (dateStr) => {
//   // expects "YYYY-MM-DD"
//   if (!dateStr || typeof dateStr !== "string") return "Unknown";
//   const [y, m] = dateStr.split("-");
//   if (!y || !m) return "Unknown";
//   return `${y}-${m}`;
// };

// const money = (n) => `৳ ${Number(n || 0).toFixed(0)}`;

// const Statistics = () => {
//   const { user } = useContext(AuthContext);

//   const [listings, setListings] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch all then filter client-side (your server endpoints are public)
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);

//     Promise.all([
//       fetch(`${API_BASE}/listings`).then((r) => r.json()),
//       fetch(`${API_BASE}/orders`).then((r) => r.json()),
//     ])
//       .then(([l, o]) => {
//         if (!mounted) return;
//         setListings(Array.isArray(l) ? l : []);
//         setOrders(Array.isArray(o) ? o : []);
//       })
//       .catch(() => {
//         if (!mounted) return;
//         setListings([]);
//         setOrders([]);
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // ✅ "My" data (based on your schema)
//   // listings: { email } is owner/seller
//   // orders: { sellerEmail } is seller
//   const myListings = useMemo(() => {
//     const myEmail = user?.email;
//     if (!myEmail) return [];
//     return listings.filter((x) => x?.email === myEmail);
//   }, [listings, user?.email]);

//   const myOrders = useMemo(() => {
//     const myEmail = user?.email;
//     if (!myEmail) return [];
//     return orders.filter((x) => x?.sellerEmail === myEmail);
//   }, [orders, user?.email]);

//   // ---- KPI cards
//   const totalListings = myListings.length;
//   const freeListings = myListings.filter(
//     (x) => Number(x?.Price || 0) === 0
//   ).length;
//   const paidListings = totalListings - freeListings;

//   const totalOrders = myOrders.length;
//   const totalRevenue = myOrders.reduce(
//     (sum, o) => sum + Number(o?.price || 0),
//     0
//   );

//   // ---- Chart 1: listings by category (BAR)
//   const listingsByCategory = useMemo(() => {
//     const map = new Map();
//     for (const item of myListings) {
//       const cat = item?.category || "Unknown";
//       map.set(cat, (map.get(cat) || 0) + 1);
//     }
//     // sort descending
//     return Array.from(map.entries())
//       .map(([category, count]) => ({ category, count }))
//       .sort((a, b) => b.count - a.count);
//   }, [myListings]);

//   // ---- Chart 2: free vs paid (PIE)
//   const freePaidData = useMemo(() => {
//     return [
//       { name: "Free", value: freeListings },
//       { name: "Paid", value: paidListings },
//     ];
//   }, [freeListings, paidListings]);

//   // ---- Chart 3: orders trend by month (LINE)
//   const ordersByMonth = useMemo(() => {
//     const map = new Map();
//     for (const o of myOrders) {
//       const key = monthKey(o?.date);
//       const prev = map.get(key) || { month: key, orders: 0, revenue: 0 };
//       map.set(key, {
//         month: key,
//         orders: prev.orders + 1,
//         revenue: prev.revenue + Number(o?.price || 0),
//       });
//     }
//     // sort by YYYY-MM
//     return Array.from(map.values()).sort((a, b) =>
//       a.month.localeCompare(b.month)
//     );
//   }, [myOrders]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[x-50 min-h-[60vh]">
//         <span className="loading loading-dots loading-xl"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="px-3 md:px-6 py-6">
//       <div className="flex flex-col gap-2 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
//           📊 Statistics
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           A quick overview of your listings and orders.
//         </p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             My Listings
//           </p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//             {totalListings}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//             Free: {freeListings} • Paid: {paidListings}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400">My Orders</p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//             {totalOrders}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//             Based on sellerEmail
//           </p>
//         </div>

//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Total Revenue
//           </p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//             {money(totalRevenue)}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//             From your orders
//           </p>
//         </div>

//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Top Category
//           </p>
//           <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
//             {listingsByCategory[0]?.category || "N/A"}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//             {listingsByCategory[0]?.count
//               ? `${listingsByCategory[0].count} listings`
//               : ""}
//           </p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//         {/* Bar: Listings by Category */}
//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <div className="mb-3">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               Listings by Category
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               How your listings are distributed across categories.
//             </p>
//           </div>

//           <div className="h-[280px]">
//             {listingsByCategory.length === 0 ? (
//               <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
//                 No listings found for your account.
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={listingsByCategory}
//                   margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                   <XAxis dataKey="category" tick={{ fontSize: 12 }} />
//                   <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
//                   <Tooltip />
//                   <Bar dataKey="count" barSize={18} radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* Pie: Free vs Paid */}
//         <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <div className="mb-3">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               Free vs Paid Listings
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Free adoption listings compared to paid items.
//             </p>
//           </div>

//           <div className="h-[280px]">
//             {totalListings === 0 ? (
//               <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
//                 No listings found for your account.
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Tooltip />
//                   <Legend />
//                   <Pie
//                     data={freePaidData}
//                     dataKey="value"
//                     nameKey="name"
//                     innerRadius={55}
//                     outerRadius={85}
//                     paddingAngle={3}
//                     strokeWidth={1} // not thick
//                   >
//                     {freePaidData.map((_, index) => (
//                       <Cell
//                         key={index}
//                         fill={PIE_COLORS[index % PIE_COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* Line: Orders trend */}
//         <div className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
//           <div className="mb-3">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//               Orders Trend (Monthly)
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Monthly orders and revenue from your sold products.
//             </p>
//           </div>

//           <div className="h-[320px]">
//             {ordersByMonth.length === 0 ? (
//               <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
//                 No orders found for your account.
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={ordersByMonth}
//                   margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                   <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                   <YAxis
//                     yAxisId="left"
//                     allowDecimals={false}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <YAxis
//                     yAxisId="right"
//                     orientation="right"
//                     tickFormatter={(v) => `৳${v}`}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <Tooltip
//                     formatter={(value, name) =>
//                       name === "revenue"
//                         ? [money(value), "Revenue"]
//                         : [value, "Orders"]
//                     }
//                   />
//                   <Legend />

//                   {/* not thick lines */}
//                   <Line
//                     yAxisId="left"
//                     type="monotone"
//                     dataKey="orders"
//                     strokeWidth={2}
//                     dot={{ r: 2 }}
//                   />
//                   <Line
//                     yAxisId="right"
//                     type="monotone"
//                     dataKey="revenue"
//                     strokeWidth={2}
//                     dot={{ r: 2 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

////

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { AuthContext } from "../Context/AuthContext";

const API_BASE = "https://paw-mart-server-roan.vercel.app";

const monthKey = (dateStr) => {
  // expects "YYYY-MM-DD"
  if (!dateStr || typeof dateStr !== "string") return "Unknown";
  const [y, m] = dateStr.split("-");
  if (!y || !m) return "Unknown";
  return `${y}-${m}`;
};

const money = (n) => `৳ ${Number(n || 0).toFixed(0)}`;

// ✅ theme-based chart colors via your data-theme toggle
const getThemeColors = () => {
  const theme = document.documentElement.getAttribute("data-theme") || "light";

  if (theme === "dark") {
    return {
      bar: "#facc15", // yellow-400
      lineOrders: "#22c55e", // green-500
      lineRevenue: "#f59e0b", // amber-500
      pie: ["#22c55e", "#facc15"], // green, yellow
      grid: "rgba(255,255,255,0.12)",
      tooltipBg: "rgba(17, 24, 39, 0.85)", // gray-900 w/ alpha
      tooltipText: "#e5e7eb", // gray-200
    };
  }

  // light
  return {
    bar: "#6366f1", // indigo-500
    lineOrders: "#0ea5e9", // sky-500
    lineRevenue: "#22c55e", // green-500
    pie: ["#22c55e", "#6366f1"], // green, indigo
    grid: "rgba(0,0,0,0.08)",
    tooltipBg: "rgba(255,255,255,0.95)",
    tooltipText: "#111827",
  };
};

const Statistics = () => {
  const { user } = useContext(AuthContext);

  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Track theme changes so charts update instantly when user toggles theme
  const [themeTick, setThemeTick] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(() => setThemeTick((t) => t + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => getThemeColors(), [themeTick]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      fetch(`${API_BASE}/listings`).then((r) => r.json()),
      fetch(`${API_BASE}/orders`).then((r) => r.json()),
    ])
      .then(([l, o]) => {
        if (!mounted) return;
        setListings(Array.isArray(l) ? l : []);
        setOrders(Array.isArray(o) ? o : []);
      })
      .catch(() => {
        if (!mounted) return;
        setListings([]);
        setOrders([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ "My" data
  // listings: { email } is seller/owner
  // orders: { sellerEmail } is seller
  const myListings = useMemo(() => {
    const myEmail = user?.email;
    if (!myEmail) return [];
    return listings.filter((x) => x?.email === myEmail);
  }, [listings, user?.email]);

  const myOrders = useMemo(() => {
    const myEmail = user?.email;
    if (!myEmail) return [];
    return orders.filter((x) => x?.sellerEmail === myEmail);
  }, [orders, user?.email]);

  // KPIs
  const totalListings = myListings.length;
  const freeListings = myListings.filter(
    (x) => Number(x?.Price || 0) === 0
  ).length;
  const paidListings = totalListings - freeListings;

  const totalOrders = myOrders.length;
  const totalRevenue = myOrders.reduce(
    (sum, o) => sum + Number(o?.price || 0),
    0
  );

  // Chart 1: listings by category (BAR)
  const listingsByCategory = useMemo(() => {
    const map = new Map();
    for (const item of myListings) {
      const cat = item?.category || "Unknown";
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [myListings]);

  // Chart 2: free vs paid (PIE)
  const freePaidData = useMemo(() => {
    return [
      { name: "Free", value: freeListings },
      { name: "Paid", value: paidListings },
    ];
  }, [freeListings, paidListings]);

  // Chart 3: orders trend by month (LINE)
  const ordersByMonth = useMemo(() => {
    const map = new Map();
    for (const o of myOrders) {
      const key = monthKey(o?.date);
      const prev = map.get(key) || { month: key, orders: 0, revenue: 0 };
      map.set(key, {
        month: key,
        orders: prev.orders + 1,
        revenue: prev.revenue + Number(o?.price || 0),
      });
    }
    return Array.from(map.values()).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [myOrders]);

  const topCategory = listingsByCategory[0]?.category || "N/A";
  const topCategoryCount = listingsByCategory[0]?.count || 0;

  const tooltipStyle = useMemo(
    () => ({
      backgroundColor: colors.tooltipBg,
      border: "none",
      borderRadius: "12px",
      color: colors.tooltipText,
      boxShadow: "0 10px 20px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.08)",
    }),
    [colors]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-3 md:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          📊 Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A quick overview of your listings and orders.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            My Listings
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {totalListings}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Free: {freeListings} • Paid: {paidListings}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Orders by customers
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {totalOrders}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Based on sellerEmail
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {money(totalRevenue)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            From your orders
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Top Category
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {topCategory}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {topCategoryCount ? `${topCategoryCount} listings` : ""}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Bar: Listings by Category */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Listings by Category
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              How your listings are distributed across categories.
            </p>
          </div>

          <div className="h-[280px]">
            {listingsByCategory.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No listings found for your account.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={listingsByCategory}
                  margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="count"
                    barSize={18} // ✅ not thick
                    radius={[8, 8, 0, 0]}
                    fill={colors.bar}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie: Free vs Paid */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Free vs Paid Listings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Free adoption listings compared to paid items.
            </p>
          </div>

          <div className="h-[280px]">
            {totalListings === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No listings found for your account.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Pie
                    data={freePaidData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    strokeWidth={1} // ✅ not thick
                  >
                    {freePaidData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={colors.pie[index % colors.pie.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Line: Orders Trend */}
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e2f] p-4">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Orders Trend (Monthly)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monthly orders and revenue from your sold products.
            </p>
          </div>

          <div className="h-80">
            {ordersByMonth.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No orders found for your account.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ordersByMonth}
                  margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />

                  <YAxis
                    yAxisId="left"
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `৳${v}`}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) =>
                      name === "revenue"
                        ? [money(value), "Revenue"]
                        : [value, "Orders"]
                    }
                  />
                  <Legend />

                  {/* ✅ not thick lines */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="orders"
                    stroke={colors.lineOrders}
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke={colors.lineRevenue}
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Small footer note */}
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
        Tip: Listings are counted where{" "}
        <span className="font-semibold">listing.email</span> equals your email,
        and orders where{" "}
        <span className="font-semibold">order.sellerEmail</span> equals your
        email.
      </p>
    </div>
  );
};

export default Statistics;
