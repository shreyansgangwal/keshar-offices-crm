import { useState, useEffect, useMemo, useCallback } from "react";

const RATE = 55;

const offices = [
  {no:601,area:485,loc:"Corner Back LHS",status:"Sold",tenant:"Ravindra Dixit",floor:6},
  {no:602,area:657,loc:"Back LHS",status:"Sold",tenant:"SkyHigh",floor:6},
  {no:603,area:793.5,loc:"Back LHS",status:"Sold",tenant:"Real Rockers",floor:6},
  {no:604,area:801,loc:"Back LHS",status:"Sold",tenant:"TCV",floor:6},
  {no:605,area:615.68,loc:"Back LHS",status:"Sold",tenant:"Manoj Sharma",floor:6},
  {no:606,area:630,loc:"Back RHS",status:"Lease",tenant:"Mahindra & Mahindra",floor:6},
  {no:607,area:701,loc:"Back RHS",status:"Lease",tenant:"Mahindra & Mahindra",floor:6},
  {no:608,area:708,loc:"Back RHS",status:"Lease",tenant:"Mahindra & Mahindra",floor:6},
  {no:609,area:673,loc:"Back RHS",status:"Empty",tenant:"",floor:6},
  {no:610,area:704,loc:"Corner Back RHS",status:"Empty",tenant:"",floor:6},
  {no:611,area:963,loc:"Corner Front RHS",status:"Lease",tenant:"HPCL",floor:6},
  {no:612,area:842,loc:"Front",status:"Lease",tenant:"HPCL",floor:6},
  {no:613,area:650,loc:"Front",status:"Lease",tenant:"HPCL",floor:6},
  {no:614,area:644,loc:"Front",status:"Lease",tenant:"HPCL",floor:6},
  {no:615,area:640,loc:"Front",status:"Sold",tenant:"Kaushalendra Singh",floor:6},
  {no:616,area:534,loc:"Front",status:"Sold",tenant:"Manasva Jhari",floor:6},
  {no:617,area:490,loc:"Front",status:"Sold",tenant:"Shiv Shankar Agarwal",floor:6},
  {no:618,area:537,loc:"Front",status:"Lease",tenant:"Life in Frames",floor:6},
  {no:619,area:736,loc:"Front",status:"Sold",tenant:"Satish Sharma",floor:6},
  {no:620,area:735,loc:"Front",status:"Empty",tenant:"",floor:6},
  {no:621,area:786,loc:"Front",status:"Sold",tenant:"Devendra Sharma",floor:6},
  {no:622,area:889,loc:"Corner Front LHS",status:"Empty",tenant:"",floor:6},
  {no:701,area:485,loc:"Corner Back LHS",status:"Sold",tenant:"Motwani",floor:7},
  {no:702,area:657,loc:"Back LHS",status:"Lease",tenant:"Max Life",floor:7},
  {no:703,area:793.5,loc:"Back LHS",status:"Lease",tenant:"Max Life",floor:7},
  {no:704,area:801,loc:"Back LHS",status:"Lease",tenant:"Global One",floor:7},
  {no:705,area:615.68,loc:"Back LHS",status:"Lease",tenant:"Global One",floor:7},
  {no:706,area:630,loc:"Back RHS",status:"Empty",tenant:"",floor:7},
  {no:707,area:701,loc:"Back RHS",status:"Empty",tenant:"",floor:7},
  {no:708,area:708,loc:"Back RHS",status:"Empty",tenant:"",floor:7},
  {no:709,area:673,loc:"Back RHS",status:"Empty",tenant:"",floor:7},
  {no:710,area:704,loc:"Corner Back RHS",status:"Empty",tenant:"",floor:7},
  {no:711,area:963,loc:"Corner Front RHS",status:"CoWork",tenant:"MileStone",floor:7},
  {no:712,area:842,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:713,area:650,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:714,area:644,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:715,area:640,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:716,area:534,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:717,area:490,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:718,area:537,loc:"Front",status:"CoWork",tenant:"MileStone",floor:7},
  {no:719,area:736,loc:"Front",status:"Empty",tenant:"",floor:7},
  {no:720,area:735,loc:"Front",status:"Empty",tenant:"",floor:7},
  {no:721,area:786,loc:"Front",status:"Empty",tenant:"",floor:7},
  {no:722,area:889,loc:"Corner Front LHS",status:"Lease",tenant:"India First",floor:7},
  {no:801,area:485,loc:"Corner Back LHS",status:"Sold",tenant:"AK Sharma",floor:8},
  {no:802,area:657,loc:"Back LHS",status:"Empty",tenant:"",floor:8},
  {no:803,area:793.5,loc:"Back LHS",status:"Empty",tenant:"",floor:8},
  {no:804,area:801,loc:"Back LHS",status:"Empty",tenant:"",floor:8},
  {no:805,area:615.68,loc:"Back LHS",status:"Empty",tenant:"",floor:8},
  {no:806,area:630,loc:"Back RHS",status:"Empty",tenant:"",floor:8},
  {no:807,area:701,loc:"Back RHS",status:"Empty",tenant:"",floor:8},
  {no:808,area:708,loc:"Back RHS",status:"Empty",tenant:"",floor:8},
  {no:809,area:673,loc:"Back RHS",status:"Empty",tenant:"",floor:8},
  {no:810,area:704,loc:"Corner Back RHS",status:"Empty",tenant:"",floor:8},
  {no:811,area:963,loc:"Corner Front RHS",status:"Empty",tenant:"",floor:8},
  {no:812,area:842,loc:"Front",status:"Empty",tenant:"",floor:8},
  {no:813,area:650,loc:"Front",status:"Empty",tenant:"",floor:8},
  {no:814,area:644,loc:"Front",status:"Sold",tenant:"Sunil Dubey",floor:8},
  {no:815,area:640,loc:"Front",status:"Sold",tenant:"Santosh Shukla",floor:8},
  {no:816,area:534,loc:"Front",status:"Empty",tenant:"",floor:8},
  {no:817,area:490,loc:"Front",status:"Sold",tenant:"Dharmendra Rathore",floor:8},
  {no:818,area:537,loc:"Front",status:"Empty",tenant:"",floor:8},
  {no:819,area:736,loc:"Front",status:"Empty",tenant:"",floor:8},
  {no:820,area:735,loc:"Front",status:"Sold",tenant:"Ravi Tripathi",floor:8},
  {no:821,area:786,loc:"Front",status:"Sold",tenant:"Sanjeev Tripathi",floor:8},
  {no:822,area:889,loc:"Corner Front LHS",status:"Sold",tenant:"Sanjeev Tripathi",floor:8},
];

