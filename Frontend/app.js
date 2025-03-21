// Import Web3.js
const Web3 = require("web3");

// Connect to MetaMask or local Ethereum node
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' });

    const contractAddress = "0xeA2964eF79055Bb86100E2Dd65382369c348d6C6"; // Replace with your contract address
    const contractABI = [ [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "certificateId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "courseName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "issueDate",
                    "type": "uint256"
                }
            ],
            "name": "CertificateIssued",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "certificateId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "CertificateTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "certificateCounter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "certificateOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "certificates",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "courseName",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "issueDate",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_certificateId",
                    "type": "uint256"
                }
            ],
            "name": "getCertificateDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "courseName",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "issueDate",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct CertificationNFT.Certificate",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserCertificates",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_recipient",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_courseName",
                    "type": "string"
                }
            ],
            "name": "issueCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_certificateId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }
            ],
            "name": "transferCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userCertificates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ] ]; // Add the ABI here

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    let userAccount;

    ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        userAccount = accounts[0];
        displayCampaignDetails();
    });

    // Function to display campaign details
    async function displayCampaignDetails() {
        const goal = await contract.methods.goal().call();
        const totalFunds = await contract.methods.totalFunds().call();
        const isActive = await contract.methods.isCampaignActive().call();
        const deadline = await contract.methods.deadline().call();
        const status = isActive ? "Active" : "Ended";

        document.getElementById("goal").textContent = web3.utils.fromWei(goal, "ether");
        document.getElementById("totalFunds").textContent = web3.utils.fromWei(totalFunds, "ether");
        document.getElementById("campaignStatus").textContent = status;
        document.getElementById("deadline").textContent = new Date(deadline * 1000).toLocaleString();

        const userContribution = await contract.methods.contributions(userAccount).call();
        document.getElementById("yourContribution").textContent = web3.utils.fromWei(userContribution, "ether");
    }

    // Handle contribution
    document.getElementById("contributeButton").onclick = async function () {
        const amount = document.getElementById("contributionAmount").value;
        if (amount <= 0) {
            alert("Please enter a valid contribution amount");
            return;
        }

        const weiAmount = web3.utils.toWei(amount, "ether");
        try {
            await contract.methods.contribute().send({
                from: userAccount,
                value: weiAmount
            });
            alert("Contribution successful!");
            displayCampaignDetails(); // Update details after contribution
        } catch (err) {
            console.error("Error while contributing:", err);
        }
    };

    // Handle refund
    document.getElementById("refundButton").onclick = async function () {
        try {
            await contract.methods.getRefund().send({ from: userAccount });
            alert("Refund successful!");
            displayCampaignDetails(); // Update details after refund
        } catch (err) {
            console.error("Error while requesting refund:", err);
        }
    };
}
