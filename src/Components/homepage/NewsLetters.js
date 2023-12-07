import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import apiRequest from '../../Api';

export function NewsLetters() {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { newsLetters, setNewsLetters, newsImgs, setNewsImgs } =
    useContext(UserContext);

  //create function to get newsletters and imgs and put it inside state
  const getNewsLetters = async () => {
    const newsLettersData = await apiRequest.get(`${BEURL}/newsletter`);
    setNewsLetters(newsLettersData.data);
  };
  const getNewsImgs = async () => {
    const newsImgsData = await apiRequest.get(`${BEURL}/newsletter/imgs`);
    setNewsImgs(newsImgsData.data);
  };

  //useEffect to initialize function to get data from BE
  useEffect(() => {
    getNewsLetters();
    getNewsImgs();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      {newsLetters.map((newsletter) => (
        <div key={newsletter.id}>
          <h1 className="text-black rounded-md pl-[5px] text-[22px] font-bold">
            {newsletter.title}
          </h1>
        </div>
      ))}
    </div>
  );
}

// {
//   personalGroups.map((groupItem) => (
//     <div
//       key={groupItem.id}
//       className="m-[30px] flex flex-col bg-window p-[20px] shadow-lg shadow-text hover:translate-y-[-2px]"
//     >
//       <h1 className="text-text rounded-md pl-[5px] text-[22px] font-bold">
//         {groupItem.groupName}
//       </h1>
//       {personalPwBooks.map((pwBooksItem) => (
//         <div>
//           {pwBooksItem.groupAccountId === groupItem.id ? (
//             <div
//               key={pwBooksItem.id}
//               className="text-text pl-[5px] text-[18px] font-semibold "
//             >
//               <hr className="my-[10px] border-[1.3px] border-accent" />
//               {!pwBooksItem.userName ? null : (
//                 <h1>UserName: {pwBooksItem.userName}</h1>
//               )}
//               {!pwBooksItem.email ? null : <h1>Email: {pwBooksItem.email}</h1>}
//               <div className="flex flex-col items-start">
//                 <h1>Password: </h1>
//                 <Eyes password={pwBooksItem.password} />
//                 <div className="ml-auto">
//                   <PersonalDeletePwBookEntry
//                     pwbookId={pwBooksItem.id}
//                     groupAccountId={groupItem.id}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       ))}
//     </div>
//   ));
// }
