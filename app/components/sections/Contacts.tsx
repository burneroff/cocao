import { useState } from "react";
import { Cross } from "../icons/Cross";

export default function Contacts() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSend = () => {
    const isEmailValid = emailRegex.test(email) && email.length <= 150;
    const isMessageValid = message.length > 0 && message.length <= 999;

    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    if (!isEmailValid || !isMessageValid) return;

    const subject = encodeURIComponent("Message from website");
    const body = encodeURIComponent(message);

    window.location.href = `mailto:burneroff@outlook.com?subject=${subject}&body=From: ${email}%0A%0A${body}`;
  };

  return (
    <section className="relative w-full sm:min-h-screen flex justify-center px-4 sm:px-16 lg:px-16 py-16">
      <div className="w-full max-w-[910px] flex flex-col justify-center">
        {/* EMAIL */}
        <div className="flex flex-col mb-10">
          <h4 className="mb-3 font-medium text-lg sm:text-[25px] text-[#35353C]">
            Enter your email
          </h4>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            maxLength={150}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[60px] px-4 border outline-none text-base sm:text-[18px] transition
              ${emailError ? "border-red-600" : "border-[#35353C]"}
            `}
          />
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col">
          <h4 className="mb-3 font-medium text-lg sm:text-[25px] text-[#35353C]">
            Enter your message
          </h4>

          <input
            placeholder="Hi, I want to talk about..."
            value={message}
            maxLength={999}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full h-[60px] resize-none px-4 py-3 border outline-none text-base sm:text-[18px] transition
              ${messageError ? "border-red-600" : "border-[#35353C]"}
            `}
          />

          {/* BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSend}
              className="w-[150px] h-[45px] flex items-center justify-center border border-[#9F9B96] text-[#9F9B96] font-medium transition-all duration-300 hover:text-[#35353C] hover:border-[#35353C] active:scale-95"
            >
              Send &gt;
            </button>
          </div>
        </div>
      </div>

      {/* DECOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <Cross color="#35353C" />
      </div>
    </section>
  );
}
