import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

interface SuccessDialogProps {
  label: string;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ onClose, label }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-quill-gray bg-opacity-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <CheckCircleOutlineOutlinedIcon
          style={{ fontSize: 44, color: "green", margin: "auto" }}
        />
        <h2 className="text-xl font-semibold my-4">{label}</h2>
        <button
          onClick={onClose}
          className="flex justify-center items-center bg-blue-500 text-black py-2 rounded-md w-full"
        >
          <ArrowBackOutlinedIcon style={{ fontSize: 24, margin: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;
