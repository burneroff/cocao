import { useState, useRef, useEffect } from "react";
import { Cross } from "../icons/Cross";

export default function Contacts() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (textareaRef.current) {
      const minHeight = window.innerWidth < 640 ? 167 : 60;
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(minHeight, scrollHeight)}px`;
    }
  }, [message]);

  const isFormValid = () => {
    const isEmailValid =
      email.trim() && emailRegex.test(email) && email.length <= 150;
    const isMessageValid =
      message.trim() && message.length > 0 && message.length <= 999;
    return isEmailValid && isMessageValid;
  };

  const handleSend = () => {
    setEmailError(null);
    setMessageError(null);

    if (!email.trim()) {
      setEmailError(
        "It seems you forgot to enter your email. Please add it so we can get back to you.",
      );
    } else if (!emailRegex.test(email) || email.length > 150) {
      setEmailError("This email doesn't exist. Please check it and try again.");
    }

    if (!message.trim()) {
      setMessageError(
        "The message field is empty — do you really have nothing to tell us?",
      );
    } else if (message.length > 999) {
      setMessageError(
        "Message is too long. Please keep it under 999 characters.",
      );
    }

    const hasEmailError =
      !email.trim() || !emailRegex.test(email) || email.length > 150;
    const hasMessageError = !message.trim() || message.length > 999;

    if (hasEmailError || hasMessageError) return;

    const subject = encodeURIComponent("Message from website");
    const body = encodeURIComponent(message);

    window.location.href = `mailto:hr@cacao-mobile.com?subject=${subject}&body=Email: ${email}%0A%0A${body}`;
  };

  return (
    <section className="relative w-full md:min-h-[80vh] xl:min-h-[78vh] flex items-start justify-end pt-15 sm:mt-0 px-4 py-8 md:px-16 md:py-16 bg-[#dadada]">
      <div className="w-full max-w-[910px] flex flex-col">
        <div className="flex flex-col mb-10">
          <h4 className="mb-3 font-medium text-lg sm:text-[25px] text-[#35353C]">
            Enter your email
          </h4>

          {emailError && (
            <p className="mb-2 text-sm text-red-600">{emailError}</p>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            maxLength={150}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            className={`w-full h-[60px] px-4 border outline-none text-base sm:text-[18px] transition-all duration-300 rounded-[0px] hover:rounded-[16px] focus:rounded-[16px]
              ${emailError ? "border-red-600" : isFormValid() ? "border-[#35353C]" : "border-[#35353C]"}
            `}
          />
        </div>

        <div className="flex flex-col">
          <h4 className="mb-3 font-medium text-lg sm:text-[25px] text-[#35353C]">
            Enter your message
          </h4>

          {messageError && (
            <p className="mb-2 text-sm text-red-600">{messageError}</p>
          )}

          <textarea
            ref={textareaRef}
            placeholder="Hi, I want to talk about..."
            value={message}
            maxLength={999}
            onChange={(e) => {
              setMessage(e.target.value);
              if (messageError) setMessageError(null);
            }}
            className={`w-full min-h-[167px] sm:min-h-[60px] resize-none overflow-hidden px-4 py-3 border outline-none text-base sm:text-[18px] transition-all duration-300 rounded-[0px] hover:rounded-[16px] focus:rounded-[16px]
              ${messageError ? "border-red-600" : isFormValid() ? "border-[#35353C]" : "border-[#35353C]"}
            `}
            rows={1}
          />

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSend}
              className={`w-[165px] h-[45px] text-[22px] flex items-center justify-center border font-medium transition-all duration-300 rounded-[0px] hover:rounded-[16px] active:bg-[#9F9B96] active:scale-95
                ${
                  isFormValid()
                    ? "border-[#35353C] text-[#35353C] hover:text-[#35353C] hover:border-[#35353C]"
                    : "border-[#9F9B96] text-[#9F9B96] hover:text-[#35353C] hover:border-[#35353C]"
                }
              `}
            >
              Send &#8250;
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <Cross color="#35353C" className="w-4 h-4 md:w-auto md:h-auto" />
      </div>
    </section>
  );
}
