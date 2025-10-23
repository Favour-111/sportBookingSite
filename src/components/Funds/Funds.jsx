import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
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
  const { fetchUser, compareUser } = useContext(ShopContext);

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalShown, setModalOpen] = useState(false);
  const [polling, setPolling] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleQuickSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setError("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount("");

    if (value < 10 || value > 50000)
      setError("Amount must be between $10 and $50,000");
    else setError("");
  };

  const handleDeposit = async () => {
    const amount = selectedAmount || customAmount;

    if (!amount || amount < 10 || amount > 50000) {
      setError("Please select or enter an amount between $10 and $50,000.");
      return;
    }

    setLoading(true);
    try {
      const order_id = `deposit_${userId}_${Date.now()}`;

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/payment/create-invoice`,
        {
          amount,
          order_id,
          description: `Deposit by ${compareUser.userName}`,
          email: compareUser.email,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const payment_url = response.data.data.payment_url;
      if (payment_url) {
        window.open(payment_url, "_blank");
        setModalOpen(true);
        setOpen(false);
        setPolling(true); // start polling
      } else setError("Failed to get payment URL.");
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  // Poll backend every 5s for balance update
  useEffect(() => {
    if (polling) {
      const interval = setInterval(async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API}/api/user/${userId}`,
            { headers: { Authorization: `Bearer ${userToken}` } }
          );

          if (res.data.availableBalance !== compareUser.availableBalance) {
            fetchUser();
            setModalOpen(false);
            setPolling(false);
          }
        } catch (err) {
          console.error(err);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [polling]);

  return (
    <div>
      {open && (
        <div className="fixed p-5 top-0 right-0 bottom-0 left-0 bg-[#00000050] z-10000 flex items-center justify-center">
          <div className="relative h-[fit-content] md:w-[400px] w-full bg-white dark:bg-[var(--default)] border dark:border-[#787878] rounded-[20px] p-5">
            <h1 className="font-[600] dark:text-[#d3d3d3]">
              Quick selection amount
            </h1>
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

            <div className="mt-3">
              <h1 className="font-[600] dark:text-[#d3d3d3]">Custom Amount</h1>
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Input custom amount"
                className="border dark:placeholder:text-[#787878] border-[#f1f1f1] p-2 w-full mt-2 rounded-[6px] placeholder:text-sm outline-none text-sm"
              />
              <p className="mt-3 text-[12px] text-[#787878] dark:text-[#d3d3d3]">
                Min: $10 - Max: $50,000
              </p>
              {error && <p className="text-red-500 text-[12px]">{error}</p>}
            </div>

            <button
              onClick={handleDeposit}
              disabled={(!selectedAmount && !customAmount) || loading}
              className={`p-2.5 text-white text-sm bg-[var(--Primary)] mt-3 w-full rounded-[10px] shadow ${
                (!selectedAmount && !customAmount) || loading
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

      <Dialog
        open={modalShown}
        onClose={() => setModalOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 sm:mx-0">
                    <IoCheckmarkSharp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Payment Initiated
                    </DialogTitle>
                    <p className="text-sm text-gray-500 mt-2">
                      Your deposit payment is in progress. Complete it on the
                      OxaPay page.
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Funds;
