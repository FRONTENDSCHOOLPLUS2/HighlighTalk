'use client';

function SearchKeyWords() {
  return (
    <form action="#" className="search-form">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className={'search-input'}
        name="keyword"
      />
      <button type="submit" className="search-button">
        검색
      </button>
    </form>
  );
}

export default SearchKeyWords;
