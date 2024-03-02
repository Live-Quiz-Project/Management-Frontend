interface SuccessDialogProps {
  label: string;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ onClose, label }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-quill-gray bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{label}</h2>
        <button
          onClick={onClose}
          className="flex bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600"
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;
