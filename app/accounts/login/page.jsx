"use client";
import visionTechIcon from "@/assets/visiontechicon.png";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";

import OtpInput from "@/components/OtpInput";
import useResendTimer from "@/hooks/useResendTimer";
import {
  phoneSchema,
  emailStepSchema,
  otpSchema,
} from "@/validations/accounts";

// 1. RTK Query Hooks Import
import {
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/auth/authSlice";

import Image from "next/image";
import Link from "next/link";

const STEP_PROGRESS = {
  email: 50,
  number: 67,
  "wa-otp": 100,
  "email-otp": 100,
};

const btnGold =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-[15px] font-heading text-[15px] font-bold text-[#231a00] shadow-[0_8px_20px_rgba(255,207,36,0.32)] transition hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-60";
const inputCls =
  "w-full rounded-xl border-[1.6px] border-slate-200 bg-white px-[15px] py-[14px] text-[15px] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-50 disabled:bg-slate-100";
const errText = "mt-1.5 text-xs text-red-600";
const label = "mb-2 block font-heading text-[13px] font-semibold text-ink-2";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [account, setAccount] = useState({ identifier: "", channel: "email" });

  // const waTimer = useResendTimer(120);
  // const emailTimer = useResendTimer(120);

  // 2. RTK Query Mutation Hooks Initialize Karein
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtpApi, { isLoading: isResending }] = useResendOtpMutation();

  const goto = (id) => {
    setStep(id);
    // if (id === "wa-otp") waTimer.restart();
    // if (id === "email-otp") emailTimer.restart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pct = STEP_PROGRESS[step] || 25;

  // Step 1: Login API Request (Sends { identifier })
  const requestOtpFor = async (identifier, channel) => {
    try {
      await login({ identifier }).unwrap();
      setAccount({ identifier, channel });
      toast.success(
        channel === "phone"
          ? "Code sent on WhatsApp"
          : "Code sent to your email",
      );
      goto(channel === "phone" ? "wa-otp" : "email-otp");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Could not send the code. Please try again.",
      );
    }
  };

  // Resend OTP Handler
  const resendOtp = async () => {
    try {
      await resendOtpApi({ identifier: account.identifier }).unwrap();
      toast.success("Code resent successfully");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Could not resend the code. Please try again.",
      );
    }
  };

  // Verify OTP Handler
  const verifyOtpFor = async (otp) => {
    try {
      const response = await verifyOtp({
        identifier: account.identifier,
        otp,
      }).unwrap();
      toast.success("Login Successful!");
      router.push("/checkout");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "That code didn't work. Please try again.",
      );
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1.05fr_1fr]">
      {/* BRAND SIDE */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand to-[#031057] px-14 py-12 text-white md:flex">
        <div className="pointer-events-none absolute -bottom-52 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.12),transparent_62%)]" />
        <Link
          href="/"
          className="z-10 inline-flex items-center font-heading text-2xl font-extrabold tracking-tight text-white"
        >
          <Image
            src={visionTechIcon}
            alt="WeGot"
            className="w-28 lg:w-40 object-contain"
          />
        </Link>
        <div className="z-10 max-w-[420px]">
          <h2 className="mb-4 text-[34px] font-extrabold leading-[1.12] text-white">
            Your account, in seconds.
          </h2>
          <Feature
            icon={<MessageCircle size={20} />}
            title="Just your WhatsApp number"
          >
            No email needed, no password to remember.
          </Feature>
          <Feature icon={<ShieldCheck size={20} />} title="Track every order">
            Live status, and your unit on video before dispatch.
          </Feature>
          <Feature icon={<Star size={20} />} title="Prime rewards">
            Express delivery, member discounts, cashback draws.
          </Feature>
        </div>
        <div className="z-10 text-[12.5px] text-[#bcd0ff]" />
      </aside>

      {/* FORM SIDE */}
      <main className="relative flex flex-col items-center justify-start bg-white px-6 pb-10 pt-8 md:justify-center md:pt-10">
        <div className="mb-6 flex w-full max-w-[430px] items-center justify-between md:hidden">
          <Link
            href="/"
            className="z-10 inline-flex items-center font-heading text-2xl font-extrabold tracking-tight text-white"
          >
            <Image
              src={visionTechIcon}
              alt="WeGot"
              className="w-28 lg:w-40 object-contain"
            />
          </Link>
          <Link href="/" className="text-[13px] text-muted">
            Back to store
          </Link>
        </div>

        <div className="w-full max-w-[430px]">
          <div className="mb-7 h-[5px] overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* {step === "number" && (
            <StepNumber
              isLoading={isLoggingIn}
              onNext={(phone) => requestOtpFor(phone, "phone")}
              onEmail={() => goto("email")}
            />
          )}

          {step === "wa-otp" && (
            <StepOtp
              channel="whatsapp"
              destination={account.identifier || "03XX XXXXXXX"}
              // timer={waTimer}
              isVerifying={isVerifying}
              isResending={isResending}
              onBack={() => goto("number")}
              onUseEmail={() => goto("email")}
              onVerify={verifyOtpFor}
              onResend={resendOtp}
            />
          )} */}

          {step === "email" && (
            <StepEmail
              isLoading={isLoggingIn}
              onBack={() => goto("number")}
              onUseNumber={() => goto("number")}
              onNext={(email) => requestOtpFor(email, "email")}
            />
          )}

          {step === "email-otp" && (
            <StepOtp
              channel="email"
              destination={account.identifier || "name@example.com"}
              // timer={emailTimer}
              isVerifying={isVerifying}
              isResending={isResending}
              onBack={() => goto("email")}
              onVerify={verifyOtpFor}
              onResend={resendOtp}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div className="mb-4 flex items-start gap-3 text-[14.5px] text-[#eaf1ff]">
      <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-white/15 text-white">
        {icon}
      </span>
      <span>
        <b className="block font-heading text-[14.5px] text-white">{title}</b>
        {children}
      </span>
    </div>
  );
}

