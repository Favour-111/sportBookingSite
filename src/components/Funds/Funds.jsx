import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const Funds = ({ open, setOpen, userToken }) => {
  const prices = [100, 250, 500, 1000, 2000, 3000, 5000];

  // State to hold selected amount and custom amount
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [balance, setBalance] = useState(0);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  // Handle quick selection of amount
  const handleQuickSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount if quick select is chosen
    setError(""); // Clear any previous error
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);

    setSelectedAmount("");
    // Validate custom amount
    if (value < 10 || value > 50000) {
      setError("Amount must be between $10 and $50,000");
    } else {
      setError(""); // Clear error when valid
    }
  };

  // Handle Deposit button click
  const handleDeposit = async () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      setError("Please select or enter an amount to deposit.");
      return;
    }

    if (amount < 10 || amount > 50000) {
      setError("Amount must be between $10 and $50,000");
      return;
    }

    setLoading(true); // Show loading state
    try {
      // Send deposit request to backend
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/deposit`, // This endpoint should update the user's balance in your backend
        { userId, amount },
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Assuming you pass the JWT token for authentication
          },
        }
      );

      if (response) {
        // Assuming the response contains the updated balance
        const { availableBalance } = response.data.availableBalance;

        // Update balance in the parent component
        updateBalance(availableBalance);

        // Log success message
        toast.success(`${amount} has been deposited into your account`);

        console.log("Deposit successful", response.data);
      } else {
        setError("Error processing deposit.");
      }
    } catch (error) {
      console.error("Deposit failed:", error);
      setError("Failed to deposit. Try again later.");
    } finally {
      setLoading(false); // Hide loading state after request
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed p-5 top-0 right-0 bottom-0 left-0 bg-[#00000050] z-10000 flex items-center justify-center">
          <div className="relative h-[fit-content] md:w-[400px] dark:bg-[var(--default)] border  dark:border-[#787878] border-[#fff] w-[100%] bg-[white] rounded-[20px] p-5">
            <h1 className="font-[600] dark:text-[#d3d3d3]">
              Quick selection amount
            </h1>

            {/* Show quick select only if showQuickSelect is true */}
            <div className="flex flex-wrap gap-x-2 gap-y-3 mt-4">
              {prices.map((item) => (
                <div
                  key={item}
                  className={`hover:bg-[#f1f1f1] dark:hover:bg-[#1b273c] duration-100 border-[#d3d3d3] dark:text-[#d3d3d3] text-[#787878] font-[400] text-sm border p-1.5 px-6 rounded-[8px] cursor-pointer ${
                    selectedAmount === item
                      ? "bg-[#e6e6e6] dark:bg-[#1b273c]"
                      : ""
                  }`}
                  onClick={() => handleQuickSelect(item)}
                >
                  $ {item}
                </div>
              ))}
            </div>

            {/* Custom amount input */}
            <div className="mt-3">
              <h1 className="font-[600] dark:text-[#d3d3d3]">Custom Amount</h1>
              <input
                className="border dark:placeholder:text-[#787878] border-[#f1f1f1] p-2 w-[100%] mt-2 rounded-[6px] placeholder:text-sm outline-none text-sm"
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Input custom amount"
              />
              <h1 className="mt-3 text-[12px] text-[#787878] dark:text-[#d3d3d3]">
                Min: $10 - Max: $50,000
              </h1>
              {error && <p className="text-red-500 text-[12px]">{error}</p>}
            </div>

            {/* Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={
                (selectedAmount === "" && customAmount === "") || loading
              }
              className={`p-2.5 text-white text-sm bg-[var(--Primary)] mt-3 w-[100%] rounded-[10px] shadow shadow-amber-300 ${
                (selectedAmount === "" && customAmount === "") || loading
                  ? "opacity-65"
                  : "opacity-100"
              }`}
            >
              {loading
                ? "Processing..."
                : `Deposit $${selectedAmount || customAmount || 0}`}
            </button>
            <button
              className="absolute top-5 right-5 dark:text-[#d3d3d3]"
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
