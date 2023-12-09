import { useEffect, useContext } from 'react';
import { UserContext } from '../../Provider/UserProvider';

//--------------COMPONENTS--------------//
import { NewsImgCarousel } from './NewsImgCarousel';
import apiRequest from '../../Api';

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
            {newsletter.date === null ? (
              <></>
            ) : (
              <h1 className="px-[10px] m-[10px]">
                {new Date(newsletter.date).toLocaleString('en-GB', {
                  timeZone: 'Asia/Singapore',
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
                ? 'mt-[2px] rounded-full border-[0.1em] border-adminText'
                : 'mt-[2px] rounded-full border-[0.1em] border-parentText'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