function BackRow({ onBack, label: backLabel = "Back", right }) {
  return (
    <div className="mb-4 flex min-h-[20px] items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[13px] text-muted hover:text-brand"
        >
          <ArrowLeft size={14} /> {backLabel}
        </button>
      ) : (
        <span />
      )}
      {right}
    </div>
  );
}

/* ---------- STEP: NUMBER ---------- */
function StepNumber({ onNext, onEmail, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(phoneSchema) });

  return (
    <section className="animate-[fade_.3s_ease]">
      <BackRow
        right={
          <a href="/" className="text-[13px] text-muted hover:text-brand">
            Back to store &rarr;
          </a>
        }
      />
      <h1 className="mb-2 text-[26px] font-bold">Log in via whatsapp.</h1>
      <p className="mb-6 text-[14.5px] text-muted">
        Enter your WhatsApp number and we will send you a code. New here or
        returning, it is the same.
      </p>
      <form onSubmit={handleSubmit((data) => onNext(data.phone))}>
        <label className={label}>WhatsApp number</label>
        <input
          {...register("phone")}
          className={inputCls}
          type="tel"
          inputMode="numeric"
          placeholder="03XX XXXXXXX"
          autoFocus
          disabled={isLoading}
        />
        {errors.phone && <p className={errText}>{errors.phone.message}</p>}
        <p className="mt-2 text-xs text-faint">
          Type it as 03XX XXXXXXX or 92XX XXXXXXX, both work.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className={`${btnGold} mt-4`}
        >
          {isLoading ? (
            "Sending code..."
          ) : (
            <>
              Continue <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      <div className="mt-4 text-center text-[13.5px] text-muted">
        or{" "}
        <button
          type="button"
          onClick={onEmail}
          className="text-brand hover:underline"
        >
          use email instead
        </button>
      </div>
      <p className="mt-3.5 text-center text-[12.5px] leading-relaxed text-faint">
        We only use your number to secure your account and send order updates on
        WhatsApp. By continuing you agree to our Terms and Privacy Policy.
      </p>
    </section>
  );
}

/* ---------- STEP: OTP ---------- */
function StepOtp({
  channel,
  destination,
  onBack,
  onUseEmail,
  onVerify,
  onResend,
  isVerifying,
  isResending,
}) {
  const timer = useResendTimer(120);
  useEffect(() => {
    timer.restart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const isWa = channel === "whatsapp";

  const handleResendClick = async () => {
    await onResend();
    timer.restart();
  };

  return (
    <section className="animate-[fade_.3s_ease]">
      <BackRow
        onBack={onBack}
        label={isWa ? "Change number" : "Change email"}
      />
      {isWa && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9ecd7] bg-[#eafaf0] px-3.5 py-[7px] text-[12.5px] font-semibold text-[#0d7a4a]">
          <MessageCircle size={14} /> Code sent on WhatsApp
        </div>
      )}
      <h1 className="mb-2 text-[26px] font-bold">Enter the code</h1>
      <p className="mb-6 text-[14.5px] text-muted">
        We sent a 6 digit code to {isWa ? "your WhatsApp on" : "your email"}{" "}
        <b className="text-ink">{destination}</b>
        {!isWa && ". Check spam if you do not see it."}
      </p>
      <form onSubmit={handleSubmit((data) => onVerify(data.otp))}>
        {/* <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput value={field.value} onChange={field.onChange} autoFocus />
          )}
        /> */}
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <div
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData
                  .getData("text")
                  .replace(/\D/g, "") // sirf digits rakho
                  .slice(0, 6); // sirf 6 digits tak

                if (pasted.length > 0) {
                  field.onChange(pasted);
                }
              }}
            >
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
              />
            </div>
          )}
        />
        {errors.otp && <p className={errText}>{errors.otp.message}</p>}

        <div className="my-4 text-center text-[13px] text-muted">
          {timer.timeLeft > 0 ? (
            <>
              Resend code in <b className="text-faint">{timer.label}</b>
            </>
          ) : (
            <button
              type="button"
              onClick={handleResendClick}
              disabled={isResending}
              className="text-brand hover:underline disabled:opacity-60"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          )}
        </div>

        <button type="submit" disabled={isVerifying} className={btnGold}>
          {isVerifying ? "Verifying..." : "Verify and continue"}
        </button>
      </form>

      {isWa && onUseEmail && (
        <div className="mt-4 text-center text-[13.5px] text-muted">
          Did not get it on WhatsApp?{" "}
          <button
            type="button"
            onClick={onUseEmail}
            className="text-brand hover:underline"
          >
            Use email instead
          </button>
        </div>
      )}
    </section>
  );
}

