const AdminPage = () => {
  return ( 
  <article className="w-full p-40">
  <div className="bg-white p-4 w-full">
    <table className="w-full text-xl">
      <thead className="text-left">
        <tr className="text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
          <th className="p-4 w-[15%]">구분</th>
          <th className="w-[20%]">닉네임</th>
          <th className="w-[35%]">제목</th>
          <th className="w-[15%]">날짜</th>
          <th className="w-[15%]">처리</th>
        </tr>
      </thead>
      <tbody>
        {/* {currentItems?.map((item, idx) => { */}
          {/* return ( */}
            <tr
              className="bg-white cursor-pointer border-y border-solid border-pointColor3"
              // key={idx}
              // onClick={() => navigateToDetailPost(item)}
            >
              <td className="p-4 w-24"></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          {/* ); */}
        {/* })} */}
      </tbody>
    </table>
  </div>
  </article>
)
};

export default AdminPage;