const prospectsData = [
  {id:1,name:"LIC Branch 3",cat:"Insurance",sub:"LIC (PSU)",type:"Branch",bldg:"Kushwaha Complex",area:"Tansen Road",phone:"",priority:"Medium",notes:"Older building"},
  {id:2,name:"LIC Branch 4",cat:"Insurance",sub:"LIC (PSU)",type:"Branch",bldg:"Mittal Complex",area:"Kampoo",phone:"",priority:"Medium",notes:""},
  {id:3,name:"New India Assurance",cat:"Insurance",sub:"General (PSU)",type:"Branch",bldg:"Jeevan Bhavan",area:"Sirol Road",phone:"+91-751-4087694",priority:"Medium",notes:""},
  {id:4,name:"United India Insurance",cat:"Insurance",sub:"General (PSU)",type:"Branch",bldg:"Centre Point Complex",area:"Phool Bagh",phone:"",priority:"Medium",notes:""},
  {id:5,name:"Oriental Insurance",cat:"Insurance",sub:"General (PSU)",type:"Branch",bldg:"Hotel Amar Palace",area:"Lashkar",phone:"1800 118 485",priority:"High",notes:"Hotel bldg — upgrade candidate"},
  {id:6,name:"National Insurance",cat:"Insurance",sub:"General (PSU)",type:"Branch",bldg:"Standalone",area:"Inderganj",phone:"",priority:"Medium",notes:""},
  {id:7,name:"HDFC Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Narayan Krishna Bldg",area:"City Centre",phone:"+91 8657589770",priority:"High",notes:"Older, cramped"},
  {id:8,name:"ICICI Prudential Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Narayan Krishna",area:"City Centre",phone:"",priority:"High",notes:"Same bldg as HDFC Life"},
  {id:9,name:"SBI Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"The Empire",area:"City Centre",phone:"1800-267-9090",priority:"Medium",notes:""},
  {id:10,name:"Max Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Orion Tower",area:"City Centre",phone:"0751-4055555",priority:"Medium",notes:"Already tenant (7th fl)"},
  {id:11,name:"Bajaj Allianz Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Anand Deep",area:"City Centre",phone:"1800-209-7272",priority:"High",notes:"Older building"},
  {id:12,name:"Tata AIA Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Pacific Tower",area:"City Centre",phone:"1800-209-7272",priority:"Medium",notes:""},
  {id:13,name:"Kotak Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"NS Tower",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:14,name:"PNB MetLife",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Alaknanda Tower 2",area:"City Centre",phone:"1800-425-6969",priority:"Medium",notes:""},
  {id:15,name:"Bajaj Allianz General",cat:"Insurance",sub:"General (Pvt)",type:"Branch",bldg:"Standalone",area:"Kailash Vihar",phone:"1800-209-5858",priority:"Medium",notes:""},
  {id:16,name:"ICICI Lombard",cat:"Insurance",sub:"General (Pvt)",type:"Branch",bldg:"Business Centre",area:"City Centre",phone:"1800-2666",priority:"Medium",notes:""},
  {id:17,name:"Star Health",cat:"Insurance",sub:"Health",type:"Branch",bldg:"Above Suzuki",area:"City Centre",phone:"0751-4095786",priority:"Medium",notes:""},
  {id:18,name:"Care Health",cat:"Insurance",sub:"Health",type:"Branch",bldg:"Standalone",area:"City Centre",phone:"1800-102-4499",priority:"Medium",notes:""},
  {id:19,name:"Niva Bupa",cat:"Insurance",sub:"Health",type:"Branch",bldg:"Standalone",area:"Patel Nagar",phone:"9711046543",priority:"Medium",notes:"Small — upgrade candidate"},
  {id:20,name:"Bajaj Finance",cat:"NBFC",sub:"Consumer Finance",type:"Branch",bldg:"Kuber Plaza",area:"City Centre",phone:"+91 22 4180 4799",priority:"High",notes:"Growing fast"},
  {id:21,name:"Muthoot Finance",cat:"NBFC",sub:"Gold Loan",type:"Branch",bldg:"Alaknanda Tower",area:"City Centre",phone:"1800-120-2838",priority:"Low",notes:""},
  {id:22,name:"Shriram Finance (Regional)",cat:"NBFC",sub:"Vehicle/MSME",type:"Regional Office",bldg:"Alaknanda Tower",area:"City Centre",phone:"1800-410-7711",priority:"High",notes:"Regional — large space"},
  {id:23,name:"Shriram Finance",cat:"NBFC",sub:"Vehicle/MSME",type:"Branch",bldg:"The Empire",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:24,name:"IIFL Finance",cat:"NBFC",sub:"Diversified",type:"7 Branches",bldg:"Various",area:"Multiple",phone:"+91 7039001900",priority:"Medium",notes:"May consolidate"},
  {id:25,name:"Mahindra Finance",cat:"NBFC",sub:"Vehicle Finance",type:"Branch",bldg:"Om Complex",area:"Jhansi Road",phone:"08069866346",priority:"Medium",notes:"4 branches"},
  {id:26,name:"Cholamandalam Finance",cat:"NBFC",sub:"Vehicle Finance",type:"Branch",bldg:"Om Complex",area:"Jhansi Road",phone:"",priority:"Medium",notes:""},
  {id:27,name:"Tata Capital Housing",cat:"NBFC",sub:"Housing Finance",type:"Branch",bldg:"Athena Block B",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:28,name:"AB Finance",cat:"NBFC",sub:"Diversified",type:"Branch",bldg:"Orion Tower",area:"City Centre",phone:"1800-270-7000",priority:"Medium",notes:""},
  {id:29,name:"HDB Financial",cat:"NBFC",sub:"Diversified",type:"Branch",bldg:"Standalone",area:"Kailash Vihar",phone:"",priority:"Medium",notes:""},
  {id:30,name:"Fusion Finance",cat:"NBFC",sub:"Microfinance",type:"Branch",bldg:"Standalone",area:"Patel Nagar",phone:"",priority:"Medium",notes:""},
  {id:31,name:"LIC Housing Finance",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Jeevan Prakash",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:32,name:"PNB Housing Finance",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Alaknanda Tower",area:"City Centre",phone:"08069572675",priority:"Medium",notes:""},
  {id:33,name:"Aavas Financiers",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Standalone",area:"Patel Nagar",phone:"1800-208-8820",priority:"Medium",notes:""},
  {id:34,name:"Aadhar Housing",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Alaknanda Tower 2",area:"Mahalgaon",phone:"1800-300-42020",priority:"Medium",notes:""},
  {id:35,name:"India Shelter Finance",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Ganpati Plaza",area:"City Centre",phone:"1800-572-8888",priority:"Medium",notes:""},
  {id:36,name:"Grihum Housing",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Alaknanda Tower",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:37,name:"Ummeed Housing",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Vasundra Tower",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:38,name:"Truhome Finance",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Standalone",area:"Patel Nagar",phone:"",priority:"Medium",notes:""},
  {id:39,name:"AB Housing Finance",cat:"Housing Finance",sub:"Housing",type:"Branch",bldg:"Orion Tower",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:40,name:"SBI Zonal Office",cat:"Banking (PSU)",sub:"PSU Bank",type:"Zonal Office",bldg:"SBI Admin Bldg",area:"City Centre",phone:"0751-2447581",priority:"High",notes:"5,000–25,000 sqft"},
  {id:41,name:"PNB Circle Office",cat:"Banking (PSU)",sub:"PSU Bank",type:"Circle Office",bldg:"Vatsal Mansion",area:"City Centre",phone:"9977947111",priority:"High",notes:""},
  {id:42,name:"Bank of Baroda Regional",cat:"Banking (PSU)",sub:"PSU Bank",type:"Regional Office",bldg:"BSNL Exchange Bldg",area:"City Centre",phone:"07880153112",priority:"High",notes:"Upgrade candidate"},
  {id:43,name:"Central Bank Regional",cat:"Banking (PSU)",sub:"PSU Bank",type:"Regional Office",bldg:"Standalone",area:"Jhansi Road",phone:"0751-2402020",priority:"Medium",notes:""},
  {id:44,name:"Union Bank Regional",cat:"Banking (PSU)",sub:"PSU Bank",type:"Regional Office",bldg:"The Empire",area:"City Centre",phone:"0751-2233273",priority:"Medium",notes:""},
  {id:45,name:"Canara Bank Regional",cat:"Banking (PSU)",sub:"PSU Bank",type:"Regional Office",bldg:"Sai Baba Complex",area:"Phoolbag",phone:"",priority:"Medium",notes:""},
  {id:46,name:"Bank of India AMO",cat:"Banking (PSU)",sub:"PSU Bank",type:"Admin Office",bldg:"Sanjay Complex",area:"Jayendraganj",phone:"0751-2333415",priority:"Medium",notes:""},
  {id:47,name:"HDFC Mutual Fund",cat:"Mutual Fund",sub:"AMC",type:"ISC",bldg:"Alaknanda Towers",area:"City Centre",phone:"1800-233-6767",priority:"Medium",notes:""},
  {id:48,name:"ICICI Prudential MF",cat:"Mutual Fund",sub:"AMC",type:"Branch",bldg:"The Empire",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:49,name:"AB Sun Life MF",cat:"Mutual Fund",sub:"AMC",type:"ISC",bldg:"Orion Tower",area:"City Centre",phone:"0751-6499378",priority:"Medium",notes:""},
  {id:50,name:"UTI Mutual Fund",cat:"Mutual Fund",sub:"AMC",type:"Branch",bldg:"Alaknanda Towers",area:"City Centre",phone:"0751-2432777",priority:"Medium",notes:""},
  {id:51,name:"CAMS (R&T)",cat:"Mutual Fund",sub:"Fund Services",type:"R&T",bldg:"Global Apartment",area:"Kailash Vihar",phone:"1800-200-2267",priority:"Medium",notes:""},
  {id:52,name:"Angel One",cat:"Stock Broking",sub:"Broking",type:"4+ Offices",bldg:"Singhal Bhawan",area:"Jayendraganj",phone:"+91 80410 17339",priority:"Medium",notes:""},
  {id:53,name:"HDFC Securities",cat:"Stock Broking",sub:"Broking",type:"Branch",bldg:"Narayan Krishna",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:54,name:"Aavantika Gas Ltd",cat:"Energy / Utility",sub:"CGD",type:"Regional",bldg:"Anandi Building",area:"Morena Road",phone:"0751-4093810",priority:"High",notes:"GAIL & HPCL JV"},
  {id:55,name:"IOCL Indane Area Office",cat:"Energy / Utility",sub:"Petroleum",type:"Area Office",bldg:"Bahadura Residency",area:"Kailash Vihar",phone:"0751-4079936",priority:"Medium",notes:"LPG Sales"},
  {id:56,name:"C.P. Solar Energy",cat:"Energy / Utility",sub:"Solar",type:"Office",bldg:"Akriti Complex",area:"City Centre",phone:"",priority:"Medium",notes:"Solar EPC"},
  {id:57,name:"Reliance Jio (Regional)",cat:"Telecom",sub:"Pvt Telecom",type:"Regional",bldg:"Standalone",area:"City Centre",phone:"0751-4218122",priority:"High",notes:"Regional — needs space"},
  {id:58,name:"Bharti Airtel",cat:"Telecom",sub:"Pvt Telecom",type:"Office",bldg:"Standalone",area:"City Centre",phone:"0751-4000630",priority:"Medium",notes:""},
  {id:59,name:"DigiMonk Technologies",cat:"IT / Software",sub:"IT",type:"HQ",bldg:"STPI IT Park",area:"Morena Link Rd",phone:"7722845500",priority:"Medium",notes:"Also Noida, Bhopal"},
  {id:60,name:"Bannstudio Inc.",cat:"IT / Software",sub:"IT",type:"HQ",bldg:"Alaknanda Tower",area:"City Centre",phone:"",priority:"Medium",notes:"Social Media, SEO"},
  {id:61,name:"Ubitech Solutions",cat:"IT / Software",sub:"IT",type:"HQ",bldg:"Gyan Ganga Bldg",area:"Jayendraganj",phone:"9826274403",priority:"Medium",notes:"101-250 employees"},
  {id:62,name:"Addmen Group",cat:"IT / Software",sub:"IT",type:"Branch",bldg:"Standalone",area:"Thatipur",phone:"9229113522",priority:"Medium",notes:"OMR/OCR Software"},
  {id:63,name:"Markstein Technology",cat:"IT / Software",sub:"IT",type:"Branch",bldg:"Sadbhavana Bldg",area:"City Centre",phone:"0751-4049137",priority:"Medium",notes:"Also Noida"},
  {id:64,name:"ROC (all MP)",cat:"Govt Body",sub:"Central Govt",type:"Regional",bldg:"Sanjay Complex",area:"Jayendraganj",phone:"0751-2321907",priority:"High",notes:"Covers all of MP"},
  {id:65,name:"EPFO Regional Office",cat:"Govt Body",sub:"Central Govt",type:"Regional",bldg:"Bhavishya Nidhi Bhawan",area:"Morena Link Rd",phone:"0751-2638700",priority:"High",notes:"Large office"},
  {id:66,name:"FCI District Office",cat:"Govt Body",sub:"Food & Agri",type:"District",bldg:"Unknown",area:"Gwalior",phone:"",priority:"Medium",notes:""},
  {id:67,name:"MPWLC",cat:"Govt Body",sub:"Food & Agri",type:"Regional",bldg:"Sanjay Complex",area:"Jayendraganj",phone:"",priority:"Medium",notes:""},
  {id:68,name:"MSME Dev Institute",cat:"Govt Body",sub:"Central Govt",type:"Branch",bldg:"Standalone",area:"Birla Nagar",phone:"0751-2422590",priority:"Medium",notes:""},
  {id:69,name:"NHAI PIU Gwalior",cat:"Govt Body",sub:"Infra",type:"Project Unit",bldg:"Standalone",area:"University Rd",phone:"09752097154",priority:"Medium",notes:"Needs larger office"},
  {id:70,name:"Aakash BYJU'S",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"SP Tower",area:"City Centre",phone:"8800013000",priority:"High",notes:"2-3 floors needed"},
  {id:71,name:"ALLEN Career Institute",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"Konark Tower",area:"City Centre",phone:"9513683910",priority:"High",notes:""},
  {id:72,name:"Physics Wallah",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"Standalone",area:"Patel Nagar",phone:"",priority:"Medium",notes:""},
  {id:73,name:"Resonance",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"Bansi Plaza",area:"City Centre",phone:"0744-6655077",priority:"Medium",notes:""},
  {id:74,name:"Career Point",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"G.P. Tower",area:"City Centre",phone:"07440440940",priority:"Medium",notes:""},
  {id:75,name:"FIITJEE",cat:"EdTech",sub:"Coaching",type:"Centre",bldg:"Rama Plaza",area:"City Centre",phone:"0751-4925888",priority:"Medium",notes:""},
  {id:76,name:"Manappuram Finance",cat:"NBFC",sub:"Gold Loan",type:"Branch",bldg:"Standalone",area:"Morar",phone:"",priority:"Low",notes:""},
  {id:77,name:"Pathkind Labs",cat:"Healthcare",sub:"Diagnostics",type:"Lab",bldg:"Standalone",area:"Patel Nagar",phone:"",priority:"Low",notes:""},
  {id:78,name:"Delhivery",cat:"Logistics",sub:"Courier",type:"Office",bldg:"Singhal Bhawan",area:"Jayendraganj",phone:"8069856101",priority:"Low",notes:""},
  {id:79,name:"Ecom Express",cat:"Logistics",sub:"Courier",type:"Office",bldg:"Ganpati Plaza",area:"City Centre",phone:"8376888888",priority:"Low",notes:""},
  {id:80,name:"MP Pollution Board",cat:"Govt Body",sub:"Regulatory",type:"Zonal",bldg:"Standalone",area:"DD Nagar",phone:"0751-2472020",priority:"Medium",notes:""},
  {id:81,name:"MP Mandi Board",cat:"Govt Body",sub:"Food & Agri",type:"Zonal",bldg:"Unknown",area:"Gwalior",phone:"",priority:"Medium",notes:"6 districts"},
  {id:82,name:"KFintech (R&T)",cat:"Mutual Fund",sub:"Fund Services",type:"R&T",bldg:"Standalone",area:"MLB Road",phone:"9300004262",priority:"Medium",notes:""},
  {id:83,name:"Motilal Oswal",cat:"Stock Broking",sub:"Broking",type:"Branch",bldg:"Unknown",area:"City Centre",phone:"",priority:"Medium",notes:""},
  {id:84,name:"Vodafone Idea",cat:"Telecom",sub:"Telecom",type:"Store",bldg:"Paras Mani Mall",area:"Jayendraganj",phone:"8291092188",priority:"Low",notes:""},
  {id:85,name:"Aditya Birla Sun Life",cat:"Insurance",sub:"Life (Private)",type:"Branch",bldg:"Unknown",area:"City Centre",phone:"1800-270-7000",priority:"Medium",notes:""},
];

const stages = ["New lead","Contacted","Site visit","Negotiating","Closed"];
const stageColors = ["#4a7fd4","#7c6ec4","#d49a2a","#2a9e6e","#1a6b4a"];

const ours = offices.filter(o => o.status !== "Sold");
const sold = offices.filter(o => o.status === "Sold");
const emptyOffices = offices.filter(o => o.status === "Empty");

const fmtINR = n => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = n => "₹" + (n / 100000).toFixed(1) + "L";

function calcFloor(floor) {
  const list = floor === "all" ? ours : ours.filter(o => o.floor === parseInt(floor));
  const leased = list.filter(o => o.status === "Lease");
  const cowork = list.filter(o => o.status === "CoWork");
  const empty = list.filter(o => o.status === "Empty");
  const leasedArea = leased.reduce((s, o) => s + o.area, 0);
  const coworkArea = cowork.reduce((s, o) => s + o.area, 0);
  const emptyArea = empty.reduce((s, o) => s + o.area, 0);
  const earningArea = leasedArea + coworkArea;
  const totalArea = list.reduce((s, o) => s + o.area, 0);
  return { list, leased, cowork, empty, leasedArea, coworkArea, emptyArea, earningArea, totalArea, rentIn: earningArea * RATE, rentMissed: emptyArea * RATE, occupancy: totalArea > 0 ? earningArea / totalArea * 100 : 0 };
}

function Pill({ active, onClick, children }) {
  return <button onClick={onClick} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, cursor: "pointer", border: "1px solid " + (active ? "#1a1a18" : "#d4d2ca"), background: active ? "#1a1a18" : "transparent", color: active ? "#faf9f5" : "#73726c", transition: "all .15s", whiteSpace: "nowrap", fontFamily: "inherit" }}>{children}</button>;
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#f7f6f2", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: "#8a8880", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || "#1a1a18", fontFeatureSettings: "'tnum'" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#a8a69e", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Badge({ priority }) {
  const colors = { High: { bg: "#fce8e8", color: "#9a2c2c" }, Medium: { bg: "#fdf3dc", color: "#7a5a12" }, Low: { bg: "#f0efea", color: "#8a8880" } };
  const c = colors[priority] || colors.Medium;
  return <span style={{ display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600, background: c.bg, color: c.color }}>{priority}</span>;
}

function OccupancyRing({ pct, size = 100 }) {
  const r = (size - 16) / 2, c = 2 * Math.PI * r;
  const color = pct >= 70 ? "#2a9e6e" : pct >= 40 ? "#d49a2a" : "#d44a4a";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8e7e2" strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${pct/100*c} ${c-pct/100*c}`} strokeLinecap="round" style={{ transition: "stroke-dasharray .6s" }} />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18" }}>{Math.round(pct)}%</div>
        <div style={{ fontSize: 9, color: "#8a8880" }}>occupied</div>
      </div>
    </div>
  );
}

