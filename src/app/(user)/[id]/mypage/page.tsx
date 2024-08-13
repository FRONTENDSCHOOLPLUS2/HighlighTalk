function MyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <div>마이페이지입니다 user id -{params.id} </div>;
}
export default MyPage;
