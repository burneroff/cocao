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
    <section className="relative w-full h-[85vh] flex items-start px-16 py-16">
      <div className="w-full flex justify-end">
        <div className="flex flex-col">
          {/* EMAIL */}
          <div className="flex flex-col mb-12">
            <h4
              className="mb-4 font-medium text-[25px] leading-[35px]"
              style={{ color: "#35353C" }}
            >
              Enter your email
            </h4>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              maxLength={150}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[910px] h-[60px] px-4 border outline-none text-[18px] transition
                ${emailError ? "border-red-600" : "border-[#35353C]"}
              `}
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col">
            <h4
              className="mb-4 font-medium text-[25px] leading-[35px]"
              style={{ color: "#35353C" }}
            >
              Enter your Message
            </h4>

            <input
              placeholder="Hi, I want to talk about..."
              value={message}
              maxLength={999}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-[910px] h-[60px] px-4 border outline-none text-[18px] transition
                ${messageError ? "border-red-600" : "border-[#35353C]"}
              `}
            />
            {/* BUTTON RIGHT */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSend}
                className="w-[150px] h-[45px] flex items-center justify-center border border-[#9F9B96] text-[#9F9B96] font-medium transition-colors duration-300 hover:text-[#35353C] hover:border-[#35353C] active:scale-95"
              >
                Send &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2">
        <Cross color="#35353C" />
      </div>
    </section>
  );
}
