import Link from "next/link";

interface FormFooterProps {
  text: string;
  link: string;
  label: string;
}

const FormFooter = ({ text, link, label }: FormFooterProps) => {
  return (
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
      <p className="text-sm text-gray-400 space-x-1">
        <span>{text}</span>
        <Link href={link} className="text-green-400 hover:underline">
          {label}
        </Link>
      </p>
    </div>
  );
};

export default FormFooter;
