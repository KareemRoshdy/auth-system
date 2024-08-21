import ResetPasswordForm from "../_components/ResetPasswordForm";

interface ResetPasswordTokenProps {
  params: {
    token: string;
  };
}

const ResetPasswordToken = ({ params: { token } }: ResetPasswordTokenProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordToken;