/* ---------- STEP: EMAIL ---------- */
function StepEmail({ onBack, onUseNumber, onNext, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(emailStepSchema) });

  return (
    <section className="animate-[fade_.3s_ease]">
      <BackRow onBack={onBack} />
      <h1 className="mb-2 text-[26px] font-bold">Login via email</h1>
      <p className="mb-6 text-[14.5px] text-muted">
        No problem. Enter your email and we will send the code there instead.
      </p>
      <form onSubmit={handleSubmit((data) => onNext(data.email))}>
        <label className={label}>Email address</label>
        <input
          {...register("email")}
          className={inputCls}
          type="email"
          placeholder="name@example.com"
          autoFocus
          disabled={isLoading}
        />
        {errors.email && <p className={errText}>{errors.email.message}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`${btnGold} mt-4`}
        >
          {isLoading ? "Sending code..." : "Send code"}
        </button>
      </form>
      {/* <div className="mt-4 text-center text-[13.5px] text-muted">
                Prefer WhatsApp?{" "}
                <button type="button" onClick={onUseNumber} className="text-brand hover:underline">
                    Use my number
                </button>
            </div> */}
      <div className="mt-4 text-center text-[13.5px] text-muted">
        Did'nt have an account?{" "}
        <Link href={"/accounts/signup"} className="text-brand hover:underline">
          Sign Up
        </Link>
      </div>
    </section>
  );
}