function OfficeCard({ o }) {
  const styles = {
    Lease: { bg: "#e6f5ee", border: "#7fd4b0", numColor: "#0a5038", areaColor: "#1a7a56", rentColor: "#2a9e6e" },
    CoWork: { bg: "#e8f0fa", border: "#8ab8e8", numColor: "#0c447c", areaColor: "#1a6aaa", rentColor: "#3a8add" },
    Empty: { bg: "#fce8e8", border: "#f0a0a0", numColor: "#7a1e1e", areaColor: "#a03030", rentColor: "#d44a4a" },
    Sold: { bg: "#f0efea", border: "#d4d2ca", numColor: "#a8a69e", areaColor: "#b8b6ae", rentColor: "#a8a69e" },
  };
  const s = styles[o.status] || styles.Empty;
  const rent = (o.status === "Lease" || o.status === "CoWork") ? o.area * RATE : 0;
  const missed = o.status === "Empty" ? o.area * RATE : 0;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "8px 10px", opacity: o.status === "Sold" ? 0.5 : 1 }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: s.numColor }}>{o.no}</div>
      <div style={{ fontSize: 11, color: s.areaColor }}>{o.area} sqft · {o.loc}</div>
      <div style={{ fontSize: 11, color: s.numColor, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.tenant || "Vacant"}</div>
      {rent > 0 && <div style={{ fontSize: 11, fontWeight: 600, color: s.rentColor, marginTop: 1 }}>+{fmtINR(rent)}/mo</div>}
      {missed > 0 && <div style={{ fontSize: 11, fontWeight: 600, color: s.rentColor, marginTop: 1 }}>-{fmtINR(missed)}/mo</div>}
    </div>
  );
}

