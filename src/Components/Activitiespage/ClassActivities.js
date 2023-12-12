import { useEffect, useContext, useInsertionEffect } from 'react';

//--------------COMPONENTS--------------//;
import { UserContext } from '../../Provider/UserProvider';
import apiRequest from '../../Api';
import { ClassActImgCarousel } from './ClassActImgCarousel';

export function ClassActivities() {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { user, child, classActivity, setClassActivity, isAdmin } =
    useContext(UserContext);

  //make function to get classActivities from BE for TEACHER
  const getClassActDataTeachers = async () => {
    if (user && user.id) {
      //get grade from teacher class table
      const gradeRes = await apiRequest.get(`${BEURL}/teacherclass/${user.id}`);
      const grade = gradeRes.data;
      //get classActivities by grade
      const classAct = await apiRequest.get(`${BEURL}/classactivity/${grade}`);
      const sortedClassActs = classAct.data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
      setClassActivity(sortedClassActs);
    }
  };

  //make function to get classActivities from BE for PARENT
  const getClassActDataParent = async () => {
    if (user && user.id && child && child.id) {
      //get grade from children state
      const grade = child.map((grades) => grades.grade);
      const classAct = await apiRequest.get(`${BEURL}/classactivity/${grade}`);
      const sortedClassActs = classAct.data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
      setClassActivity(sortedClassActs);
    }
  };

  // useEffect to initialize function to get data from BE
  useEffect(() => {
    if (isAdmin === true) {
      getClassActDataTeachers();
    } else {
      getClassActDataParent();
    }
  }, [user, isAdmin]);

  return (
    <div
      className={`${
        isAdmin
          ? 'w-50 text-adminText border-adminText'
          : 'w-50 text-parentText border-parentText'
      } `}
    >
      {classActivity.map((classAct) => (
        <div
          key={classAct.id}
          className="flex-col jusitfy-center items-center bg-white"
        >
          <div className="flex flex-col">
            <h1 className=" px-[20px]  mt-[10px] font-bold">
              {classAct.title}
            </h1>
            {classAct.date === null ? (
              <></>
            ) : (
              <h1 className="px-[20px] italic">
                {new Date(classAct.date).toLocaleString('en-GB', {
                  timeZone: 'Asia/Singapore',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </h1>
            )}
          </div>
          <h1 className=" px-[20px] text-[1em] font-medium my-[20px]">
            {classAct.description}
          </h1>
          {/* insert carousel component */}
          <ClassActImgCarousel classActId={classAct.id} />
          <hr
            className={`${
              isAdmin
                ? 'mt-[20px] rounded-full border-[0.1em] border-adminText'
                : 'mt-[20px] rounded-full border-[0.1em] border-parentText'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
