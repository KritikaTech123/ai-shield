"use client";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Info, TrendingDown } from "lucide-react";
import { CATEGORIES, CATEGORY_COLORS, type TestRun } from "@/lib/types";

const tooltipStyle = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, fontSize: 11, color: "var(--ink)", boxShadow: "0 5px 20px #0000000b" };
export function RiskChart({ tests, days, endDate }: { tests: TestRun[]; days: number; endDate?: string }) {
  const chartData = useMemo(() => {
    const count = Math.min(90, days || 30);
    return Array.from({ length: count }, (_, i) => {
      const date = endDate ? new Date(`${endDate}T12:00:00`) : new Date(); date.setHours(0,0,0,0); date.setDate(date.getDate() - count + 1 + i);
      const end = new Date(date); end.setDate(end.getDate() + 1);
      const dayTests = tests.filter(t => new Date(t.createdAt) >= date && new Date(t.createdAt) < end);
      return { date: date.toLocaleDateString("en-US", { month:"short", day:"numeric" }), risk: dayTests.length ? Math.round(dayTests.reduce((n,t) => n + t.riskScore, 0) / dayTests.length) : null, tests: dayTests.length };
    });
  }, [tests, days, endDate]);
  return <section className="dash-card risk-chart-card"><div className="dash-card-heading"><div><h3>Risk over time <Info size={13}/></h3><p>A clearer picture of your security posture</p></div><span className="chart-legend"><i/> Average risk score</span></div><div className="chart-container risk-chart-container" role="img" aria-label="Line chart showing average risk score over the selected time range"><ResponsiveContainer width="100%" height="100%" minWidth={0}><AreaChart data={chartData} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}><defs><linearGradient id="risk-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef8357" stopOpacity={.22}/><stop offset="100%" stopColor="#ef8357" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--line)" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={35} tick={{ fill:"var(--muted)",fontSize:9 }} dy={9}/><YAxis domain={[0,100]} ticks={[0,25,50,75,100]} axisLine={false} tickLine={false} tick={{ fill:"var(--muted)",fontSize:9 }}/><Tooltip contentStyle={tooltipStyle} labelStyle={{ color:"var(--ink)",marginBottom:5 }} formatter={(value) => [`${value ?? 0} / 100`, "Risk score"]}/><Area type="monotone" dataKey="risk" stroke="#ef8357" strokeWidth={2.4} fill="url(#risk-gradient)" activeDot={{ r:5, fill:"#ef8357",stroke:"var(--surface)",strokeWidth:3 }} dot={false} connectNulls animationDuration={650}/></AreaChart></ResponsiveContainer></div><div className="chart-footnote"><TrendingDown size={13}/> Lower scores mean fewer successful attacks.<span>{tests.length} tests in this period</span></div></section>;
}
export function OutcomesChart({ tests }: { tests: TestRun[] }) {
  const blocked = tests.reduce((n,t) => n + t.blockedAttacks,0);
  const total = tests.reduce((n,t) => n + t.totalAttacks,0);
  const vulnerable = total - blocked;
  const data = total ? [{name:"Blocked",value:blocked},{name:"Vulnerable",value:vulnerable}] : [{name:"No probes",value:1}];
  const colors = total ? ["#91a788","#ed956e"] : ["#e2e5dc"];
  return <section className="dash-card outcomes-card"><div className="dash-card-heading"><div><h3>Attack outcomes</h3><p>How your agents held up</p></div><span className="small-muted">ALL PROBES</span></div><div className="donut-chart" role="img" aria-label={`${blocked} blocked probes and ${vulnerable} vulnerable probes`}><ResponsiveContainer width="100%" height="100%" minWidth={0}><PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={66} outerRadius={84} paddingAngle={total ? 3 : 0} stroke="none" cornerRadius={4} animationDuration={650}>{data.map((entry,i) => <Cell key={entry.name} fill={colors[i]}/>)}</Pie><Tooltip contentStyle={tooltipStyle}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{total ? Math.round(100 * blocked/total) : 0}<small>%</small></strong><span>attacks blocked</span></div></div><div className="donut-legend"><div><i style={{background:colors[0]}}/><span>Blocked</span><b>{blocked.toLocaleString()}</b><small>{total ? Math.round(blocked/total*100) : 0}%</small></div><div><i style={{background:colors[1] ?? "#ed956e"}}/><span>Vulnerable</span><b>{vulnerable.toLocaleString()}</b><small>{total ? Math.round(vulnerable/total*100) : 0}%</small></div></div></section>;
}
export function SurfaceChart({ tests }: { tests: TestRun[] }) {
  const data = CATEGORIES.map((name,i) => ({name: name === "System prompt" ? "Prompt exposure" : name, value: tests.reduce((n,t) => n + (t.results?.filter(r => r.category === name && r.verdict === "Vulnerable").length ?? 0),0), color:CATEGORY_COLORS[i]}));
  return <section className="dash-card surface-chart-card"><div className="dash-card-heading"><div><h3>Vulnerabilities by surface</h3><p>Know where to focus next</p></div></div><div className="bar-chart-container" role="img" aria-label="Horizontal bar chart of vulnerable probes by attack category"><ResponsiveContainer width="100%" height="100%" minWidth={0}><BarChart data={data} layout="vertical" margin={{top:0,right:25,bottom:0,left:0}} barSize={9}><XAxis type="number" hide/><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={104} tick={{fontSize:10,fill:"var(--muted)"}}/><Tooltip contentStyle={tooltipStyle} cursor={{fill:"var(--hover)"}} formatter={(value) => [value,"Vulnerabilities"]}/><Bar dataKey="value" radius={[0,4,4,0]} animationDuration={650} label={{position:"right",fill:"var(--muted)",fontSize:9}}>{data.map(d => <Cell key={d.name} fill={d.color}/>)}</Bar></BarChart></ResponsiveContainer></div><div className="chart-footnote">Based on simulated probe outcomes.</div></section>;
}
