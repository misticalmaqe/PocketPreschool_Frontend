import { useEffect, useContext } from 'react';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { UserContext } from '../../Provider/UserProvider';
import { NewsImgCarousel } from './NewsImgCarousel';
import apiRequest from '../../Api';

export function NewsLetters() {
  const BEURL = process.env.REACT_APP_BE_URL;
  const { newsLetters, setNewsLetters, isAdmin, user, authenticated } =
    useContext(UserContext);

  //function to get news letters from BE
  const getNewsLetters = async () => {
    const newsLettersData = await axios.get(`${BEURL}/newsletter`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    // Sort the newsletters by createdAt in descending order (latest first)
    const sortedNewsLetters = newsLettersData.data.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
    setNewsLetters(sortedNewsLetters);
  };

  // useEffect to initialize function to get data from BE
  useEffect(() => {
    if (authenticated === true && user && user.id) {
      getNewsLetters();
    }
  }, [user, setNewsLetters]);

  return (
    <div
      className={`${
        isAdmin
          ? 'grow text-adminText border-adminText'
          : 'grow text-parentText border-parentText'
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
