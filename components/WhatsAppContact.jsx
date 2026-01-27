import Image from "next/image";
import whatsAppIcon from "@/assets/whatsappicon.svg";
import Link from "next/link";

const WhatsAppContact = () => {
  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_NUMBER; // admin number with country code
  const defaultMessage = process.env.NEXT_PUBLIC_DEFAULT_MESSAGE; // default message
  const whatsappLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
    defaultMessage,
  )}`;
  return (
    <div className="fixed bottom-0 left-0 z-[99999] size-24">
      <Link href={whatsappLink} target="_blank">
        <Image
          src={whatsAppIcon}
          fill
          alt="WhatsApp"
          className="w-20 h-20 cursor-pointer hover:scale-110 transition absolute left-0 bottom-[-128px]"
        />
      </Link>
    </div>
  );
};

export default WhatsAppContact;
