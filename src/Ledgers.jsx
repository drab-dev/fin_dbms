// Moved from project root
import Sidebar from "../sideBar.jsx";
import '../fin.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function Ledgers() {
    const ledgerData = [
        {
            id: 1,
            name: "Grocery Shopping",
            date: "2025-06-01",
            description: "Groceries",
            amount: -1200,
            category: "Food",
            paymentMethod: "UPI"
        },
        {
            id: 2,
            name: "Freelance Payment",
            date: "2025-06-01",
            description: "Freelance payment",
            amount: 5000,
            category: "Income",
            paymentMethod: "Bank Transfer"
        },
        {
            id: 3,
            name: "Netflix Subscription",
            date: "2025-06-02",
            description: "Netflix Subscription",
            amount: -499,
            category: "Entertainment",
            paymentMethod: "Credit Card"
        },
        {
            id: 4,
            name: "Daily Commute",
            date: "2025-06-03",
            description: "Bus Fare",
            amount: -50,
            category: "Transport",
            paymentMethod: "Cash"
        },
        {
            id: 5,
            name: "Book Sale",
            date: "2025-06-03",
            description: "Sold old books",
            amount: 800,
            category: "Income",
            paymentMethod: "Cash"
        }
    ];

    const [results, setResults] = useState([]);

    const updateResults = (e) => {
        const x = e.target.value
        if ((x == "")) {
            setResults([])
        } else {
            const lowerX = x.toLowerCase();
            const startsWith = [];
            const includesButNotStart = [];

            for (const ledgerElement of ledgerData) {
                const nameLower = ledgerElement.name.toLowerCase();
                if (nameLower.startsWith(lowerX)) {
                    startsWith.push(ledgerElement);
                } else if (nameLower.includes(lowerX)) {
                    includesButNotStart.push(ledgerElement);
                }
            }

            setResults([...startsWith, ...includesButNotStart]);
        }
    }

    const [selectedLedger, setselectedLedger] = useState(null)

    const selectLedger = (ledgerElement) => {
        setselectedLedger(ledgerElement)
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
                            <h1>Ledgers</h1>
                        </header>
                        <main>
                            <div>
                                <div className="ledgerSearchBox">
                                    <input type="text" name="" id="" placeholder="Search Ledgers" onChange={updateResults} />
                                </div>
                                <div className="ledgerSelectionContainer" style={{ visibility: results.length > 0 ? "visible" : "hidden" }} >
                                    <div className="ledgerResults">
                                        {
                                            results.map((ledgerElement) => {
                                                return (
                                                    <div className="ledgerCard" key={ledgerElement.id} onClick={() => selectLedger(ledgerElement)}>
                                                        <h3>{ledgerElement.name}</h3>
                                                        <p>{ledgerElement.amount}</p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="ledgerDisplay">
                                <header className="ledgerDisplayHeader">
                                    <h2>{selectedLedger ? selectedLedger.name : "No Ledger Selected"}</h2>
                                </header>

                                {selectedLedger ? (
                                    <div className="ledgerDetails">
                                        <div>
                                            <p>
                                                Description: {selectedLedger.description}
                                            </p>
                                            <p>
                                                Amount: {selectedLedger.amount}
                                            </p>
                                            <p>
                                                Date: {selectedLedger.date}
                                            </p>
                                            <p>
                                                Category: {selectedLedger.category}
                                            </p>
                                            <p>
                                                Payment Method: {selectedLedger.paymentMethod}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Please select a ledger to view its details.</p>
                                )}
                            </div>
                        </main>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "auto" }}>
                        <div></div>
                        <button className="savetopdfBtn" style={{ opacity: selectedLedger ? "1" : "0" }}>
                            Save to PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ledgers;
