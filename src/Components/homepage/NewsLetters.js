import { useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import apiRequest from '../../Api';

//--------------COMPONENTS--------------//
import { NewsImgCarousel } from './NewsImgCarousel';

export function NewsLetters() {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { newsLetters, setNewsLetters, isAdmin } = useContext(UserContext);

  // useEffect to initialize function to get data from BE
  useEffect(() => {
    // create function to get newsletters and imgs and put it inside state
    const getNewsLetters = async () => {
      const newsLettersData = await apiRequest.get(`${BEURL}/newsletter`);
      setNewsLetters(newsLettersData.data);
    };
    getNewsLetters();
  }, []);

  return (
    <div
      className={`${
        isAdmin
          ? 'w-50 text-adminText border-adminText'
          : 'w-50 text-parentText border-parentText'
      }  `}
    >
      {newsLetters.map((newsletter) => (
        <div
          key={newsletter.id}
          className="flex-col jusitfy-center items-center bg-white"
        >
          <div className="flex font-bold justify-between">
            <h1 className=" px-[10px]  m-[10px]">{newsletter.title}</h1>
            {newsletter.dateTime === null ? (
              <></>
            ) : (
              <h1 className="px-[10px] m-[10px]">
                {new Date(newsletter.dateTime).toLocaleString('en-GB', {
                  timeZone: 'Asia/Singapore',
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </h1>
            )}
          </div>
          {/* insert carousel component */}
          <NewsImgCarousel newsLetterId={newsletter.id} />
          <h1 className=" px-[10px] text-[1em] font-medium m-[10px]">
            {newsletter.description}
          </h1>
          <hr
            className={`${
              isAdmin
                ? 'my-[2px] rounded-full border-[0.1em] border-adminText'
                : 'my-[2px] rounded-full border-[0.1em] border-parentText'
            }`}
          />
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
