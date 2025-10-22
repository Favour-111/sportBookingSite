import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios for API calls
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ShopContext } from "../shopContext";

const Funds = ({ open, setOpen, userToken }) => {
  const prices = [100, 250, 500, 1000, 2000, 3000, 5000];
  const { balLoader, setBalLoader, fetchUser } = useContext(ShopContext);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [modalShown, setModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

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
        const { availableBalance } = response.data;

        // Update balance in the parent component
        updateBalance(availableBalance);

        setModalOpen(true); // Show modal after successful deposit
        setOpen(false); // Close the deposit modal

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
          <div className="relative h-[fit-content] md:w-[400px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#fff] w-[100%] bg-[white] rounded-[20px] p-5">
            <h1 className="font-[600] dark:text-[#d3d3d3]">
              Quick selection amount
            </h1>

            {/* Show quick select only if showQuickSelect is true */}
            <div className="w-[90%] flex flex-wrap gap-x-2 gap-y-3 mt-4">
              {prices.map((item) => (
                <div
                  key={item}
                  className={`hover:bg-[#f1f1f1] dark:hover:bg-[#1b273c] duration-100 border-[#d3d3d3] dark:text-[#d3d3d3] text-[#787878] font-[400] text-[12px] border p-1.5 px-6 rounded-[28px] cursor-pointer ${
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
                min="0"
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
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1b212f"
                  />
                </svg>
              )}
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

      {/* Success Modal */}
      <Dialog
        open={modalShown}
        onClose={() => setModalOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <IoCheckmarkSharp className="size-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Deposit Successful
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your deposit has been successfully processed. You can
                        now use your funds to make purchases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    fetchUser();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Continue Betting
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    setModalOpen(false);
                    fetchUser();
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Funds;
