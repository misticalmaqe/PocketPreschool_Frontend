import { useState } from 'react';

const DropdownGrade = ({ setGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState('');

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setGrade(grade);
  };
  return (
    <div className="dropdown dropdown-right">
      <div
        tabIndex={0}
        role="button"
        placeholder="Grade"
        className="btn m-1 bg-adminText text-adminBackground border-0 hover-bg-adminBackground"
      >
        {selectedGrade ? selectedGrade : 'Grade'}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow rounded-box bg-adminBackground text-adminText text-xl"
      >
        <li onClick={() => handleGradeSelect('ST')} className="cursor-pointer">
          ST
        </li>
        <li onClick={() => handleGradeSelect('N1')} className="cursor-pointer">
          N1
        </li>
        <li onClick={() => handleGradeSelect('N2')} className="cursor-pointer">
          N2
        </li>
        <li onClick={() => handleGradeSelect('K1')} className="cursor-pointer">
          K1
        </li>
        <li onClick={() => handleGradeSelect('K2')} className="cursor-pointer">
          K2
        </li>
      </ul>
    </div>
  );
};
export default DropdownGrade;
