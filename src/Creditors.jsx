// Moved from project root
import Sidebar from "../sideBar.jsx";
import '../fin.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function Creditors() {
    const creditorData = [
        {
            id: 1,
            name: "Supplier One",
            date: "2025-06-02",
            description: "Goods purchased",
            amount: 3500,
            status: "Unpaid",
            contact: "supplier1@example.com"
        },
        {
            id: 2,
            name: "Vendor Two",
            date: "2025-06-04",
            description: "Service invoice",
            amount: 2200,
            status: "Partially Paid",
            contact: "vendor2@example.com"
        },
        {
            id: 3,
            name: "Global Traders",
            date: "2025-06-06",
            description: "Bulk order",
            amount: 8000,
            status: "Paid",
            contact: "global@traders.com"
        }
    ];

    const [results, setResults] = useState([]);
    const [selectedCreditor, setSelectedCreditor] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const updateResults = (e) => {
        const x = e.target.value;
        if (x === "") {
            setResults([]);
        } else {
            const lowerX = x.toLowerCase();
            const startsWith = [];
            const includesButNotStart = [];
            for (const creditor of creditorData) {
                const nameLower = creditor.name.toLowerCase();
                if (nameLower.startsWith(lowerX)) {
                    startsWith.push(creditor);
                } else if (nameLower.includes(lowerX)) {
                    includesButNotStart.push(creditor);
                }
            }
            setResults([...startsWith, ...includesButNotStart]);
        }
    };

    const selectCreditor = (creditor) => {
        setSelectedCreditor(creditor);
        setShowDetails(false);
        setTimeout(() => setShowDetails(true), 10);
    };

    // Simulated transaction data for demo purposes
    const transactionData = [
        { creditorId: 1, year: 2021, amount: 2000, type: 'credit', badDebt: 0 },
        { creditorId: 1, year: 2022, amount: 1500, type: 'credit', badDebt: 100 },
        { creditorId: 2, year: 2023, amount: 2200, type: 'credit', badDebt: 0 },
        { creditorId: 3, year: 2024, amount: 8000, type: 'credit', badDebt: 0 },
        { creditorId: 2, year: 2022, amount: 1000, type: 'credit', badDebt: 200 },
        { creditorId: 3, year: 2023, amount: 3000, type: 'credit', badDebt: 0 },
    ];

    // Helper to get year of first transaction
    function getFirstTransactionYear(creditorId) {
        const txs = transactionData.filter(t => t.creditorId === creditorId);
        if (txs.length === 0) return 'N/A';
        return Math.min(...txs.map(t => t.year));
    }
    // Helper to get bad debt
    function getBadDebt(creditorId) {
        const txs = transactionData.filter(t => t.creditorId === creditorId);
        return txs.reduce((sum, t) => sum + (t.badDebt || 0), 0);
    }
    // Helper to get total due amount
    function getTotalDue(creditorId) {
        const txs = transactionData.filter(t => t.creditorId === creditorId);
        return txs.reduce((sum, t) => sum + (t.amount || 0), 0);
    }

    return (
        <>
            <div className="ledgersBox">
                <Sidebar />
                <div style={{ width: "100%" }}>
                    <div className="ledgersHeroSection">
                        <header className="ledgersHeroSectionHeader">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#333',
                                    fontSize: '1.1em',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 0,
                                    fontFamily: 'inherit',
                                    fontWeight: 500
                                }}>
                                    ← Back to Dashboard
                                </button>
                            </Link>
                            <h1>Creditors</h1>
                        </header>
                        <main>
                            <div>
                                <div className="ledgerSearchBox">
                                    <input type="text" placeholder="Search Creditors" onChange={updateResults} />
                                </div>
                                <div className="ledgerSelectionContainer" style={{ visibility: results.length > 0 ? "visible" : "hidden" }} >
                                    <div className="ledgerResults">
                                        {
                                            results.map((creditor) => (
                                                <div className="ledgerCard" key={creditor.id} onClick={() => selectCreditor(creditor)}>
                                                    <h3>{creditor.name}</h3>
                                                    <p>{creditor.amount}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="ledgerDisplay">
                                <header className="ledgerDisplayHeader">
                                    <h2>{selectedCreditor ? selectedCreditor.name : "No Creditor Selected"}</h2>
                                </header>
                                {selectedCreditor ? (
                                    <div className={`ledgerDetails pop3d${showDetails ? ' show' : ''}`}>
                                        <div>
                                            <p>Name/Company name: {selectedCreditor.name}</p>
                                            <p>Person Of Contact: {selectedCreditor.name}</p>
                                            <p>Designation: {selectedCreditor.designation || 'N/A'}</p>
                                            <p>Contact: {selectedCreditor.contact}</p>
                                            <p>Mail: {selectedCreditor.contact}</p>
                                            <p>Telephone: {selectedCreditor.telephone || 'N/A'}</p>
                                            <p>Vendor Since: {getFirstTransactionYear(selectedCreditor.id)}</p>
                                            <p>Bad Debt: {getBadDebt(selectedCreditor.id)}</p>
                                            <p>Total Due amount: {getTotalDue(selectedCreditor.id)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Please select a creditor to view details.</p>
                                )}
                            </div>
                        </main>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "auto" }}>
                        <div></div>
                        <button className="savetopdfBtn" style={{ opacity: selectedCreditor ? "1" : "0" }}>
                            Save to PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Creditors;
