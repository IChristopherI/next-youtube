import { Upload } from "lucide-react";
import React from "react";

interface InputFileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string; 
  accept:string
}

const InputFile: React.FC<InputFileProps> = ({ onChange, text = "Выберите файл",accept }) => {
  return (
    <div className="flex flex-col items-center justify-center  border-2 border-dashed border-gray-400 rounded-lg p-6 w-full max-w-[184px] h-[125px] cursor-pointer hover:border-gray-800 transition">
      <div className="flex flex-col items-center">
        <Upload className="w-10 h-8 text-gray-500" />
        <h2 className="text-center">{text}</h2>
      </div>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className=" absolute opacity-0 w-30 h-25 cursor-pointer"
      />
    </div>
  );
};

export default InputFile;