function DashboardPage() {
  const [floor, setFloor] = useState("all");
  const d = calcFloor(floor);
  const floorList = floor === "all" ? [6, 7, 8] : [parseInt(floor)];
  const soldCount = (floor === "all" ? sold : sold.filter(o => o.floor === parseInt(floor))).length;
  const soldArea = (floor === "all" ? sold : sold.filter(o => o.floor === parseInt(floor))).reduce((s, o) => s + o.area, 0);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "6", "7", "8"].map(f => <Pill key={f} active={floor === f} onClick={() => setFloor(f)}>{f === "all" ? "All floors" : `Floor ${f}`}</Pill>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 24 }}>
        <MetricCard label="Rent coming in" value={fmtL(d.rentIn) + "/mo"} sub={Math.round(d.earningArea).toLocaleString("en-IN") + " sqft earning"} color="#2a9e6e" />
        <MetricCard label="Revenue missed" value={fmtL(d.rentMissed) + "/mo"} sub={Math.round(d.emptyArea).toLocaleString("en-IN") + " sqft empty"} color="#d44a4a" />
        <MetricCard label="If 100% leased" value={fmtL(d.totalArea * RATE) + "/mo"} sub={fmtL(d.totalArea * RATE * 12) + "/yr potential"} color="#3a8add" />
        <MetricCard label="Your inventory" value={d.list.length + " offices"} sub={Math.round(d.totalArea).toLocaleString("en-IN") + " sqft leasable"} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28, padding: "16px 20px", background: "#f7f6f2", borderRadius: 12 }}>
        <OccupancyRing pct={d.occupancy} size={110} />
        <div style={{ fontSize: 13, color: "#5a5850", lineHeight: 2 }}>
          <span style={{ fontWeight: 600, color: "#2a9e6e" }}>{d.leased.length} direct leases</span> · {Math.round(d.leasedArea).toLocaleString("en-IN")} sqft · {fmtL(d.leasedArea * RATE)}/mo<br />
          <span style={{ fontWeight: 600, color: "#3a8add" }}>{d.cowork.length} cowork (MileStone)</span> · {Math.round(d.coworkArea).toLocaleString("en-IN")} sqft · {fmtL(d.coworkArea * RATE)}/mo<br />
          <span style={{ fontWeight: 600, color: "#d44a4a" }}>{d.empty.length} vacant</span> · {Math.round(d.emptyArea).toLocaleString("en-IN")} sqft · <span style={{ color: "#d44a4a", fontWeight: 600 }}>-{fmtL(d.rentMissed)}/mo lost</span><br />
          <span style={{ color: "#a8a69e" }}>{soldCount} sold (excluded) · {Math.round(soldArea).toLocaleString("en-IN")} sqft</span>
        </div>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 6px" }}>Revenue by floor</h3>
      <p style={{ fontSize: 12, color: "#8a8880", margin: "0 0 12px" }}>Only your leasable inventory — sold offices excluded</p>
      {floorList.map(f => {
        const fd = calcFloor(String(f));
        if (fd.totalArea === 0) return null;
        const tot = fd.totalArea * RATE;
        return (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 65, fontSize: 13, fontWeight: 600, textAlign: "right", color: "#1a1a18", flexShrink: 0 }}>Floor {f}</div>
            <div style={{ flex: 1, height: 26, background: "#f0efea", borderRadius: 4, overflow: "hidden", display: "flex" }}>
              <div style={{ width: fd.leasedArea * RATE / tot * 100 + "%", height: "100%", background: "#2a9e6e", transition: "width .5s" }} />
              <div style={{ width: fd.coworkArea * RATE / tot * 100 + "%", height: "100%", background: "#3a8add", transition: "width .5s" }} />
              <div style={{ width: fd.emptyArea * RATE / tot * 100 + "%", height: "100%", background: "#d44a4a", transition: "width .5s" }} />
            </div>
            <div style={{ width: 130, fontSize: 11, color: "#73726c", flexShrink: 0 }}><span style={{ color: "#2a9e6e" }}>{fmtL(fd.rentIn)}</span> in · <span style={{ color: "#d44a4a" }}>{fmtL(fd.rentMissed)}</span> gap</div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: 16, margin: "8px 0 24px", fontSize: 11, color: "#8a8880" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#2a9e6e" }} />Direct lease</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#3a8add" }} />CoWork</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#d44a4a" }} />Vacant</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 28 }}>
        <MetricCard label="Annual rent earned" value={fmtL(d.rentIn * 12) + "/yr"} color="#2a9e6e" />
        <MetricCard label="Annual revenue lost" value={fmtL(d.rentMissed * 12) + "/yr"} color="#d44a4a" />
        <MetricCard label="Capture rate" value={Math.round(d.rentIn / (d.totalArea * RATE) * 100) + "%"} sub="of potential revenue" />
        <MetricCard label="Gap to close" value={fmtL(d.rentMissed * 12) + "/yr"} sub={d.empty.length + " offices to fill"} color="#d44a4a" />
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 12px" }}>Office map</h3>
      {floorList.map(f => {
        const floorOurs = ours.filter(o => o.floor === f);
        const floorSold = sold.filter(o => o.floor === f);
        const fd = calcFloor(String(f));
        return (
          <div key={f} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #e8e7e2", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>Floor {f}</span>
              <span style={{ fontSize: 11, color: "#8a8880" }}>{fd.leased.length + fd.cowork.length} earning · {fd.empty.length} vacant · {Math.round(fd.totalArea).toLocaleString("en-IN")} sqft</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))", gap: 5 }}>
              {floorOurs.map(o => <OfficeCard key={o.no} o={o} />)}
            </div>
            {floorSold.length > 0 && (
              <div style={{ marginTop: 6, padding: "6px 10px", background: "#f0efea", borderRadius: 8, fontSize: 11, color: "#a8a69e", display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                <span>Sold (not yours):</span>
                {floorSold.map(o => <span key={o.no} style={{ background: "#e8e7e2", borderRadius: 10, padding: "1px 8px", fontSize: 10 }}>{o.no} · {o.area} sqft · {o.tenant}</span>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CRMPage() {
  const [leads, setLeads] = useState(() => {
    try { const s = localStorage.getItem("kt-crm"); if (s) return JSON.parse(s); } catch (e) {}
    return prospectsData.map(p => ({ ...p, stage: "New lead" }));
  });
  const [search, setSearch] = useState("");
  const [priFilter, setPriFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [sortCol, setSortCol] = useState("priority");
  const [sortDir, setSortDir] = useState("asc");
  const [detailId, setDetailId] = useState(null);

  useEffect(() => { try { localStorage.setItem("kt-crm", JSON.stringify(leads)); } catch(e){} }, [leads]);

  const categories = useMemo(() => ["All", ...new Set(leads.map(l => l.cat))].sort((a,b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)), [leads]);

  const priOrd = p => p === "High" ? 0 : p === "Medium" ? 1 : 2;

  const filtered = useMemo(() => {
    let f = [...leads];
    if (search) { const s = search.toLowerCase(); f = f.filter(l => (l.name + l.cat + l.area + l.sub + l.bldg + l.notes).toLowerCase().includes(s)); }
    if (priFilter !== "All") f = f.filter(l => l.priority === priFilter);
    if (catFilter !== "All") f = f.filter(l => l.cat === catFilter);
    if (stageFilter !== "All") f = f.filter(l => l.stage === stageFilter);
    f.sort((a, b) => {
      let va, vb;
      if (sortCol === "priority") { va = priOrd(a.priority); vb = priOrd(b.priority); }
      else if (sortCol === "stage") { va = stages.indexOf(a.stage); vb = stages.indexOf(b.stage); }
      else { va = (a[sortCol] || "").toString().toLowerCase(); vb = (b[sortCol] || "").toString().toLowerCase(); }
      return sortDir === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
    });
    return f;
  }, [leads, search, priFilter, catFilter, stageFilter, sortCol, sortDir]);

  const changeStage = useCallback((id, stage) => { setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l)); }, []);
  const doSort = col => { if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortCol(col); setSortDir("asc"); } };

  const high = leads.filter(l => l.priority === "High").length;
  const med = leads.filter(l => l.priority === "Medium").length;
  const low = leads.filter(l => l.priority === "Low").length;
  const totalEmptyArea = emptyOffices.reduce((s, o) => s + o.area, 0);
  const missedMo = totalEmptyArea * RATE;

  const detailLead = detailId ? leads.find(l => l.id === detailId) : null;
  const suggestedOffices = detailLead ? emptyOffices.filter(o => {
    if (detailLead.type && (detailLead.type.includes("Regional") || detailLead.type.includes("Zonal") || detailLead.type.includes("Circle"))) return o.area >= 700;
    if (detailLead.cat === "EdTech") return o.area >= 800;
    return true;
  }).slice(0, 6) : [];

  if (detailLead) {
    return (
      <div>
        <button onClick={() => setDetailId(null)} style={{ fontSize: 13, color: "#4a7fd4", cursor: "pointer", background: "none", border: "none", padding: 0, marginBottom: 16, fontFamily: "inherit" }}>← Back to list</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>{detailLead.name}</h2>
            <span style={{ fontSize: 13, color: "#8a8880" }}>{detailLead.cat} · {detailLead.type}</span>
          </div>
          <Badge priority={detailLead.priority} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[["Current building", detailLead.bldg], ["Location", detailLead.area], ["Phone", detailLead.phone || "Not available"], ["Sub-category", detailLead.sub], ["Office type", detailLead.type], ["Notes", detailLead.notes || "—"]].map(([l, v], i) => (
            <div key={i}><div style={{ fontSize: 11, color: "#8a8880", marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a18" }}>{v}</div></div>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#8a8880", marginBottom: 4 }}>Pipeline stage</div>
          <div style={{ display: "flex", gap: 6 }}>{stages.map(s => (
            <button key={s} onClick={() => changeStage(detailLead.id, s)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 16, border: s === detailLead.stage ? "2px solid #1a1a18" : "1px solid #d4d2ca", background: s === detailLead.stage ? "#1a1a18" : "transparent", color: s === detailLead.stage ? "#faf9f5" : "#73726c", cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
          ))}</div>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 10px" }}>Suggested vacant offices</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6 }}>
          {suggestedOffices.map(o => (
            <div key={o.no} style={{ background: "#f7f6f2", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{o.no} · Fl {o.floor}</div>
              <div style={{ fontSize: 11, color: "#8a8880" }}>{o.area} sqft · {o.loc}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#d44a4a", marginTop: 2 }}>{fmtINR(o.area * RATE)}/mo</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 20 }}>
        <MetricCard label="Prospects" value={leads.length} sub={`${high} high · ${med} medium · ${low} low`} />
        <MetricCard label="Vacancy to fill" value={emptyOffices.length + " offices"} sub={Math.round(totalEmptyArea).toLocaleString("en-IN") + " sqft"} color="#d44a4a" />
        <MetricCard label="Monthly gap" value={fmtL(missedMo) + "/mo"} sub={fmtL(missedMo * 12) + "/yr @ ₹55/sqft"} color="#d44a4a" />
        <MetricCard label="Pipeline active" value={leads.filter(l => l.stage !== "New lead").length} sub={leads.filter(l => l.stage === "Closed").length + " closed"} color="#2a9e6e" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 6, marginBottom: 20 }}>
        {stages.map((st, i) => {
          const cnt = leads.filter(l => l.stage === st).length;
          return (
            <div key={st} style={{ background: "#f7f6f2", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 500, color: "#73726c", marginBottom: 4 }}>
                {st}<span style={{ background: "#e8e7e2", borderRadius: 10, padding: "0 6px", fontSize: 10 }}>{cnt}</span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: stageColors[i], width: Math.max(cnt / leads.length * 100, 5) + "%", transition: "width .4s" }} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input type="text" placeholder="Search company, category, area, notes..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: "8px 14px", fontSize: 13, border: "1px solid #d4d2ca", borderRadius: 8, background: "#fff", color: "#1a1a18", fontFamily: "inherit" }} />
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#a8a69e" }}>Priority</span>
        {["All", "High", "Medium", "Low"].map(p => <Pill key={p} active={priFilter === p} onClick={() => setPriFilter(p)}>{p} <span style={{ opacity: .6 }}>{p === "All" ? leads.length : leads.filter(l => l.priority === p).length}</span></Pill>)}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#a8a69e" }}>Category</span>
        {categories.map(c => <Pill key={c} active={catFilter === c} onClick={() => setCatFilter(c)}>{c === "All" ? "All" : c.substring(0, 16)}</Pill>)}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#a8a69e" }}>Stage</span>
        {["All", ...stages].map(s => <Pill key={s} active={stageFilter === s} onClick={() => setStageFilter(s)}>{s}</Pill>)}
      </div>

      <div style={{ overflowX: "auto", maxHeight: 520, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {[["name","Company"],["cat","Category"],["priority","Priority"],["stage","Stage"],["area","Location"],["bldg","Building"],["phone","Phone"],["notes","Notes"]].map(([k, l]) => (
                <th key={k} onClick={() => doSort(k)} style={{ textAlign: "left", padding: "8px 8px", fontWeight: 500, color: "#8a8880", borderBottom: "1px solid #e8e7e2", fontSize: 11, cursor: "pointer", userSelect: "none", position: "sticky", top: 0, background: "#faf9f5", whiteSpace: "nowrap" }}>
                  {l} <span style={{ opacity: sortCol === k ? 1 : .3, fontSize: 9 }}>{sortCol === k ? (sortDir === "asc" ? "▲" : "▼") : "▲"}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={8} style={{ textAlign: "center", padding: 30, color: "#a8a69e" }}>No leads match filters</td></tr> : filtered.map(l => (
              <tr key={l.id} style={{ cursor: "default" }} onMouseEnter={e => e.currentTarget.style.background = "#f7f6f2"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea" }}>
                  <span onClick={() => setDetailId(l.id)} style={{ fontWeight: 600, color: "#1a1a18", cursor: "pointer" }}>{l.name}</span>
                  <span style={{ display: "block", fontSize: 10, color: "#a8a69e" }}>{l.type}</span>
                </td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea", fontSize: 11 }}>{l.sub}</td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea" }}><Badge priority={l.priority} /></td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea" }}>
                  <select value={l.stage} onChange={e => changeStage(l.id, e.target.value)} style={{ fontSize: 11, padding: "2px 4px", border: "1px solid #d4d2ca", borderRadius: 6, background: "#fff", color: "#1a1a18", fontFamily: "inherit" }}>
                    {stages.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea", fontSize: 11 }}>{l.area}</td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea", fontSize: 11 }}>{l.bldg}</td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea", fontSize: 11 }}>{l.phone || "—"}</td>
                <td style={{ padding: "6px 8px", borderBottom: "1px solid #f0efea", fontSize: 11, maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#8a8880" }} title={l.notes}>{l.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SoldPage() {
  const floors = [6, 7, 8];
  const totalSoldArea = sold.reduce((s, o) => s + o.area, 0);
  return (
    <div>
      <p style={{ fontSize: 13, color: "#8a8880", margin: "0 0 20px" }}>These {sold.length} offices ({Math.round(totalSoldArea).toLocaleString("en-IN")} sqft) are third-party owned and excluded from all revenue calculations.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 24 }}>
        <MetricCard label="Total sold" value={sold.length + " offices"} />
        <MetricCard label="Sold area" value={Math.round(totalSoldArea).toLocaleString("en-IN") + " sqft"} />
        {floors.map(f => {
          const fs = sold.filter(o => o.floor === f);
          return <MetricCard key={f} label={`Floor ${f}`} value={fs.length + " offices"} sub={Math.round(fs.reduce((s, o) => s + o.area, 0)).toLocaleString("en-IN") + " sqft"} />;
        })}
      </div>
      {floors.map(f => {
        const fs = sold.filter(o => o.floor === f);
        if (!fs.length) return null;
        return (
          <div key={f} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Floor {f} — {fs.length} sold</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 6 }}>
              {fs.map(o => (
                <div key={o.no} style={{ background: "#f0efea", borderRadius: 8, padding: "8px 10px", opacity: .7 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#73726c" }}>{o.no}</div>
                  <div style={{ fontSize: 11, color: "#a8a69e" }}>{o.area} sqft · {o.loc}</div>
                  <div style={{ fontSize: 11, color: "#8a8880", marginTop: 1 }}>{o.tenant}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "◉" },
    { key: "crm", label: "Leasing CRM", icon: "◎" },
    { key: "sold", label: "Sold offices", icon: "◇" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Satoshi', system-ui, sans-serif", background: "#faf9f5", minHeight: "100vh", color: "#1a1a18" }}>
      <div style={{ borderBottom: "1px solid #e8e7e2", background: "#faf9f5", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#1a1a18", display: "flex", alignItems: "center", justifyContent: "center", color: "#faf9f5", fontSize: 13, fontWeight: 700 }}>K</div>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>Keshar Towers</span>
            <span style={{ fontSize: 11, color: "#a8a69e", marginLeft: 4, paddingTop: 2 }}>Leasing management</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {navItems.map(n => (
              <button key={n.key} onClick={() => setPage(n.key)} style={{
                padding: "8px 16px", fontSize: 13, fontWeight: page === n.key ? 600 : 400, color: page === n.key ? "#1a1a18" : "#8a8880",
                background: page === n.key ? "#f0efea" : "transparent", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                display: "flex", alignItems: "center", gap: 6
              }}>
                <span style={{ fontSize: 11 }}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a18", margin: "0 0 4px", letterSpacing: "-0.03em" }}>
          {page === "dashboard" ? "Office dashboard" : page === "crm" ? "Leasing CRM" : "Sold offices"}
        </h1>
        <p style={{ fontSize: 13, color: "#8a8880", margin: "0 0 24px" }}>
          {page === "dashboard" ? "Revenue tracking across floors 6, 7 & 8 — sold offices excluded" : page === "crm" ? "85 prospects · pipeline tracking · office matching" : "Third-party owned — excluded from all calculations"}
        </p>
        {page === "dashboard" && <DashboardPage />}
        {page === "crm" && <CRMPage />}
        {page === "sold" && <SoldPage />}
      </div>
    </div>
  );
}
