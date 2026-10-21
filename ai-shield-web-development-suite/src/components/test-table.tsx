"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpDown, ArrowUpRight, Bot, ChevronLeft, ChevronRight, Search, SearchX, Download } from "lucide-react";
import { type TestRun, severityForScore } from "@/lib/types";
import { exportTests, relativeTime } from "@/lib/client";
export function RiskBadge({ score }: { score: number }) {
  const severity = severityForScore(score);
  return <span className={`risk-badge risk-${severity.toLowerCase()}`}><b>{score}</b><span>{severity}</span></span>;
}
export function TestTable({ tests, onOpen, compact = false, onViewAll }: { tests: TestRun[]; onOpen: (test: TestRun) => void; compact?: boolean; onViewAll?: () => void }) {
  const [query,setQuery] = useState("");
  const [risk,setRisk] = useState("All risk levels");
  const [sort,setSort] = useState<{key:"createdAt"|"riskScore"|"agentName";ascending:boolean}>({key:"createdAt",ascending:false});
  const [page,setPage] = useState(0);
  const filtered = useMemo(() => tests.filter(t => `${t.agentName} ${t.name}`.toLowerCase().includes(query.toLowerCase()) && (risk === "All risk levels" || severityForScore(t.riskScore) === risk)).sort((a,b) => {
    const av = a[sort.key], bv = b[sort.key];
    const result = typeof av === "number" && typeof bv === "number" ? av-bv : String(av).localeCompare(String(bv));
    return result * (sort.ascending ? 1 : -1);
  }), [tests,query,risk,sort]);
  const pageSize = compact ? 5 : 10;
  const maxPage = Math.max(0,Math.ceil(filtered.length/pageSize)-1);
  const current = Math.min(page,maxPage);
  const shown = filtered.slice(current*pageSize,current*pageSize+pageSize);
  function changeSort(key: typeof sort.key) { setSort({key,ascending:sort.key === key ? !sort.ascending : true}); setPage(0); }
  return <section className={`dash-card tests-card ${compact ? "tests-compact" : ""}`}><div className="dash-card-heading"><div><h3>{compact ? "Recent test runs" : "Test history"}<span className="count-badge">{tests.length}</span></h3>{!compact && <p>Every test. Every result. All in one place.</p>}</div>{compact ? <button className="text-link" onClick={onViewAll}>View all <ArrowUpRight size={13}/></button> : <button className="button button-outline button-small" onClick={() => exportTests(filtered)} disabled={!filtered.length}><Download size={13}/> Export CSV</button>}</div>{!compact && <div className="table-controls"><label className="search-input"><Search size={15}/><input value={query} onChange={e => {setQuery(e.target.value);setPage(0);}} placeholder="Search agents or test names…" aria-label="Search test history"/></label><select value={risk} aria-label="Filter by risk level" onChange={e => {setRisk(e.target.value);setPage(0);}}>{["All risk levels","Low","Medium","High","Critical"].map(r => <option key={r}>{r}</option>)}</select></div>}<div className="table-scroll"><table className="data-table"><thead><tr><th><button onClick={() => changeSort("agentName")}>Agent <ArrowUpDown size={11}/></button></th>{!compact && <th>Test name</th>}<th>Status</th><th><button onClick={() => changeSort("riskScore")}>Risk score <ArrowUpDown size={11}/></button></th>{!compact && <th>Probes blocked</th>}<th><button onClick={() => changeSort("createdAt")}>Last run <ArrowDown size={11}/></button></th><th><span className="sr-only">Open report</span></th></tr></thead><tbody>{shown.map(test => <tr key={test.id}><td><button className="table-agent" onClick={() => onOpen(test)}><span className="table-agent-icon"><Bot size={15}/></span><span>{test.agentName}{!compact && <small>{test.environment}</small>}</span></button></td>{!compact && <td><span className="test-name-cell">{test.name}</span></td>}<td><span className="status-complete"><i/>Completed</span></td><td><RiskBadge score={test.riskScore}/></td>{!compact && <td><div className="blocked-cell">{test.blockedAttacks}<span>/ {test.totalAttacks}</span><div><i style={{width:`${test.blockedAttacks/test.totalAttacks*100}%`}}/></div></div></td>}<td className="muted-cell">{relativeTime(test.createdAt)}</td><td><button className="icon-button table-open" aria-label={`Open report for ${test.agentName}`} onClick={() => onOpen(test)}><ArrowUpRight size={15}/></button></td></tr>)}</tbody></table>{!shown.length && <div className="empty-state"><SearchX size={30}/><h3>No matching tests</h3><p>Try another search or adjust your date and environment filters.</p>{query || risk !== "All risk levels" ? <button className="text-link" onClick={() => {setQuery("");setRisk("All risk levels");}}>Clear table filters</button> : null}</div>}</div>{!compact && <div className="table-pagination"><span>Showing {filtered.length ? current*pageSize+1 : 0}–{Math.min((current+1)*pageSize,filtered.length)} of {filtered.length} tests</span><div><button className="icon-button" onClick={() => setPage(current-1)} disabled={current===0} aria-label="Previous page"><ChevronLeft size={16}/></button><span>Page {current+1} of {maxPage+1}</span><button className="icon-button" onClick={() => setPage(current+1)} disabled={current>=maxPage} aria-label="Next page"><ChevronRight size={16}/></button></div></div>}</section>;
}
