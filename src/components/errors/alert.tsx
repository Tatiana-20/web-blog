import React, { useState, useEffect } from "react";

interface AlertProps {
  message: string;
  type?: "success" | "alert";
  onClose?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = "alert",
  onClose = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const alertClasses = `
    w-full p-3 rounded-md flex items-center justify-between
    text-white font-semibold
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
  `;

  return (
    <div
      className={alertClasses}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          className="text-white font-semibold"
          onClick={handleClose}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Alert;
