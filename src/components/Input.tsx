import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}
const Input = ({ icon: Icon, ...fields }: InputProps) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <Icon className="siz-5 text-green-500" />
      </div>

      <input
        {...fields}
        className="w-full pl-11 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 placeholder-opacity-90 transition-all duration-200"
      />
    </div>
  );
};

export default Input;
