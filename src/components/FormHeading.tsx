interface FormHeadingProps {
  label: string;
}

const FormHeading = ({ label }: FormHeadingProps) => {
  return (
    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
      {label}
    </h2>
  );
};

export default FormHeading;
